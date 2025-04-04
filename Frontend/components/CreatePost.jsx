// frontend/components/CreatePost.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import API from '../config/api';
import useUserStore from '../store/userStore';

const CreatePost = ({ isVisible, onClose, postType, onPostCreated }) => {
  const user = useUserStore(state => state.user);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const MAX_CONTENT_LENGTH = 1000;
  
  const pickImage = async () => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'We need camera roll permission to upload images');
      return;
    }
    
    // Pick the image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleCreatePost = async () => {
    if (!content.trim()) {
      Alert.alert('Error', 'Post content cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // For a real implementation, you would upload the image to a server first
      // and get back the URL. For now, we'll pretend we have the URL.
      const imageUrl = image ? 'https://example.com/image.jpg' : '';
      
      const response = await fetch(API.endpoints.posts, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          postType,
          authorId: user._id,
          imageUrl
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setContent('');
        setImage(null);
        onClose();
        if (onPostCreated) onPostCreated(data.data);
      } else {
        Alert.alert('Error', data.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Create post error:', error);
      Alert.alert('Error', 'Network error while creating post');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Create {postType === 'global' ? 'Global' : 'College'} Post
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{user?.name}</Text>
            <Text style={styles.postType}>
              {postType === 'global' ? 'Global Post' : `Post to ${user?.college}`}
            </Text>
          </View>
          
          <TextInput
            style={styles.contentInput}
            placeholder="What's on your mind?"
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={MAX_CONTENT_LENGTH}
          />
          
          <Text style={styles.characterCount}>
            {content.length}/{MAX_CONTENT_LENGTH}
          </Text>
          
          {image && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: image }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setImage(null)}
              >
                <Text style={styles.removeImageText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={pickImage}
            >
              <Text style={styles.actionText}>Add Image</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.postButton, (!content.trim() || isSubmitting) && styles.disabledButton]}
              onPress={handleCreatePost}
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.postButtonText}>Post</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    fontSize: 24,
    color: '#777',
  },
  authorInfo: {
    marginBottom: 16,
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postType: {
    fontSize: 14,
    color: '#777',
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  characterCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: '#777',
    marginBottom: 16,
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: '#f0f2f5',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  postButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    backgroundColor: '#1877f2',
  },
  disabledButton: {
    backgroundColor: '#b4c9e4',
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CreatePost;