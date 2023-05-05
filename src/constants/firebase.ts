import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBC3bf-wDVPqeuLFeP_9OUsJr5st0vmBbY",
  authDomain: "chainedx-7db8b.firebaseapp.com",
  projectId: "chainedx-7db8b",
  storageBucket: "chainedx-7db8b.appspot.com",
  messagingSenderId: "849083750136",
  appId: "1:849083750136:web:7fb0a0442c6023b70ccd0d",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
