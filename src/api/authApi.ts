import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
  sendPasswordResetEmail,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJENrior6OVxgHHT0xkitZp-Xj12_By20',
  authDomain: 'mediscan-ai-app.firebaseapp.com',
  projectId: 'mediscan-ai-app',
  storageBucket: 'mediscan-ai-app.firebasestorage.app',
  messagingSenderId: '887417209376',
  appId: '1:887417209376:web:0ee850da4f543051967245',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const register = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

export const logout = async () => {
  await signOut(auth);
};

export const sendResetPasswordEmail = async (email: string) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
};

export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
