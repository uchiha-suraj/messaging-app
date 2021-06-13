import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwOyMpiZWoOSuLBOsWLCiUfOcijtU6nR4",
  authDomain: "messaging-app-78f81.firebaseapp.com",
  projectId: "messaging-app-78f81",
  storageBucket: "messaging-app-78f81.appspot.com",
  messagingSenderId: "622452699784",
  appId: "1:622452699784:web:6167a8b9aa74efc82c253d",
  measurementId: "G-6WJGNJ4T91"
};

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();

  export default db;