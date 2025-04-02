// frontend/components/CollegeCard.jsx
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import API from '../config/api';
import useUserStore from '../store/userStore';

const CollegeCard = () => {
  const navigation = useNavigation();
  const user = useUserStore(state => state.user);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showNoPost, setShowNoPost] = useState(false);

  // If no user data, redirect to signup
  if (!user) {
    navigation.navigate('Signup');
    return null;
  }

  const handleCardPress = () => {
    setShowNoPost(true);
    setTimeout(() => {
      setShowNoPost(false);
    }, 3000); // Reset after 3 seconds
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
      
      {/* Verify button */}
      <TouchableOpacity 
        style={styles.verifyButton}
        onPress={() => navigation.navigate('VerifyUsers')}
      >
        <Text style={styles.verifyButtonText}>✓</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>{user.college}</Text>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity 
          style={styles.postCard}
          onPress={handleCardPress}
          activeOpacity={0.8}
        >
          {showNoPost ? (
            <View style={styles.noPostContainer}>
              <Text style={styles.noPostText}>No more posts as of now</Text>
            </View>
          ) : (
            <View style={styles.postContent}>
              <Text style={styles.postTitle}>Welcome to your college feed</Text>
              <Text style={styles.postDescription}>
                This is where you'll see posts from your college community. Tap to refresh.
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.postCard}
          onPress={handleCardPress}
          activeOpacity={0.8}
        >
          <View style={styles.postContent}>
            <Text style={styles.postTitle}>College Announcements</Text>
            <Text style={styles.postDescription}>
              Stay tuned for important announcements from your college.
            </Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>About this page</Text>
          <Text style={styles.infoText}>
            This is your college community page. You can view posts from other students, 
            verify new users, and stay connected with your college community.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  verifyButton: {
    position: 'absolute',
    top: 40,
    left: 80,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 100,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 150,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  postDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  noPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPostText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#e8f4f8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#17a2b8',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#17a2b8',
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  }
});

export default CollegeCard;