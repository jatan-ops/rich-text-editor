import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBOQOya1M1jn3c-IxjfnG5Tw4usor4D38k',
  authDomain: 'subcollection-ba8bb.firebaseapp.com',
  projectId: 'subcollection-ba8bb',
  storageBucket: 'subcollection-ba8bb.appspot.com',
  messagingSenderId: '227151240802',
  appId: '1:227151240802:web:622287eb03782b9630bb3b'
});

export const auth = app.auth();

export const db = firebase.firestore();
