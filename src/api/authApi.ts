import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User as FirebaseUser,
  sendPasswordResetEmail,
  sendEmailVerification,
  applyActionCode,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJENrior6OVxgHHT0xkitZp-Xj12_By20',
  authDomain: 'mediscan-ai-app.firebaseapp.com',
  projectId: 'mediscan-ai-app',
  storageBucket: 'mediscan-ai-app.firebasestorage.app',
  messagingSenderId: '887417209376',
  appId: '1:887417209376:web:0ee850da4f543051967245',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export interface PlainUser {
  uid: string;
  email: string | null;
}

export const mapFirebaseUser = (u: FirebaseUser | null): PlainUser | null =>
  u ? { uid: u.uid, email: u.email } : null;

export const login = async (email: string, password: string) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return mapFirebaseUser(user);
};

export const register = async (email: string, password: string) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user;
};

export const logout = async () => {
  await signOut(auth);
};

export const sendResetPasswordEmail = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};

export const onAuthChange = (cb: (u: PlainUser | null) => void) =>
  onAuthStateChanged(auth, (u) => cb(mapFirebaseUser(u)));

export const sendVerificationEmail = async (u: FirebaseUser) =>
  sendEmailVerification(u);

export const applyVerificationCode = async (oobCode: string) =>
  applyActionCode(auth, oobCode);
