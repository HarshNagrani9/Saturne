// import React, { useState } from "react";
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { 
//   View, 
//   Text, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Modal, 
//   FlatList,
//   Alert
// } from "react-native";

// import API from '../config/api';

// const levelsOfStudy = ["Undergraduate", "Postgraduate", "Doctorate"];
// const specializations = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Data Science", "Artificial Intelligence"];

// const StudyForm = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const email = route.params?.email;
  
//   const [selectedLevel, setSelectedLevel] = useState(levelsOfStudy[0]);
//   const [selectedSpecializations, setSelectedSpecializations] = useState([specializations[0]]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [modalType, setModalType] = useState("level");
//   const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const openModal = (type, index) => {
//     setModalType(type);
//     setSelectedDropdownIndex(index ?? null);
//     setModalVisible(true);
//   };

//   const selectItem = (item) => {
//     if (modalType === "level") {
//       setSelectedLevel(item);
//     } else if (selectedDropdownIndex !== null) {
//       const updatedSpecializations = [...selectedSpecializations];
//       updatedSpecializations[selectedDropdownIndex] = item;
//       setSelectedSpecializations(updatedSpecializations);
//     }
//     setModalVisible(false);
//   };

//   const addSpecialization = () => {
//     if (selectedSpecializations.length < 3) {
//       setSelectedSpecializations([...selectedSpecializations, specializations[0]]);
//     }
//   };

//   const removeSpecialization = (index) => {
//     const updatedSpecializations = selectedSpecializations.filter((_, i) => i !== index);
//     setSelectedSpecializations(updatedSpecializations);
//   };

//   const handleContinue = () => {
//     const formData = {
//       email: email,
//       level: selectedLevel,
//       specializations: selectedSpecializations
//     };

//     setIsSubmitting(true);

//     console.log("Regusteration complete")
//     if (formData){
//       Alert.alert(
//         "Registration Complete",
//         "Thank you for providing your education information!",
//         [
//           { 
//             text: "OK", 
//             onPress: () => {
//               navigation.navigate('Signup');
//             } 
//           }
//         ]
//       );

//     }
    
    
//     console.log('Form submitted with data:', formData);

    
    
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Education Information</Text>
      
//       {email ? (
//         <Text style={styles.emailInfo}>Email: {email}</Text>
//       ) : null}
      
//       <Text style={styles.label}>Select Level of Study</Text>
//       <TouchableOpacity style={styles.dropdown} onPress={() => openModal("level")}> 
//         <Text style={styles.dropdownText}>{selectedLevel}</Text>
//       </TouchableOpacity>

//       <Text style={styles.label}>Select Specialization</Text>
//       {selectedSpecializations.map((spec, index) => (
//         <View key={index} style={styles.specializationContainer}>
//           <TouchableOpacity style={styles.dropdown} onPress={() => openModal("specialization", index)}>
//             <Text style={styles.dropdownText}>{spec}</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.removeButton} onPress={() => removeSpecialization(index)}>
//             <Text style={styles.removeButtonText}>X</Text>
//           </TouchableOpacity>
//         </View>
//       ))}

//       {selectedSpecializations.length < 3 && (
//         <TouchableOpacity style={styles.addButton} onPress={addSpecialization}>
//           <Text style={styles.addButtonText}>+ Add Specialization</Text>
//         </TouchableOpacity>
//       )}

//       <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
//         <Text style={styles.continueButtonText}>Continue</Text>
//       </TouchableOpacity>

//       {/* Modal for Selection */}
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <View style={styles.modalOverlay}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               {modalType === "level" ? "Select Level of Study" : "Select Specialization"}
//             </Text>
//             <FlatList 
//               data={modalType === "level" ? levelsOfStudy : specializations} 
//               keyExtractor={(item) => item}
//               renderItem={({ item }) => (
//                 <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
//                   <Text style={styles.modalItemText}>{item}</Text>
//                 </TouchableOpacity>
//               )} 
//             />
//             <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#eef2f3",
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#2c3e50",
//   },
//   emailInfo: {
//     fontSize: 16,
//     color: "#3498db",
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 20,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#2c3e50",
//   },
//   dropdown: {
//     width: "90%",
//     padding: 14,
//     marginVertical: 8,
//     borderWidth: 1,
//     borderColor: "#7f8c8d",
//     borderRadius: 10,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: "#34495e",
//   },
//   specializationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     width: "90%",
//   },
//   removeButton: {
//     marginLeft: 10,
//     padding: 10,
//     backgroundColor: "#e74c3c",
//     borderRadius: 10,
//   },
//   removeButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   addButton: {
//     marginTop: 15,
//     padding: 12,
//     backgroundColor: "#3498db",
//     borderRadius: 10,
//     alignItems: "center",
//     width: "90%",
//   },
//   addButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   continueButton: {
//     marginTop: 20,
//     padding: 14,
//     backgroundColor: "#27ae60",
//     borderRadius: 10,
//     alignItems: "center",
//     width: "90%",
//   },
//   continueButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//   },
//   modalContent: {
//     width: "80%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     padding: 20,
//     elevation: 5,
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 15,
//     color: "#2c3e50",
//     textAlign: "center",
//   },
//   modalItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//   },
//   modalItemText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   closeButton: {
//     marginTop: 15,
//     padding: 12,
//     backgroundColor: "#bdc3c7",
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "#2c3e50",
//     fontWeight: "bold",
//   },
// });

// export default StudyForm;




import React, { useState } from "react";
import { useNavigation, useRoute } from '@react-navigation/native';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList,
  Alert,
  ActivityIndicator
} from "react-native";

