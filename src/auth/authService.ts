import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult,
} from "firebase/auth";
import app from "./firebase";

const auth = getAuth(app);

let recaptchaVerifier: RecaptchaVerifier | null = null;

export const initRecaptcha = () => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
  }
  return recaptchaVerifier;
};

export const emailAuth = {
  signUp: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),

  signIn: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),

  logout: () => signOut(auth),
};

export const phoneAuth = {
  sendOTP: async (phoneNumber: string): Promise<ConfirmationResult> => {
    const verifier = initRecaptcha();
    return signInWithPhoneNumber(auth, phoneNumber, verifier!);
  },
};
