import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  applyActionCode,
  GoogleAuthProvider,
  signInWithPopup,
  type User as FirebaseUser,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDJENrior6OVxgHHT0xkitZp-Xj12_By20',
  authDomain: 'mediscan-ai-app.firebaseapp.com',
  projectId: 'mediscan-ai-app',
  storageBucket: 'mediscan-ai-app.firebasestorage.com',
  messagingSenderId: '887417209376',
  appId: '1:887417209376:web:0ee850da4f543051967245',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
await setPersistence(auth, browserLocalPersistence);

export interface PlainUser {
  firstName: string;
  lastName: string;
  uid: string;
  email: string | null;
}

export const mapFirebaseUser = (u: FirebaseUser | null): PlainUser | null => {
  if (!u) return null;
  let firstName = '',
    lastName = '';
  if (u.displayName) {
    const parts = u.displayName.trim().split(' ');
    firstName = parts[0];
    lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
  }
  return {
    firstName,
    lastName,
    uid: u.uid,
    email: u.email,
  };
};

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
  onAuthStateChanged(auth, (u) => u?.emailVerified ? cb(mapFirebaseUser(u)) : cb(null));

export const sendVerificationEmail = async (u: FirebaseUser) =>
  sendEmailVerification(u);

export const applyVerificationCode = async (oobCode: string) =>
  applyActionCode(auth, oobCode);

function isFirebaseAuthError(error: unknown): error is { code: string } {
  return (
    typeof error === 'object' &&
    error !== null &&
    Object.prototype.hasOwnProperty.call(error, 'code') &&
    typeof (error as Record<string, unknown>).code === 'string'
  );
}

/**
 * Opens a Google sign-in popup.
 */
export const loginWithGoogle = async (): Promise<PlainUser | null> => {
  const googleProvider = new GoogleAuthProvider();
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    return mapFirebaseUser(user);
  } catch (e: unknown) {
    if (isFirebaseAuthError(e)) {
      const code = e.code;
      if (
        code === 'auth/popup-closed-by-user' ||
        code === 'auth/cancelled-popup-request'
      )
        return null;
      if (code === 'auth/popup-blocked') {
        throw new Error(
          'Your browser blocked the sign-in window. Enable pop-ups and try again.'
        );
      }
    }
    throw e;
  }
};