import API from '../config/api';

const levelsOfStudy = ["Undergraduate", "Postgraduate", "Doctorate"];
const specializations = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Data Science", "Artificial Intelligence"];

const StudyForm = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email;
  
  const [selectedLevel, setSelectedLevel] = useState(levelsOfStudy[0]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([specializations[0]]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("level");
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openModal = (type, index) => {
    setModalType(type);
    setSelectedDropdownIndex(index ?? null);
    setModalVisible(true);
  };

  const selectItem = (item) => {
    if (modalType === "level") {
      setSelectedLevel(item);
    } else if (selectedDropdownIndex !== null) {
      const updatedSpecializations = [...selectedSpecializations];
      updatedSpecializations[selectedDropdownIndex] = item;
      setSelectedSpecializations(updatedSpecializations);
    }
    setModalVisible(false);
  };

  const addSpecialization = () => {
    if (selectedSpecializations.length < 3) {
      setSelectedSpecializations([...selectedSpecializations, specializations[0]]);
    }
  };

  const removeSpecialization = (index) => {
    const updatedSpecializations = selectedSpecializations.filter((_, i) => i !== index);
    setSelectedSpecializations(updatedSpecializations);
  };

  // const handleContinue = async () => {
  //   const formData = {
  //     email: email,
  //     level: selectedLevel,
  //     specializations: selectedSpecializations
  //   };
    
  //   console.log('Form submitted with data:', formData);
  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch(API.endpoints.education, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
      
  //     const data = await response.json();
      
  //     if (data.success) {
  //       Alert.alert(
  //         "Registration Complete",
  //         "Thank you for providing your education information!",
  //         [
  //           { 
  //             text: "OK", 
  //             onPress: () => {
  //               navigation.navigate('Signup');
  //             } 
  //           }
  //         ]
  //       );
  //     } else {
  //       Alert.alert("Error", data.message || "Failed to update education information");
  //     }
  //   } catch (error) {
  //     console.error('Education update error:', error);
  //     Alert.alert("Error", "Connection issue. Please try again later.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // In Study.jsx, modify the handleContinue function
const handleContinue = async () => {
  const formData = {
    email: email,
    level: selectedLevel,
    specializations: selectedSpecializations
  };
  
  setIsSubmitting(true);
  
  try {
    const response = await fetch(API.endpoints.education, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (data.success) {
      navigation.navigate('Home', { email });
      // Alert.alert(
      //   "Registration Complete",
      //   "Thank you for providing your education information!",
      //   [
      //     { 
      //       text: "OK", 
      //       onPress: () => {
      //         // Navigate to Home page instead of Signup
              
      //       } 
      //     }
      //   ]
      // );
    } else {
      Alert.alert("Error", data.message || "Failed to update education information");
    }
  } catch (error) {
    console.error('Education update error:', error);
    Alert.alert("Error", "Connection issue. Please try again later.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Education Information</Text>
      
      {email ? (
        <Text style={styles.emailInfo}>Email: {email}</Text>
      ) : null}
      
      <Text style={styles.label}>Select Level of Study</Text>
      <TouchableOpacity style={styles.dropdown} onPress={() => openModal("level")}> 
        <Text style={styles.dropdownText}>{selectedLevel}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Select Specialization</Text>
      {selectedSpecializations.map((spec, index) => (
        <View key={index} style={styles.specializationContainer}>
          <TouchableOpacity style={styles.dropdown} onPress={() => openModal("specialization", index)}>
            <Text style={styles.dropdownText}>{spec}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.removeButton} onPress={() => removeSpecialization(index)}>
            <Text style={styles.removeButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {selectedSpecializations.length < 3 && (
        <TouchableOpacity style={styles.addButton} onPress={addSpecialization}>
          <Text style={styles.addButtonText}>+ Add Specialization</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity 
        style={[styles.continueButton, isSubmitting ? styles.buttonDisabled : null]} 
        onPress={handleContinue}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.continueButtonText}>Continue</Text>
        )}
      </TouchableOpacity>

      {/* Modal for Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === "level" ? "Select Level of Study" : "Select Specialization"}
            </Text>
            <FlatList 
              data={modalType === "level" ? levelsOfStudy : specializations} 
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => selectItem(item)}>
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )} 
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#eef2f3",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
  },
  emailInfo: {
    fontSize: 16,
    color: "#3498db",
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#2c3e50",
  },
  dropdown: {
    width: "90%",
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#7f8c8d",
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dropdownText: {
    fontSize: 16,
    color: "#34495e",
  },
  specializationContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  removeButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#e74c3c",
    borderRadius: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  addButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#3498db",
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  continueButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#27ae60",
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
  },
  buttonDisabled: {
    backgroundColor: "#a3d0bc"
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2c3e50",
    textAlign: "center",
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#bdc3c7",
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#2c3e50",
    fontWeight: "bold",
  },
});

export default StudyForm;