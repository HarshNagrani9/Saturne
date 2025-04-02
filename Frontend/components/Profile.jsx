// frontend/components/Profile.jsx
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../store/userStore';

const Profile = () => {
  const navigation = useNavigation();
  
  // Get user data from Zustand store
  const user = useUserStore(state => state.user);
  const clearUser = useUserStore(state => state.clearUser);
  
  // If no user data, redirect to signup
  if (!user) {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signup' }],
    });
    return null;
  }

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Signup' }],
    });
    clearUser();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileInitial}>{user.name ? user.name[0].toUpperCase() : '?'}</Text>
          </View>
          <Text style={styles.profileName}>{user.name}</Text>
          
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.profileSection}>
          <Text style={styles.sectionLabel}>Email</Text>
          <Text style={styles.sectionContent}>{user.email}</Text>
        </View>
        
        <View style={styles.profileSection}>
          <Text style={styles.sectionLabel}>College</Text>
          <Text style={styles.sectionContent}>{user.college}</Text>
        </View>
        
        {user.linkedinProfile && (
          <View style={styles.profileSection}>
            <Text style={styles.sectionLabel}>LinkedIn</Text>
            <Text style={styles.sectionContent}>{user.linkedinProfile}</Text>
          </View>
        )}
        
        <View style={styles.profileSection}>
          <Text style={styles.sectionLabel}>Verification Status</Text>
          <View style={styles.verificationContainer}>
            <Text style={[
              styles.verificationStatus, 
              user.isVerified ? styles.verifiedText : styles.unverifiedText
            ]}>
              {user.isVerified ? 'Verified ✓' : 'Pending Verification'}
            </Text>
            <Text style={styles.verificationCount}>
              Verifications: {user.verificationCount}/3
            </Text>
          </View>
        </View>
        
        {user.education && (
          <View style={styles.profileSection}>
            <Text style={styles.sectionLabel}>Education</Text>
            <View style={styles.educationContainer}>
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
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
  profileIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  profileInitial: {
    color: '#fff',
    fontSize: 42,
    fontWeight: 'bold',
  },
  profileName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 18,
    color: '#333',
  },
  verificationContainer: {
    marginTop: 5,
  },
  verificationStatus: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  verifiedText: {
    color: '#28a745',
  },
  unverifiedText: {
    color: '#ffc107',
  },
  verificationCount: {
    fontSize: 16,
    color: '#6c757d',
  },
  educationContainer: {
    marginTop: 5,
  },
  educationLevel: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  specializationsTitle: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    marginBottom: 8,
  },
  specializationItem: {
    fontSize: 16,
    color: '#555',
    marginLeft: 15,
    marginBottom: 6,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  }
});

export default Profile;