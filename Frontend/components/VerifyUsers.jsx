// frontend/components/VerifyUsers.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import API from '../config/api';

const VerifyUsers = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  
  const [unverifiedUsers, setUnverifiedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);
  
  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    try {
      const url = `${API.endpoints.users}/unverified?email=${encodeURIComponent(email)}`;
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
    try {
      const response = await fetch(`${API.endpoints.users}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          verifierEmail: email,
          userToVerifyId: userId
        }),
      });
      
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
      Alert.alert("Error", "Network error. Please try again.");
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
    <View style={styles.container}>
      <Text style={styles.title}>Verify Users</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
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
        />
      ) : (
        <Text style={styles.noUsersText}>No unverified users from your college</Text>
      )}
      
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  userCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  linkedinProfile: {
    fontSize: 14,
    color: '#0077b5',
    marginBottom: 5,
  },
  verificationCount: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '500',
  },
  verifyButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  noUsersText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    marginTop: 30,
  },
  backButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default VerifyUsers;