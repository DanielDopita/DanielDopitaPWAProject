import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKL_txg9AsDrMMq5YDyZerpsLI-VJaJj8",
  authDomain: "taskmanager-f5d61.firebaseapp.com",
  projectId: "taskmanager-f5d61",
  storageBucket: "taskmanager-f5d61.firebasestorage.app",
  messagingSenderId: "908040986820",
  appId: "1:908040986820:web:d733aacfc4bb513c21e991",
  measurementId: "G-MWF8DZQSF0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Firebase Authentication - Sign-in and Sign-out
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Signed in as', userCredential.user.email);
    return userCredential.user;
  } catch (e) {
    console.error('Error signing in: ', e);
    alert("Error signing in. Please check your credentials.");
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('User signed out');
  } catch (e) {
    console.error('Error signing out: ', e);
    alert("Error signing out. Please try again.");
  }
};

// Firestore CRUD functions (User linked)
export async function addToFirebase(collectionName, data) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");
    const userCollection = collection(db, "users", user.uid, collectionName);
    const docRef = await addDoc(userCollection, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Please sign in to perform this action.");
  }
}

export async function getFromFirebase(collectionName) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");
    const userCollection = collection(db, "users", user.uid, collectionName);
    const snapshot = await getDocs(userCollection);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error getting documents: ", e);
    alert("Error retrieving data. Please try again later.");
  }
}

export async function updateInFirebase(collectionName, id, newData) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");
    const docRef = doc(db, "users", user.uid, collectionName, id);
    await updateDoc(docRef, newData);
    console.log("Document updated with ID: ", id);
  } catch (e) {
    console.error("Error updating document: ", e);
    alert("Error updating document. Please try again later.");
  }
}

export async function deleteFromFirebase(collectionName, id) {
  try {
    const user = auth.currentUser;
    if (!user) throw new Error("User is not authenticated");
    const docRef = doc(db, "users", user.uid, collectionName, id);
    await deleteDoc(docRef);
    console.log("Document deleted with ID: ", id);
  } catch (e) {
    console.error("Error deleting document: ", e);
    alert("Error deleting document. Please try again later.");
  }
}

// Firebase user-specific data functions (Sync)
export const storeUserData = async (userId, gameData) => {
  const gameRef = doc(db, "users", userId, "games", gameData.id);
  await setDoc(gameRef, gameData);
};

export const getUserData = async (userId) => {
  const userData = collection(db, "users", userId, "games");
  const querySnapshot = await getDocs(userData);
  const data = querySnapshot.docs.map(doc => doc.data());
  return data;
};

// New function to add game objects from games.html
export const addGameToFirebase = async (gameData) => {
  return addToFirebase("games", gameData);
};

// New function to add genre objects from genres.html
export const addGenreToFirebase = async (genreData) => {
  return addToFirebase("genres", genreData);
};
