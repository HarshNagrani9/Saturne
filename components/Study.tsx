import React, { useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  FlatList 
} from "react-native";

const levelsOfStudy = ["Undergraduate", "Postgraduate", "Doctorate"];
const specializations = ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Data Science", "Artificial Intelligence"];

const StudyForm: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<string>(levelsOfStudy[0]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([specializations[0]]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"level" | "specialization">("level");
  const [selectedDropdownIndex, setSelectedDropdownIndex] = useState<number | null>(null);

  const openModal = (type: "level" | "specialization", index?: number) => {
    setModalType(type);
    setSelectedDropdownIndex(index ?? null);
    setModalVisible(true);
  };

  const selectItem = (item: string) => {
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

  const removeSpecialization = (index: number) => {
    const updatedSpecializations = selectedSpecializations.filter((_, i) => i !== index);
    setSelectedSpecializations(updatedSpecializations);
  };

  const handleContinue = () => {
    alert("You clicked enter");
  }

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
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