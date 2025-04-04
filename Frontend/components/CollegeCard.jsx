// // frontend/components/CollegeCard.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   ScrollView,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import API from '../config/api';
// import useUserStore from '../store/userStore';

// const CollegeCard = () => {
//   const navigation = useNavigation();
//   const user = useUserStore(state => state.user);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [showNoPost, setShowNoPost] = useState(false);

//   // If no user data, redirect to signup
//   if (!user) {
//     navigation.navigate('Signup');
//     return null;
//   }

//   const handleCardPress = () => {
//     setShowNoPost(true);
//     setTimeout(() => {
//       setShowNoPost(false);
//     }, 3000); // Reset after 3 seconds
//   };

//   return (
//     <View style={styles.container}>
//       {/* Back button */}
//       <TouchableOpacity 
//         style={styles.backButton}
//         onPress={() => navigation.navigate("Home")}
//       >
//         <Text style={styles.backButtonText}>←</Text>
//       </TouchableOpacity>
      
//       {/* Verify button */}
//       <TouchableOpacity 
//         style={styles.verifyButton}
//         onPress={() => navigation.navigate('VerifyUsers')}
//       >
//         <Text style={styles.verifyButtonText}>✓</Text>
//       </TouchableOpacity>
      
//       <Text style={styles.title}>{user.college}</Text>
      
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         <TouchableOpacity 
//           style={styles.postCard}
//           onPress={handleCardPress}
//           activeOpacity={0.8}
//         >
//           {showNoPost ? (
//             <View style={styles.noPostContainer}>
//               <Text style={styles.noPostText}>No more posts as of now</Text>
//             </View>
//           ) : (
//             <View style={styles.postContent}>
//               <Text style={styles.postTitle}>Welcome to your college feed</Text>
//               <Text style={styles.postDescription}>
//                 This is where you'll see posts from your college community. Tap to refresh.
//               </Text>
//             </View>
//           )}
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={styles.postCard}
//           onPress={handleCardPress}
//           activeOpacity={0.8}
//         >
//           <View style={styles.postContent}>
//             <Text style={styles.postTitle}>College Announcements</Text>
//             <Text style={styles.postDescription}>
//               Stay tuned for important announcements from your college.
//             </Text>
//           </View>
//         </TouchableOpacity>
        
//         <View style={styles.infoCard}>
//           <Text style={styles.infoTitle}>About this page</Text>
//           <Text style={styles.infoText}>
//             This is your college community page. You can view posts from other students, 
//             verify new users, and stay connected with your college community.
//           </Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   backButton: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     zIndex: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#6c757d',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   backButtonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   verifyButton: {
//     position: 'absolute',
//     top: 40,
//     left: 80,
//     zIndex: 10,
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#28a745',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   verifyButtonText: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 100,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   scrollContent: {
//     padding: 20,
//     paddingTop: 0,
//   },
//   postCard: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 15,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//     minHeight: 150,
//   },
//   postContent: {
//     flex: 1,
//   },
//   postTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   postDescription: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#555',
//   },
//   noPostContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noPostText: {
//     fontSize: 16,
//     color: '#6c757d',
//     textAlign: 'center',
//   },
//   infoCard: {
//     backgroundColor: '#e8f4f8',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 20,
//     borderLeftWidth: 4,
//     borderLeftColor: '#17a2b8',
//   },
//   infoTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#17a2b8',
//   },
//   infoText: {
//     fontSize: 14,
//     lineHeight: 20,
//     color: '#555',
//   }
// });

// export default CollegeCard;



// frontend/components/CollegeCard.jsx
import React, { useState, useEffect } from 'react';
import socket from '../services/socket';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../config/api';
import useUserStore from '../store/userStore';
import Post from './Post'; // Import the Post component
import CreatePost from './CreatePost'; // Import the CreatePost component

