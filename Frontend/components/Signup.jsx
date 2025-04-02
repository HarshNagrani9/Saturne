import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  Modal,
  FlatList,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated
} from "react-native";
import API from '../config/api'
import useUserStore from '../store/userStore';

// Import college data
import collegesData from "../data/colleges.json"; 

const Signup = () => {
  const navigation = useNavigation();
  const setUser = useUserStore(state => state.setUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState(collegesData[0].name); // Default to first college
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Simulate loading time
  useEffect(() => {
    // Simulate API calls or asset loading
    const loadData = async () => {
      try {
        // Simulate network request
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Fade in the content
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }).start();
        
        // Hide loader
        setIsLoading(false);
      } catch (error) {
        console.error("Loading error:", error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSignup = async () => {
    if (!name || !email || !college) {
      alert("Please enter all fields");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch(API.endpoints.users, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          college
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log("Data")

        const userData = {
          _id: data.data._id,
          name,
          email,
          college,
          isVerified: data.data.isVerified || false,
          verificationCount: data.data.verificationCount || 0,
          education: data.data.education || {
            level: 'Undergraduate',
            specializations: []
          }
        };

        setUser(userData);
      
      // Log to verify the data was stored
      console.log('Current store state:', useUserStore.getState().user);

        navigation.navigate('LinkedinInput', { email });
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('An error occurred during signup. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectCollege = (selectedCollege) => {
    setCollege(selectedCollege);
    setModalVisible(false);
  };

  const renderCollegeItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.collegeItem,
        college === item.name && styles.selectedItem
      ]}
      onPress={() => selectCollege(item.name)}
    >
      <Text style={styles.collegeItemText}>{item.name}</Text>
      {college === item.name && (
        <Text style={styles.checkmark}>✓</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Loader */}
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#007bff" />
          </View>
        )}
        
        {/* Main Content */}
        {!isLoading && (
          <Animated.View 
            style={[
              styles.container,
              { opacity: fadeAnim }
            ]}
          >
            {/* Header Image */}
            <Image 
              source={{ uri: "https://source.unsplash.com/random/200x200" }} 
              style={styles.headerImage} 
            />
            
            {/* Heading and Description */}
            <Text style={styles.title}>Welcome to Saturne</Text>
            <Text style={styles.description}>Please enter your details to continue.</Text>
            
            {/* Name Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
            
            {/* Email Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            
            {/* Custom College Dropdown */}
            <TouchableOpacity 
              style={styles.dropdownButton} 
              onPress={() => setModalVisible(true)}
            >
              <Text style={college ? styles.dropdownButtonText : styles.dropdownPlaceholder}>
                {college || "Select your college"}
              </Text>
              <Text style={styles.dropdownArrow}>▼</Text>
            </TouchableOpacity>
            
            {/* Continue Button */}
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </KeyboardAvoidingView>
      
      {/* College Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select your college</Text>
            
            <FlatList
              data={collegesData}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderCollegeItem}
            />
            
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardView: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  headerImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  dropdownButton: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownButtonText: {
    color: "#333",
    fontSize: 14,
  },
  dropdownPlaceholder: {
    color: "#999",
    fontSize: 14,
  },
  dropdownArrow: {
    color: "#007bff",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  collegeItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedItem: {
    backgroundColor: "#f0f9ff",
  },
  collegeItemText: {
    fontSize: 16,
    color: "#333",
  },
  checkmark: {
    color: "#007bff",
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    marginTop: 20,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Signup;