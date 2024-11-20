import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKL_txg9AsDrMMq5YDyZerpsLI-VJaJj8",
  authDomain: "taskmanager-f5d61.firebaseapp.com",
  projectId: "taskmanager-f5d61",
  storageBucket: "taskmanager-f5d61.appspot.com",
  messagingSenderId: "908040986820",
  appId: "1:908040986820:web:d733aacfc4bb513c21e991",
  measurementId: "G-MWF8DZQSF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Firestore CRUD functions
export async function addToFirebase(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), data);
  return docRef.id;
}

export async function getFromFirebase(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function updateInFirebase(collectionName, id, newData) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, newData);
}

export async function deleteFromFirebase(collectionName, id) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
}
