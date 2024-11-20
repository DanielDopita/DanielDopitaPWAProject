import { addToIndexedDB, getFromIndexedDB, syncWithFirebase } from './indexedDB.js';
import { addToFirebase, getFromFirebase } from './firebaseDB.js';

export function monitorConnectionStatus() {
  // Monitor for online/offline status changes
  window.addEventListener('online', () => {
    console.log('App is online. Syncing data with Firebase...');
    syncDataWithFirebase();
  });

  window.addEventListener('offline', () => {
    console.log('App is offline. Data will be stored locally in IndexedDB.');
  });
}

// Sync data from IndexedDB to Firebase when online
async function syncDataWithFirebase() {
  const localData = await getFromIndexedDB('tasks');  // Assuming 'tasks' store in IndexedDB
  localData.forEach(async (task) => {
    try {
      await addToFirebase('games', task);  // Assuming you want to sync with 'games' collection in Firebase
      console.log(`Task ${task.id} synced with Firebase.`);
      await deleteFromIndexedDB('tasks', task.id);  // Remove synced task from IndexedDB
    } catch (error) {
      console.error('Error syncing with Firebase:', error);
    }
  });
}
