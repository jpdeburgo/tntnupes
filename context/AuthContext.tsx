"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { getDoc, doc, setDoc } from "@firebase/firestore";
import nookies from "nookies";

import { NewUser, SignUpCredentials } from "../types/user";

const AuthContext = createContext({
  authUser: null,
  user: null,
  loading: true,
  logout: () => {},
  signUp: async ({ email, password }: SignUpCredentials) => {},
  createUser: async (newUser: NewUser) => {},
  signInWithEmailAndPassword: async (email: string, password: string) => {},
  signInWithGoogle: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setAuthUser(user);
        const token = await user.getIdToken();
        nookies.set(
          undefined,
          "authUser",
          JSON.stringify({ token, uid: user.uid }),
          { path: "/" }
        ); // Store the token in cookies        const cookieSetter = await cookies();
      } else {
        setAuthUser(null);
        nookies.destroy(undefined, "authUser"); // Remove token if user is logged out
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
    setAuthUser(null);
  };

  const signUp = async ({ email, password }: SignUpCredentials) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    debugger;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    try {
      await signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const createUser = async (newUser: NewUser) => {
    if (!authUser) {
      throw new Error("You must be signed in to create user");
    }
    try {
      const newUserRef = doc(db, "users", authUser.uid);
      await setDoc(newUserRef, {
        ...newUser,
        id: authUser.uid,
        email: authUser.email,
        verified: false,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const setCurrentUser = async () => {
      if (authUser && !user) {
        const userDoc = await getDoc(doc(db, "users", authUser.uid));
        if (userDoc.exists) {
          setUser(userDoc.data());
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    setCurrentUser();
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        user,
        loading,
        logout,
        signUp,
        createUser,
        signInWithEmailAndPassword,
        signInWithGoogle,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
