import { openDB } from 'https://cdn.jsdelivr.net/npm/idb@8.0.0/+esm';

// Initialize IndexedDB
const dbPromise = openDB('task-manager', 1, {
  upgrade(db) {
    db.createObjectStore('games', { keyPath: 'id', autoIncrement: true });
  }
});

// IndexedDB CRUD Functions (User linked)
export async function addToIndexedDB(storeName, data) {
  const db = await dbPromise;
  try {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const result = await store.add(data);
    await tx.done;
    return result;
  } catch (error) {
    console.error('Error adding to IndexedDB:', error);
  }
}

export async function getFromIndexedDB(storeName, userId) {
  const db = await dbPromise;
  try {
    const allData = await db.getAll(storeName);
    return allData.filter(item => item.userId === userId); // Filter by userId
  } catch (error) {
    console.error('Error fetching from IndexedDB:', error);
  }
}

export async function updateIndexedDB(storeName, id, newData) {
  const db = await dbPromise;
  try {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const result = await store.put({ ...newData, id });
    await tx.done;
    return result;
  } catch (error) {
    console.error('Error updating IndexedDB:', error);
  }
}

export async function deleteFromIndexedDB(storeName, id) {
  const db = await dbPromise;
  try {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    await store.delete(id);
    await tx.done;
  } catch (error) {
    console.error('Error deleting from IndexedDB:', error);
  }
}
