import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../utils/firebase";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
} from "@firebase/auth";
import { collection, addDoc } from "@firebase/firestore";

import { NewUser, SignUpCredentials } from "../types/user";

const AuthContext = createContext({
  authUser: null,
  user: null,
  loading: true,
  logout: () => {},
  signUp: async ({ email, password }: SignUpCredentials) => {},
  createUser: async (newUser: NewUser) => {},
});

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
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

  const createUser = async (newUser: NewUser) => {
    try {
      await addDoc(collection(db, "users"), newUser);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ authUser, user, loading, logout, signUp, createUser }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
