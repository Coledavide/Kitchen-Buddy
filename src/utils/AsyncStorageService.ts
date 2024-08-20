import AsyncStorage from "@react-native-async-storage/async-storage";

const AsyncStorageService = {
  // Save a value with a specific key
  setItem: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item with key ${key}: `, error);
    }
  },

  // Get a value by key
  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item with key ${key}: `, error);
    }
  },

  // Remove a value by key
  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key ${key}: `, error);
    }
  },

  // Get all keys
  getAllKeys: async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      return keys;
    } catch (error) {
      console.error(`Error getting all keys: `, error);
    }
  },

  // Clear all AsyncStorage
  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error(`Error clearing AsyncStorage: `, error);
    }
  },
};

export default AsyncStorageService;
