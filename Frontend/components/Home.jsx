// // import React, { useEffect, useState } from 'react';
// // import { 
// //   View, 
// //   Text, 
// //   StyleSheet,
// //   TouchableOpacity,
// //   ActivityIndicator,
// //   ScrollView
// // } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import API from '../config/api';
// // import useUserStore from '../store/userStore';

// // const Home = () => {
// //   const navigation = useNavigation();
  
// //   // Get user data from Zustand store
// //   const user = useUserStore(state => state.user);
// //   const clearUser = useUserStore(state => state.clearUser);
  
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   // Fetch the latest user data when component mounts
// //   useEffect(() => {
// //     if (user && user.email) {
// //       fetchUserData();
// //     }
// //   }, []);

// //   const fetchUserData = async () => {
// //     setLoading(true);
// //     try {
// //       const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(user.email)}`);
      
// //       if (!response.ok) {
// //         throw new Error(`Server responded with status: ${response.status}`);
// //       }
      
// //       const data = await response.json();
      
// //       if (data.success) {
// //         // You could update the user state here if needed
// //         console.log('Latest user data fetched:', data.data);
// //       } else {
// //         setError(data.message || 'Failed to fetch user data');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching user data:', error);
// //       setError('Error connecting to server. Please try again later.');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCardClick = () => {
// //     console.log('You clicked the card');
// //     navigation.navigate('VerifyUsers');
// //   };

// //   // const handleLogout = () => {
// //   //   clearUser();
// //   //   navigation.navigate('Signup');
// //   // };

// //   const handleLogout = () => {
// //     // First navigate to Signup
// //     navigation.reset({
// //       index: 0,
// //       routes: [{ name: 'Signup' }],
// //     });
    
// //     // Then clear the user data
// //     clearUser();
// //   };

// //   // If no user data, redirect to signup
// //   if (!user) {
// //     navigation.navigate('Signup');
// //     return null;
// //   }

// //   return (
// //     <ScrollView contentContainerStyle={styles.scrollContainer}>
// //       <View style={styles.container}>
// //         <Text style={styles.title}>You are in the home page</Text>
        
// //         {loading ? (
// //           <ActivityIndicator size="large" color="#007bff" />
// //         ) : error ? (
// //           <Text style={styles.errorText}>{error}</Text>
// //         ) : (
// //           <>
// //             <TouchableOpacity 
// //               style={styles.collegeCard}
// //               onPress={handleCardClick}
// //               activeOpacity={0.8}
// //             >
// //               <Text style={styles.collegeLabel}>College</Text>
// //               <Text style={styles.collegeName}>{user.college}</Text>
// //               <Text style={styles.cardHint}>Tap to verify users</Text>
// //             </TouchableOpacity>
            
// //             <View style={styles.userInfoContainer}>
// //               <Text style={styles.welcomeText}>
// //                 Welcome, {user.name}!
// //               </Text>
              
// //               <Text style={styles.emailInfo}>Email: {user.email}</Text>
              
// //               {user.linkedinProfile && (
// //                 <Text style={styles.linkedinInfo}>
// //                   LinkedIn: {user.linkedinProfile}
// //                 </Text>
// //               )}
              
// //               <View style={styles.verificationContainer}>
// //                 <Text style={styles.verificationStatus}>
// //                   Status: {user.isVerified ? 'Verified ✓' : 'Pending Verification'}
// //                 </Text>
// //                 <Text style={styles.verificationCount}>
// //                   Verifications: {user.verificationCount}/3
// //                 </Text>
// //               </View>
              
// //               {user.education && (
// //                 <View style={styles.educationContainer}>
// //                   <Text style={styles.educationTitle}>Education</Text>
// //                   <Text style={styles.educationLevel}>
// //                     Level: {user.education.level}
// //                   </Text>
// //                   {user.education.specializations && user.education.specializations.length > 0 && (
// //                     <View>
// //                       <Text style={styles.specializationsTitle}>Specializations:</Text>
// //                       {user.education.specializations.map((spec, index) => (
// //                         <Text key={index} style={styles.specializationItem}>
// //                           • {spec}
// //                         </Text>
// //                       ))}
// //                     </View>
// //                   )}
// //                 </View>
// //               )}
// //             </View>
// //           </>
// //         )}
        
// //         <View style={styles.buttonContainer}>
// //           <TouchableOpacity 
// //             style={styles.button}
// //             onPress={() => navigation.navigate('Signup')}
// //           >
// //             <Text style={styles.buttonText}>Back to Signup</Text>
// //           </TouchableOpacity>
          
