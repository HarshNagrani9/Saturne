// frontend/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import API from '../config/api';

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user data including college when component mounts
    const fetchUserData = async () => {
      if (!email) {
        setError('No email provided');
        setLoading(false);
        return;
      }

      try {
        // Fetch user data using the email
        const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success) {
          setUserData(data.data);
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

    fetchUserData();
  }, [email]);

  const handleCardClick = () => {
    console.log('You clicked the card');
    // Here you could navigate to a detailed view of the college
    navigation.navigate('VerifyUsers', { email });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You are in the home page</Text>
      
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : userData ? (
        <>
          <TouchableOpacity 
            style={styles.collegeCard}
            onPress={handleCardClick}
            activeOpacity={0.8}
          >
            <Text style={styles.collegeLabel}>College</Text>
            <Text style={styles.collegeName}>{userData.college}</Text>
            <Text style={styles.cardHint}>Tap to view details</Text>
          </TouchableOpacity>
          
          <Text style={styles.welcomeText}>
            Welcome, {userData.name}!
          </Text>
        </>
      ) : (
        <Text style={styles.errorText}>No user data available</Text>
      )}
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.buttonText}>Back to Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
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
  welcomeText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 30,
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 5,
    width: '60%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;