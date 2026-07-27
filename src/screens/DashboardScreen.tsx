import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { Plus, Dog as DogIcon } from 'lucide-react-native';
import { localStorage } from '../services/localStorage';
import { Dog } from '../types';
import { useNavigation } from '@react-navigation/native';

export const DashboardScreen = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newDogName, setNewDogName] = useState('');
  const [newDogBreed, setNewDogBreed] = useState('');
  const navigation = useNavigation<any>();

  useEffect(() => {
    loadDogs();
  }, []);

  const loadDogs = async () => {
    const savedDogs = await localStorage.getDogs();
    setDogs(savedDogs);
  };

  const handleAddDog = async () => {
    if (!newDogName) return;
    const newDog: Dog = {
      id: Date.now().toString(),
      ownerId: 'local-user',
      name: newDogName,
      breed: newDogBreed,
      age: 0,
      weight: 0,
      createdAt: Date.now(),
    };
    await localStorage.saveDog(newDog);
    setNewDogName('');
    setNewDogBreed('');
    setModalVisible(false);
    loadDogs();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Dogs</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Plus color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={dogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.dogCard} 
            onPress={() => navigation.navigate('DogDetails', { dogId: item.id })}
          >
            <DogIcon color="#007AFF" size={32} />
            <View style={styles.dogInfo}>
              <Text style={styles.dogName}>{item.name}</Text>
              <Text style={styles.dogBreed}>{item.breed}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No dogs added yet.</Text>
          </View>
        }
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Add New Dog</Text>
          <TextInput
            style={styles.input}
            placeholder="Dog Name"
            value={newDogName}
            onChangeText={setNewDogName}
          />
          <TextInput
            style={styles.input}
            placeholder="Breed"
            value={newDogBreed}
            onChangeText={setNewDogBreed}
          />
          <View style={styles.modalButtons}>
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
            <Button title="Add Dog" onPress={handleAddDog} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20 
  },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1A1A1A' },
  addButton: { 
    backgroundColor: '#007AFF', 
    width: 44, 
    height: 44, 
    borderRadius: 22, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#666', fontSize: 16 },
  dogCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dogInfo: { marginLeft: 15 },
  dogName: { fontSize: 18, fontWeight: 'bold' },
  dogBreed: { color: '#666' },
  modalContent: { flex: 1, padding: 40, justifyContent: 'center' },
  modalTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginBottom: 15 
  },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }
});