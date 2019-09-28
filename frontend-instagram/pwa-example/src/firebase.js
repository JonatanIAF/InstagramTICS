import firebase from 'firebase'
 
const config = {
    apiKey: "AIzaSyCcEubmGz59_kQlz80R7aGiziOIm5YCY0E",
    authDomain: "pwa-example-9b33d.firebaseapp.com",
    databaseURL: "https://pwa-example-9b33d.firebaseio.com",
    projectId: "pwa-example-9b33d",
    storageBucket: "pwa-example-9b33d.appspot.com",
    messagingSenderId: "83896001636",
    appId: "1:83896001636:web:fee33036c837b9a8882b71"
};
 
firebase.initializeApp(config);
export const db = firebase.firestore();
export const todosCollection = db.collection('fotos');