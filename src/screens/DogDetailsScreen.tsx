import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { MainTabParamList } from '../navigation/types';
import { localStorage } from '../services/localStorage';
import { Dog, FeedingLog } from '../types';

type DogDetailsRouteProp = RouteProp<MainTabParamList, 'DogDetails'>;

export const DogDetailsScreen = () => {
  const route = useRoute<DogDetailsRouteProp>();
  const { dogId } = route.params;
  const [dog, setDog] = useState<Dog | null>(null);
  const [logs, setLogs] = useState<FeedingLog[]>([]);

  useEffect(() => {
    loadData();
  }, [dogId]);

  const loadData = async () => {
    const allDogs = await localStorage.getDogs();
    const foundDog = allDogs.find(d => d.id === dogId);
    if (foundDog) setDog(foundDog);

    const feedingLogs = await localStorage.getLogsByDog(dogId);
    setLogs(feedingLogs);
  };

  const handleAddFeeding = async () => {
    const newLog: FeedingLog = {
      id: Date.now().toString(),
      dogId,
      foodType: 'Dry Food',
      amount: '1 Cup',
      timestamp: Date.now(),
    };
    await localStorage.addFeedingLog(newLog);
    loadData();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{dog?.name || 'Dog Details'}</Text>
        <Text style={styles.subtitle}>{dog?.breed}</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Feeding History</Text>
          <TouchableOpacity style={styles.smallButton} onPress={handleAddFeeding}>
            <Text style={styles.buttonText}>+ Feed</Text>
          </TouchableOpacity>
        </View>
        
        {logs.map(log => (
          <View key={log.id} style={styles.logItem}>
            <Text style={styles.logText}>{log.foodType} - {log.amount}</Text>
            <Text style={styles.logDate}>{new Date(log.timestamp).toLocaleTimeString()}</Text>
          </View>
        ))}
        {logs.length === 0 && <Text style={styles.emptyText}>No logs yet.</Text>}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Records</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add Health Record</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#666' },
  section: { padding: 20, marginTop: 10, backgroundColor: '#fff' },
  sectionTitle: { fontSize: 20, fontWeight: '600' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  button: { backgroundColor: '#007AFF', padding: 15, borderRadius: 8, alignItems: 'center' },
  smallButton: { backgroundColor: '#34C759', padding: 8, borderRadius: 6 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  logItem: { 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: '#F0F0F0', 
    flexDirection: 'row', 
    justifyContent: 'space-between' 
  },
  logText: { fontSize: 16 },
  logDate: { color: '#666', fontSize: 12 },
  emptyText: { color: '#999', fontStyle: 'italic', textAlign: 'center', marginTop: 10 }
});