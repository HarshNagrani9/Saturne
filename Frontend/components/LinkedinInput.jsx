import React, { useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";

import API from '../config/api'

const LinkedinInput = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get email from navigation params
  const email = route.params?.email;
  
  const [linkedinProfile, setLinkedinProfile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateLinkedinUrl = (url) => {
    // Basic validation for LinkedIn URL
    const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/;
    return linkedinRegex.test(url);
  };

  const handleSubmit = async () => {
    // Clear previous errors
    setError("");
    
    // Validate LinkedIn profile
    if (!linkedinProfile.trim()) {
      setError("LinkedIn profile URL is required");
      return;
    }
    
    if (!validateLinkedinUrl(linkedinProfile)) {
      setError("Please enter a valid LinkedIn profile URL (e.g., https://linkedin.com/in/username)");
      return;
    }
    
    if (!email) {
      setError("Email information is missing. Please go back to the signup page.");
      return;
    }
    
    // Show loading indicator
    setIsLoading(true);
    
    try {
      console.log("Updating LinkedIn profile for:", email);
      
      // Make API call to update LinkedIn profile
      const response = await fetch(`${API.baseURL}/users/linkedin`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email,
          linkedinProfile 
        }),
      });
      
      console.log("Response status:", response.status);
      
      const data = await response.json();
      
      if (data.success) {
        // Continue to next screen
        navigation.navigate('Study', { email });
      } else {
        setError(data.message || 'Failed to update LinkedIn profile');
      }
    } catch (error) {
      console.error('LinkedIn update error:', error);
      
      if (error.message.includes('Network request failed')) {
        setError('Network connection error. Please check that the server is running and you are connected to the network.');
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your LinkedIn Profile</Text>
      <Text style={styles.description}>Please enter your LinkedIn profile URL</Text>
      
      {email ? (
        <Text style={styles.emailInfo}>Email: {email}</Text>
      ) : null}
      
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholder="https://linkedin.com/in/username"
        value={linkedinProfile}
        onChangeText={(text) => {
          setLinkedinProfile(text);
          if (error) setError("");
        }}
        autoCapitalize="none"
        autoCorrect={false}
      />
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      
      <TouchableOpacity 
        style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
        onPress={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 24,
  },
  emailInfo: {
    fontSize: 16,
    color: "#3498db",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  inputError: {
    borderColor: "#dc3545",
  },
  errorText: {
    color: "#dc3545",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#6c95c9",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default LinkedinInput;