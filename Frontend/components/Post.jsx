// frontend/components/Post.jsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Alert
} from 'react-native';
import API from '../config/api';
import useUserStore from '../store/userStore';

const Post = ({ post, onLike, onComment, onDelete }) => {
  const user = useUserStore(state => state.user);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(post.likes.includes(user._id));
  const [likeCount, setLikeCount] = useState(post.likes.length);

  useEffect(() => {
    setLikeCount(post.likes.length);
    setIsLiked(post.likes.includes(user._id));
  }, [post.likes, user._id]);
  
  const handleLike = async () => {
    try {
      // Optimistic update
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
      
      const response = await fetch(`${API.endpoints.posts}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post._id,
          userId: user._id
        }),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        // Revert if failed
        setIsLiked(isLiked);
        setLikeCount(likeCount);
        Alert.alert('Error', 'Failed to update like');
      }
      
      if (onLike) onLike(post._id, data.liked);
    } catch (error) {
      console.error('Like error:', error);
      // Revert if failed
      setIsLiked(isLiked);
      setLikeCount(likeCount);
      Alert.alert('Error', 'Network error while liking post');
    }
  };
  
  const handleAddComment = async () => {
    if (!comment.trim()) return;
    
    try {
      const response = await fetch(`${API.endpoints.posts}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post._id,
          content: comment,
          authorId: user._id
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setComment('');
        if (onComment) onComment(post._id, data.data);
      } else {
        Alert.alert('Error', 'Failed to add comment');
      }
    } catch (error) {
      console.error('Comment error:', error);
      Alert.alert('Error', 'Network error while adding comment');
    }
  };

  const handleDelete = async () => {
    // Use React Native's Alert instead of window.confirm
    Alert.alert(
      "Delete Post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Delete", 
          onPress: async () => {
            try {
              const response = await fetch(`${API.endpoints.posts}/delete`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  postId: post._id,
                  userId: user._id
                }),
              });
              
              const data = await response.json();
              
              if (data.success) {
                if (onDelete) onDelete(post._id);
              } else {
                Alert.alert('Error', data.message || 'Failed to delete post');
              }
            } catch (error) {
              console.error('Delete error:', error);
              Alert.alert('Error', 'Network error while deleting post');
            }
          },
          style: "destructive"
        }
      ]
    );
  };
  
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.authorName}>{post.authorName}</Text>
        <Text style={styles.postTime}>
          {new Date(post.createdAt).toLocaleDateString()}
        </Text>
      </View>
      
      <Text style={styles.postContent}>{post.content}</Text>
      
      {post.imageUrl ? (
        <Image 
          source={{ uri: post.imageUrl }} 
          style={styles.postImage}
          resizeMode="cover"
        />
      ) : null}
      
      <View style={styles.postStats}>
        <Text style={styles.likesCount}>{likeCount} likes</Text>
        <Text style={styles.commentsCount}>{post.comments.length} comments</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, isLiked && styles.likedButton]}
          onPress={handleLike}
        >
          <Text style={[styles.actionText, isLiked && styles.likedText]}>
            {isLiked ? 'Liked' : 'Like'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => setShowComments(!showComments)}
        >
          <Text style={styles.actionText}>
            {showComments ? 'Hide Comments' : 'View Comments'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {showComments && (
        <View style={styles.commentsSection}>
          <FlatList
            data={post.comments}
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({ item }) => (
              <View style={styles.commentItem}>
                <Text style={styles.commentAuthor}>{item.authorName}</Text>
                <Text style={styles.commentContent}>{item.content}</Text>
                <Text style={styles.commentTime}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noCommentsText}>No comments yet</Text>
            }
          />
          
          <View style={styles.addCommentContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment..."
              value={comment}
              onChangeText={setComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.postCommentButton}
              onPress={handleAddComment}
            >
              <Text style={styles.postCommentText}>Post</Text>
            </TouchableOpacity>
          </View>
          {post.author === user._id && (
    <TouchableOpacity 
      style={styles.deleteButton}
      onPress={handleDelete}
    >
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postTime: {
    fontSize: 14,
    color: '#777',
  },
  postContent: {
    fontSize: 16,
    lineHeight: 22,
    color: '#333',
    marginBottom: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  likesCount: {
    fontSize: 14,
    color: '#555',
  },
  commentsCount: {
    fontSize: 14,
    color: '#555',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f0f2f5',
  },
  likedButton: {
    backgroundColor: '#e7f3ff',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#444',
  },
  likedText: {
    color: '#1877f2',
  },
  commentsSection: {
    marginTop: 12,
  },
  commentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  noCommentsText: {
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
    marginVertical: 12,
  },
  addCommentContainer: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 80,
  },
  postCommentButton: {
    marginLeft: 8,
    backgroundColor: '#1877f2',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  postCommentText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#dc3545',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Post;