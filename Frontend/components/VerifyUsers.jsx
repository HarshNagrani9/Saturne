// In VerifyUsers.jsx, update the component with improved styles
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../config/api';
import useUserStore from '../store/userStore';

const VerifyUsers = () => {
  const navigation = useNavigation();
  
  // Get user from Zustand
  const user = useUserStore(state => state.user);
  
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCardId, setActiveCardId] = useState(null);
  
  useEffect(() => {
    if (user && user.email) {
      fetchUnverifiedUsers();
    } else {
      setError("User information missing. Please log in again.");
      setLoading(false);
    }
  }, []);
  
  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    try {
      const url = `${API.endpoints.users}/unverified?email=${encodeURIComponent(user.email)}`;
      console.log('Fetching from URL:', url);
      
      const response = await fetch(url);
      console.log('Response status:', response.status);
      
      const data = await response.json();
      
      if (data.success) {
        setUnverifiedUsers(data.data);
      } else {
        setError('Failed to fetch unverified users');
      }
    } catch (error) {
      console.error('Error fetching unverified users:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleVerify = async (userId) => {
    if (!user || !user.email) {
      Alert.alert("Error", "User information missing. Please log in again.");
      return;
    }
    
    try {
      const response = await fetch(`${API.endpoints.users}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verifierEmail: user.email,
          userToVerifyId: userId
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        Alert.alert(
          "Verification Success",
          `User has been verified. They now have ${data.data.verificationCount} verification(s).`
        );
        // Refresh the list
        fetchUnverifiedUsers();
      } else {
        Alert.alert("Error", data.message || "Verification failed");
      }
    } catch (error) {
      console.error('Verification error:', error);
      Alert.alert("Error", `Network error: ${error.message}`);
    }
  };
  
  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userEmail}>{item.email}</Text>
        {item.linkedinProfile && (
          <Text style={styles.linkedinProfile}>
            LinkedIn: {item.linkedinProfile}
          </Text>
        )}
        <Text style={styles.verificationCount}>
          Verifications: {item.verificationCount}/3
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={() => handleVerify(item._id)}
      >
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <View style={styles.container}>
        {/* Back button in top left */}
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('CollegeCard')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <Text style={styles.title}>Verify Users</Text>
        
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007bff" />
            <Text style={styles.loaderText}>Loading users...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={fetchUnverifiedUsers}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : unverifiedUsers.length > 0 ? (
          <FlatList
            data={unverifiedUsers}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.noUsersText}>No unverified users from your college</Text>
            <Text style={styles.emptySubtext}>All users in your college have been verified!</Text>
          </View>
        )}
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
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 90,
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    minHeight: 130,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  userInfo: {
    flex: 1,
    paddingRight: 10,
  },
  userName: {
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  userEmail: {
    fontSize: 15,
    color: '#555',
    marginBottom: 6,
  },
  linkedinProfile: {
    fontSize: 14,
    color: '#0077b5',
    marginBottom: 6,
  },
  verificationCount: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
    marginTop: 4,
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 15,
    fontSize: 16,
    color: '#6c757d',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noUsersText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#495057',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  noPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noPostText: {
    fontSize: 17,
    color: '#6c757d',
    textAlign: 'center',
    fontStyle: 'italic'
  }
});

export default VerifyUsers;

