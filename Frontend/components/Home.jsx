// // frontend/components/Home.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import API from '../config/api';

// const Home = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const email = route.params?.email;
  
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch user data including college when component mounts
//     const fetchUserData = async () => {
//       if (!email) {
//         setError('No email provided');
//         setLoading(false);
//         return;
//       }

//       try {
//         // Fetch user data using the email
//         const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(email)}`);
        
//         if (!response.ok) {
//           throw new Error(`Server responded with status: ${response.status}`);
//         }
        
//         const data = await response.json();
        
//         if (data.success) {
//           setUserData(data.data);
//         } else {
//           setError(data.message || 'Failed to fetch user data');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         setError('Error connecting to server. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [email]);

//   const handleCardClick = () => {
//     console.log('You clicked the card');
//     // Here you could navigate to a detailed view of the college
//     navigation.navigate('VerifyUsers', { email });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>You are in the home page</Text>
      
//       {loading ? (
//         <ActivityIndicator size="large" color="#007bff" />
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : userData ? (
//         <>
//           <TouchableOpacity 
//             style={styles.collegeCard}
//             onPress={handleCardClick}
//             activeOpacity={0.8}
//           >
//             <Text style={styles.collegeLabel}>College</Text>
//             <Text style={styles.collegeName}>{userData.college}</Text>
//             <Text style={styles.cardHint}>Tap to view details</Text>
//           </TouchableOpacity>
          
//           <Text style={styles.welcomeText}>
//             Welcome, {userData.name}!
//           </Text>
//         </>
//       ) : (
//         <Text style={styles.errorText}>No user data available</Text>
//       )}
      
//       <TouchableOpacity 
//         style={styles.button}
//         onPress={() => navigation.navigate('Signup')}
//       >
//         <Text style={styles.buttonText}>Back to Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
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
//   welcomeText: {
//     fontSize: 18,
//     color: '#333',
//     marginBottom: 30,
//   },
//   errorText: {
//     color: '#dc3545',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     padding: 12,
//     borderRadius: 5,
//     width: '60%',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default Home;


import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../config/api';
import useUserStore from '../store/userStore';

const Home = () => {
  const navigation = useNavigation();
  
  // Get user data from Zustand store
  const user = useUserStore(state => state.user);
  const clearUser = useUserStore(state => state.clearUser);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch the latest user data when component mounts
  useEffect(() => {
    if (user && user.email) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(user.email)}`);
      
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // You could update the user state here if needed
        console.log('Latest user data fetched:', data.data);
      } else {
        setError(data.message || 'Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError('Error connecting to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = () => {
    console.log('You clicked the card');
    navigation.navigate('VerifyUsers');
  };

  // const handleLogout = () => {
  //   clearUser();
  //   navigation.navigate('Signup');
  // };

  const handleLogout = () => {
    // First navigate to Signup
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signup' }],
    });
    
    // Then clear the user data
    clearUser();
  };

  // If no user data, redirect to signup
  if (!user) {
    navigation.navigate('Signup');
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>You are in the home page</Text>
        
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.collegeCard}
              onPress={handleCardClick}
              activeOpacity={0.8}
            >
              <Text style={styles.collegeLabel}>College</Text>
              <Text style={styles.collegeName}>{user.college}</Text>
              <Text style={styles.cardHint}>Tap to verify users</Text>
            </TouchableOpacity>
            
            <View style={styles.userInfoContainer}>
              <Text style={styles.welcomeText}>
                Welcome, {user.name}!
              </Text>
              
              <Text style={styles.emailInfo}>Email: {user.email}</Text>
              
              {user.linkedinProfile && (
                <Text style={styles.linkedinInfo}>
                  LinkedIn: {user.linkedinProfile}
                </Text>
              )}
              
              <View style={styles.verificationContainer}>
                <Text style={styles.verificationStatus}>
                  Status: {user.isVerified ? 'Verified ✓' : 'Pending Verification'}
                </Text>
                <Text style={styles.verificationCount}>
                  Verifications: {user.verificationCount}/3
                </Text>
              </View>
              
              {user.education && (
                <View style={styles.educationContainer}>
                  <Text style={styles.educationTitle}>Education</Text>
                  <Text style={styles.educationLevel}>
                    Level: {user.education.level}
                  </Text>
                  {user.education.specializations && user.education.specializations.length > 0 && (
                    <View>
                      <Text style={styles.specializationsTitle}>Specializations:</Text>
                      {user.education.specializations.map((spec, index) => (
                        <Text key={index} style={styles.specializationItem}>
                          • {spec}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          </>
        )}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.buttonText}>Back to Signup</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.logoutButton]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 30,
    color: '#333',
  },
  collegeCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    position: 'relative',
  },
  collegeLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  collegeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
  },
  cardHint: {
    fontSize: 12,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  userInfoContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emailInfo: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  linkedinInfo: {
    fontSize: 16,
    color: '#0077b5',
    marginBottom: 10,
  },
  verificationContainer: {
    marginVertical: 15,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  verificationStatus: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
  },
  verificationCount: {
    fontSize: 14,
    color: '#6c757d',
  },
  educationContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  educationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  educationLevel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  specializationsTitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  specializationItem: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 4,
  },
  buttonContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Home;