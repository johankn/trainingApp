// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz0tDLY8WnCqxTudZH0br6EwvlF_GjTc4",
    authDomain: "train-with-me-v2.firebaseapp.com",
    projectId: "train-with-me-v2",
    storageBucket: "train-with-me-v2.appspot.com",
    messagingSenderId: "979442638874",
    appId: "1:979442638874:web:ff59c6c2002397925931a3",
    measurementId: "G-1YM6CHQ0TQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

export const db = getFirestore(app);
export const auth = getAuth(app);

export async function upload(file, currentUser, setUrl) {
    const fileRef = ref(storage, currentUser.uid + '.png');
  
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
  
    updateProfile(currentUser, {photoURL});
    
    setUrl(photoURL);

    alert("Uploaded file!");
  }

export async function uploadImg(file, currentUser, folder, imgName, setUrl) {
    const fileRef = ref(storage, folder + '/' + currentUser.uid + '/' + imgName + '.png');
  
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    
    setUrl(photoURL);

    alert("Uploaded file!");
  }