// //           <TouchableOpacity 
// //             style={[styles.button, styles.logoutButton]}
// //             onPress={handleLogout}
// //           >
// //             <Text style={styles.buttonText}>Logout</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </ScrollView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   scrollContainer: {
// //     flexGrow: 1,
// //   },
// //   container: {
// //     flex: 1,
// //     padding: 20,
// //     backgroundColor: '#f5f5f5',
// //     alignItems: 'center',
// //   },
// //   title: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginVertical: 30,
// //     color: '#333',
// //   },
// //   collegeCard: {
// //     width: '90%',
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     padding: 20,
// //     marginBottom: 30,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     elevation: 3,
// //     position: 'relative',
// //   },
// //   collegeLabel: {
// //     position: 'absolute',
// //     top: 10,
// //     left: 10,
// //     fontSize: 12,
// //     color: '#888',
// //     fontWeight: '500',
// //   },
// //   collegeName: {
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginTop: 15,
// //     textAlign: 'center',
// //   },
// //   cardHint: {
// //     fontSize: 12,
// //     color: '#007bff',
// //     textAlign: 'center',
// //     marginTop: 10,
// //   },
// //   userInfoContainer: {
// //     width: '90%',
// //     backgroundColor: '#fff',
// //     borderRadius: 10,
// //     padding: 20,
// //     marginBottom: 30,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 5,
// //     elevation: 3,
// //   },
// //   welcomeText: {
// //     fontSize: 20,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginBottom: 15,
// //   },
// //   emailInfo: {
// //     fontSize: 16,
// //     color: '#555',
// //     marginBottom: 10,
// //   },
// //   linkedinInfo: {
// //     fontSize: 16,
// //     color: '#0077b5',
// //     marginBottom: 10,
// //   },
// //   verificationContainer: {
// //     marginVertical: 15,
// //     padding: 12,
// //     backgroundColor: '#f8f9fa',
// //     borderRadius: 8,
// //   },
// //   verificationStatus: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#333',
// //     marginBottom: 5,
// //   },
// //   verificationCount: {
// //     fontSize: 14,
// //     color: '#6c757d',
// //   },
// //   educationContainer: {
// //     marginTop: 15,
// //     padding: 12,
// //     backgroundColor: '#f8f9fa',
// //     borderRadius: 8,
// //   },
// //   educationTitle: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //     color: '#333',
// //     marginBottom: 10,
// //   },
// //   educationLevel: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginBottom: 8,
// //   },
// //   specializationsTitle: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginBottom: 8,
// //   },
// //   specializationItem: {
// //     fontSize: 14,
// //     color: '#555',
// //     marginLeft: 10,
// //     marginBottom: 4,
// //   },
// //   buttonContainer: {
// //     width: '90%',
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //   },
// //   button: {
// //     backgroundColor: '#007bff',
// //     padding: 12,
// //     borderRadius: 5,
// //     width: '48%',
// //     alignItems: 'center',
// //   },
// //   logoutButton: {
// //     backgroundColor: '#dc3545',
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //     fontSize: 16,
// //   },
// //   errorText: {
// //     color: '#dc3545',
// //     marginBottom: 20,
// //     textAlign: 'center',
// //   },
// // });

// // export default Home;

// // Update the Home.jsx component
// import React, { useEffect, useState } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import API from '../config/api';
// import useUserStore from '../store/userStore';

// const Home = () => {
//   const navigation = useNavigation();
  
//   // Get user data from Zustand store
//   const user = useUserStore(state => state.user);
  
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch the latest user data when component mounts
//   useEffect(() => {
//     if (user && user.email) {
//       fetchUserData();
//     }
//   }, []);

//   const fetchUserData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(user.email)}`);
      
