import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@7.1.1/build/esm/index.js';

// Initialize IndexedDB
const dbPromise = openDB('task-manager', 1, {
  upgrade(db) {
    db.createObjectStore('tasks', { keyPath: 'id', autoIncrement: true });
  }
});

// IndexedDB CRUD Functions
export async function addToIndexedDB(storeName, data) {
  const db = await dbPromise;
  return db.put(storeName, data);
}

export async function getFromIndexedDB(storeName) {
  const db = await dbPromise;
  return db.getAll(storeName);
}

export async function updateIndexedDB(storeName, id, newData) {
  const db = await dbPromise;
  const oldData = await db.get(storeName, id);
  const updatedData = { ...oldData, ...newData };
  return db.put(storeName, updatedData);
}

export async function deleteFromIndexedDB(storeName, id) {
  const db = await dbPromise;
  return db.delete(storeName, id);
}

// Sync function to upload local data from IndexedDB to Firebase
export async function syncWithFirebase(callback) {
  const data = await getFromIndexedDB('tasks');
  data.forEach(async (task) => {
    try {
      await callback(task);
      console.log(`Task with ID ${task.id} synced.`);
    } catch (error) {
      console.error('Error syncing task:', error);
    }
  });
}
