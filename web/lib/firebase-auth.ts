import { ROUTES } from "@/constants/nav";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { clientEnv } from "./env/client.mjs";

export { AuthErrorCodes, linkWithCredential } from "firebase/auth";

export const firebaseConfig = {
  apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: clientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: clientEnv.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

auth.useDeviceLanguage();

type OAuthSignIn = {
  method: "GOOGLE";
};

export const signIn = async (param: OAuthSignIn) => {
  switch (param.method) {
    case "GOOGLE":
      return signInWithRedirect(auth, new GoogleAuthProvider());
    default:
      throw new Error("Invalid sign in method");
  }
};

export const signOut = async () => {
  await auth.signOut();
  window.location.replace(ROUTES.SIGN_IN);
};
