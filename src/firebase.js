// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQYWY7dMg8sE7naUPxOm1A4JytsDxC1Fw",
  authDomain: "fir-crud-78ccf.firebaseapp.com",
  projectId: "fir-crud-78ccf",
  storageBucket: "fir-crud-78ccf.appspot.com",
  messagingSenderId: "1042992479915",
  appId: "1:1042992479915:web:23718d30952ee75e4581ee",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
