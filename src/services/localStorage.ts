import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dog, FeedingLog } from '../types';

const DOGS_KEY = '@dogs_data';
const LOGS_KEY = '@feeding_logs';

export const localStorage = {
  // --- Dog Management ---
  async saveDog(dog: Dog) {
    const dogs = await this.getDogs();
    const updatedDogs = [...dogs, dog];
    await AsyncStorage.setItem(DOGS_KEY, JSON.stringify(updatedDogs));
    return dog;
  },

  async getDogs(): Promise<Dog[]> {
    const data = await AsyncStorage.getItem(DOGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  // --- Feeding Logs ---
  async addFeedingLog(log: FeedingLog) {
    const logs = await this.getFeedingLogs();
    const updatedLogs = [log, ...logs];
    await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(updatedLogs));
    return log;
  },

  async getFeedingLogs(): Promise<FeedingLog[]> {
    const data = await AsyncStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data) : [];
  },

  async getLogsByDog(dogId: string): Promise<FeedingLog[]> {
    const allLogs = await this.getFeedingLogs();
    return allLogs.filter(log => log.dogId === dogId);
  }
};