const CollegeCard = () => {
  const navigation = useNavigation();
  const user = useUserStore(state => state.user);
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  // Fetch college posts when component mounts
  useEffect(() => {
    if (user && user.college) {
      fetchCollegePosts();
    }
  }, []);

  useEffect(() => {
    // Join college room
    if (user?.college) {
      console.log('Joining college room:', user.college);
      socket.emit('joinCollege', user.college);
    }
    
    // Listen for new posts
    socket.on('postCreated', (newPost) => {
      if (newPost.postType === 'college' && newPost.authorCollege === user?.college) {
        console.log('New college post received:', newPost);
        setPosts(prevPosts => [newPost, ...prevPosts]);
      }
    });
    
    // Listen for likes
    socket.on('postLiked', ({postId, userId, isLiked}) => {
      console.log('Post like update received:', postId, isLiked);
      setPosts(prevPosts => prevPosts.map(post => 
        post._id === postId 
          ? { 
              ...post, 
              likes: isLiked 
                ? [...post.likes, userId] 
                : post.likes.filter(id => id !== userId) 
            }
          : post
      ));
    });
    
    // Listen for comments
    socket.on('commentAdded', ({postId, comment}) => {
      console.log('New comment received:', postId, comment);
      setPosts(prevPosts => prevPosts.map(post => 
        post._id === postId 
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ));
    });

    socket.on('postDeleted', ({postId}) => {
      console.log('Post deletion notification received:', postId);
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    });
    
    // Clean up on unmount
    return () => {
      socket.off('postCreated');
      socket.off('postLiked');
      socket.off('commentAdded');
      socket.off('postDeleted');
    };
  }, [user?.college]);

  const fetchCollegePosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const encodedCollege = encodeURIComponent(user.college);
      const response = await fetch(`${API.endpoints.posts}/college/${encodedCollege}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      } else {
        setError(data.message || 'Failed to fetch college posts');
      }
    } catch (error) {
      console.error('Fetch college posts error:', error);
      setError('Network error while fetching posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchCollegePosts();
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleLike = (postId, isLiked) => {
    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, likes: isLiked 
            ? [...post.likes, user._id] 
            : post.likes.filter(id => id !== user._id) 
          }
        : post
    ));
  };

  const handleComment = (postId, newComment) => {
    setPosts(posts.map(post => 
      post._id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
  };

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  };

  // If no user data, redirect to signup
  if (!user) {
    navigation.navigate('Signup');
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <Text style={styles.headerTitle} numberOfLines={1} ellipsizeMode="tail">
            {user.college}
          </Text>
          
          {/* Verify button */}
          <TouchableOpacity 
            style={styles.verifyButton}
            onPress={() => navigation.navigate('VerifyUsers')}
          >
            <Text style={styles.verifyButtonText}>✓</Text>
          </TouchableOpacity>
        </View>
        
        {/* Community stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{posts.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.verificationCount}/3</Text>
            <Text style={styles.statLabel}>Verifications</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{user.isVerified ? "✓" : "⏳"}</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
        
        {/* Content area */}
        {loading && !refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#4e7be0" />
            <Text style={styles.loaderText}>Loading college posts...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Image 
              source={{ uri: 'https://via.placeholder.com/120' }}
              style={styles.errorImage}
            />
            <Text style={styles.errorTitle}>Oops!</Text>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchCollegePosts}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Post 
                post={item} 
                onLike={handleLike} 
                onComment={handleComment}
                onDelete={handleDelete}
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.postsList}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={['#4e7be0']}
                tintColor={'#4e7be0'}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.emptyImage}
                />
                <Text style={styles.emptyTitle}>No College Posts Yet</Text>
                <Text style={styles.emptyText}>
                  Be the first to share with your college community!
                </Text>
                <TouchableOpacity 
                  style={styles.emptyCreateButton}
                  onPress={() => setIsCreatePostVisible(true)}
                >
                  <Text style={styles.emptyCreateButtonText}>Create First Post</Text>
                </TouchableOpacity>
              </View>
            }
            ListFooterComponent={
              posts.length > 0 ? (
                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>
                    You've reached the end of the feed
                  </Text>
                  <TouchableOpacity onPress={handleRefresh}>
                    <Text style={styles.refreshText}>Refresh</Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
            showsVerticalScrollIndicator={false}
          />
        )}
        
        {/* Create post floating button */}
        {posts.length > 0 && (
          <TouchableOpacity 
            style={styles.createPostButton}
            onPress={() => setIsCreatePostVisible(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.createPostButtonText}>+</Text>
          </TouchableOpacity>
        )}
        
        {/* Create Post Modal */}
        <CreatePost 
          isVisible={isCreatePostVisible}
          onClose={() => setIsCreatePostVisible(false)}
          postType="college"
          onPostCreated={handlePostCreated}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#444',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  verifyButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4e7be0',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  statDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#eee',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderText: {
    marginTop: 16,
    fontSize: 16,
    color: '#777',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 60,
    backgroundColor: '#f8f9fa',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: '80%',
  },
  retryButton: {
    backgroundColor: '#4e7be0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  postsList: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyCreateButton: {
    backgroundColor: '#4e7be0',
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  emptyCreateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  refreshText: {
    fontSize: 16,
    color: '#4e7be0',
    fontWeight: 'bold',
  },
  createPostButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4e7be0',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  createPostButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default CollegeCard;