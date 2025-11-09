import React, { useEffect, useState, useRef } from "react";
import {
  getAuth,
  onAuthStateChanged,
  type User as FirebaseUser,
  type UserCredential,
  type ConfirmationResult,
} from "firebase/auth";
import app from "./firebase";
import { emailAuth, phoneAuth } from "./authService";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);

export type AuthContextValue = {
  user: FirebaseUser | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  logout: () => Promise<void>;
  sendOTP: (phone: string) => Promise<void>;
  verifyOTP: (code: string) => Promise<void>;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const confirmationResult = useRef<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signUp = async (email: string, password: string) =>
    await emailAuth.signUp(email, password);

  const signIn = async (email: string, password: string) =>
    await emailAuth.signIn(email, password);

  const logout = async () => await emailAuth.logout();

  const sendOTP = async (phone: string) => {
    const result = await phoneAuth.sendOTP(phone);
    confirmationResult.current = result;
  };

  const verifyOTP = async (code: string) => {
    if (!confirmationResult.current) throw new Error("OTP not sent yet");
    await confirmationResult.current.confirm(code);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signUp, signIn, logout, sendOTP, verifyOTP }}
    >
      {children}
    </AuthContext.Provider>
  );
};
