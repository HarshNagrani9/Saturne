// frontend/components/Signin.jsx
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import API from '../config/api';
import useUserStore from '../store/userStore';

const Signin = () => {
  const navigation = useNavigation();
  const setUser = useUserStore(state => state.setUser);
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignin = async () => {
    // Clear previous errors
    setError("");
    
    // Validate email
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    // Show loading indicator
    setIsLoading(true);
    
    try {
      // Try to find the user with this email
      const response = await fetch(`${API.endpoints.users}/${encodeURIComponent(email)}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setError("No account found with this email");
        } else {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        setIsLoading(false);
        return;
      }
      
      const data = await response.json();
      
      if (data.success && data.data) {
        // Store user data in Zustand
        setUser(data.data);
        
        // Navigate to Home
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } else {
        setError(data.message || "Failed to sign in");
      }
    } catch (error) {
      console.error('Sign in error:', error);
      setError(`Connection error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.container}>
          <View style={styles.card}>
            <View style={styles.logoContainer}>
              <Image 
                source={{ uri: "https://source.unsplash.com/random/200x200" }} 
                style={styles.headerImage} 
              />
            </View>
            
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.description}>Please enter your email to sign in</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={[styles.input, error ? styles.inputError : null]}
                placeholder="Enter your email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (error) setError("");
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TouchableOpacity 
              style={[styles.button, isLoading ? styles.buttonDisabled : null]} 
              onPress={handleSignin}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signUpLink}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f9fc",
  },
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  headerImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#f0f8ff",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: "#6c757d",
    marginBottom: 24,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#495057",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 14,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  inputError: {
    borderColor: "#dc3545",
    borderWidth: 1.5,
  },
  errorText: {
    color: "#dc3545",
    marginBottom: 16,
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 16,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: "#a9c9fa",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'center',
  },
  signUpText: {
    color: "#6c757d",
    fontSize: 15,
  },
  signUpLink: {
    color: "#007bff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },
});

export default Signin;