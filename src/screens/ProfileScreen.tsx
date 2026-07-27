import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
export const ProfileScreen = () => {
  const handleClearData = async () => {
    // Simple local data management
    alert('Data management coming soon');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarPlaceholder} />
        <Text style={styles.name}>User Name</Text>
        <Text style={styles.email}>user@example.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleClearData}>
          <Text style={[styles.menuText, { color: '#FF3B30' }]}>Clear All Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { alignItems: 'center', padding: 40, backgroundColor: '#fff' },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#E1E1E1', marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold' },
  email: { fontSize: 16, color: '#666' },
  menu: { marginTop: 20, backgroundColor: '#fff' },
  menuItem: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  menuText: { fontSize: 16 }
});