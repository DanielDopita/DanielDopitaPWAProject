import { getFromIndexedDB, deleteFromIndexedDB } from './indexedDB.js';
import { addToFirebase, getFromFirebase } from './firebaseDB.js';

// Sync data with Firebase when online
function syncDataWithFirebase() {
  window.addEventListener('online', async () => {
    console.log('Back online, syncing data...');
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      const tasks = await getFromIndexedDB('games', userId);
      tasks.forEach(async (task) => {
        try {
          // Ensure Firebase generates unique IDs and prevent duplication
          const existingTask = await getFromFirebase('games');
          const isDuplicate = existingTask.some(existing => existing.id === task.id);
          if (!isDuplicate) {
            await addToFirebase('games', task);
            await deleteFromIndexedDB('games', task.id);
            console.log('Game synced:', task);
          }
        } catch (error) {
          console.error('Error syncing game:', error);
        }
      });
    }
  });
}

syncDataWithFirebase();