//       if (!response.ok) {
//         throw new Error(`Server responded with status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       if (data.success) {
//         console.log('Latest user data fetched:', data.data);
//       } else {
//         setError(data.message || 'Failed to fetch user data');
//       }
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       setError('Error connecting to server. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCardClick = () => {
//     console.log('You clicked the card');
//     navigation.navigate('CollegeCard');
//   };

//   // If no user data, redirect to signup
//   if (!user) {
//     navigation.navigate('Signup');
//     return null;
//   }

//   return (
//     <View style={styles.container}>
//       {/* Profile icon in top right corner */}
//       <TouchableOpacity 
//         style={styles.profileIconContainer}
//         onPress={() => navigation.navigate('Profile')}
//       >
//         <View style={styles.profileIcon}>
//           <Text style={styles.profileInitial}>{user.name ? user.name[0].toUpperCase() : '?'}</Text>
//         </View>
//       </TouchableOpacity>

//       <Text style={styles.title}>You are in the home page</Text>
      
//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" />
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : (
//         <TouchableOpacity 
//           style={styles.collegeCard}
//           onPress={handleCardClick}
//           activeOpacity={0.8}
//         >
//           <Text style={styles.collegeLabel}>College</Text>
//           <Text style={styles.collegeName}>{user.college}</Text>
//           <Text style={styles.cardHint}>Tap to verify users</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//     alignItems: 'center',
//   },
//   profileIconContainer: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     zIndex: 10,
//   },
//   profileIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   profileInitial: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 80,
//     marginBottom: 30,
//     color: '#333',
//   },
//   collegeCard: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 30,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//     position: 'relative',
//   },
//   collegeLabel: {
//     position: 'absolute',
//     top: 10,
//     left: 10,
//     fontSize: 12,
//     color: '#888',
//     fontWeight: '500',
//   },
//   collegeName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop: 15,
//     textAlign: 'center',
//   },
//   cardHint: {
//     fontSize: 12,
//     color: '#007bff',
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   errorText: {
//     color: '#dc3545',
//     marginBottom: 20,
//     textAlign: 'center',
//   }
// });

// export default Home;





// frontend/components/Home.jsx
import React, { useEffect, useState } from 'react';
import socket from '../services/socket';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../config/api';
import useUserStore from '../store/userStore';
import Post from './Post'; // Import the Post component
import CreatePost from './CreatePost'; // Import the CreatePost component

const Home = () => {
  const navigation = useNavigation();
  
  // Get user data from Zustand store
  const user = useUserStore(state => state.user);
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  // Fetch user data and posts when component mounts
  useEffect(() => {
    if (user && user.email) {
      fetchUserData();
      fetchGlobalPosts();
    }
  }, []);

// New useEffect - Handle Socket.IO events
useEffect(() => {
  if (!user) return; // Don't setup sockets if user isn't logged in
  socket.connect();
  
  // Listen for new posts
  socket.on('postCreated', (newPost) => {
    if (newPost.postType === 'global') {
      console.log('New global post received:', newPost);
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
  
  // Clean up on unmount
  return () => {
    socket.off('postCreated');
    socket.off('postLiked');
    socket.off('commentAdded');
  };
}, [user]); // Depend on user to reconnect if user changes

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(user.email)}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        console.log('Latest user data fetched:', data.data);
      } else {
        console.error('Failed to fetch user data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchGlobalPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API.endpoints.posts + '/global');
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setPosts(data.data);
      } else {
        setError(data.message || 'Failed to fetch posts');
      }
    } catch (error) {
      console.error('Fetch posts error:', error);
      setError('Network error while fetching posts');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchGlobalPosts();
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleCardClick = () => {
    console.log('You clicked the card');
    navigation.navigate('CollegeCard');
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

  // If no user data, redirect to signup
  if (!user) {
    navigation.navigate('Signup');
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Global Feed</Text>
          
          {/* Profile icon */}
          <TouchableOpacity 
            style={styles.profileIconContainer}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={styles.profileIcon}>
              <Text style={styles.profileInitial}>{user.name ? user.name[0].toUpperCase() : '?'}</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* College card */}
        <View style={styles.collegeCardContainer}>
          <TouchableOpacity 
            style={styles.collegeCard}
            onPress={handleCardClick}
            activeOpacity={0.8}
          >
            <View style={styles.collegeCardContent}>
              <View style={styles.collegeIconContainer}>
                <Text style={styles.collegeIcon}>{user.college ? user.college[0].toUpperCase() : '🏛'}</Text>
              </View>
              <View style={styles.collegeTextContainer}>
                <Text style={styles.collegeName}>{user.college}</Text>
                <Text style={styles.cardHint}>Tap to view college feed</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        {/* Posts list */}
        {loading && !refreshing ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loaderText}>Loading posts...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchGlobalPosts}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
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
              />
            )}
            keyExtractor={item => item._id}
            contentContainerStyle={styles.postsList}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Image 
                  source={{ uri: 'https://via.placeholder.com/150' }}
                  style={styles.emptyListImage}
                />
                <Text style={styles.emptyListTitle}>No posts yet</Text>
                <Text style={styles.emptyListText}>Be the first to share something with the community!</Text>
              </View>
            }
            refreshing={refreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
          />
        )}
        
        {/* Create post floating button */}
        <TouchableOpacity 
          style={styles.createPostButton}
          onPress={() => setIsCreatePostVisible(true)}
        >
          <Text style={styles.createPostButtonText}>+</Text>
        </TouchableOpacity>
        
        {/* Create Post Modal */}
        <CreatePost 
          isVisible={isCreatePostVisible}
          onClose={() => setIsCreatePostVisible(false)}
          postType="global"
          onPostCreated={handlePostCreated}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  profileIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  profileInitial: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  collegeCardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  collegeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  collegeCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  collegeIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e9f0ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  collegeIcon: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#007bff',
  },
  collegeTextContainer: {
    flex: 1,
  },
  collegeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cardHint: {
    fontSize: 13,
    color: '#888',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loaderText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#dc3545',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postsList: {
    padding: 15,
    paddingTop: 5,
  },
  emptyListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  emptyListImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  emptyListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptyListText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  createPostButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007bff',
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

export default Home;