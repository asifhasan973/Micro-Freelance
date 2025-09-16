// src/lib/auth.ts
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { auth, googleProvider } from "./firebase";

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export const signUpWithEmail = async (name: string, email: string, password: string) => {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  // set displayName so UI (Navbar) can show it
  if (cred.user && name) {
    await updateProfile(cred.user, { displayName: name });
  }
  return cred;
};

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);

// subscribe to user changes
export const subscribeToAuth = (cb: (user: User | null) => void) =>
  onAuthStateChanged(auth, cb);