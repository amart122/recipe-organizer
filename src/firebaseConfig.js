import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-75CEyHRvwAHC6TRvlCht79PjbhKxaBM",
  authDomain: "recipeorganizer-3286e.firebaseapp.com",
  projectId: "recipeorganizer-3286e",
  storageBucket: "recipeorganizer-3286e.appspot.com",
  messagingSenderId: "689804446980",
  appId: "1:689804446980:web:fca432049d142da963d451",
  measurementId: "G-V9RXRV21BW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };