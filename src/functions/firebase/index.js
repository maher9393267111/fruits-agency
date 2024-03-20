// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  // apiKey: "AIzaSyB1wKlWYBGwmDRP8tUc2DJmGzgTk8HwbLw",
  // authDomain: "posts-app-d8514.firebaseapp.com",
  // projectId: "posts-app-d8514",
  // storageBucket: "posts-app-d8514.appspot.com",
  // messagingSenderId: "952942736909",
  // appId: "1:952942736909:web:0abc58c0c68016f0078744",
  // measurementId: "G-H8REBXMYQQ"

  // apiKey: "AIzaSyA1aPqjHTrPxoFlVxF-lLiAI3cy2i3SR5k",
  // authDomain: "maher-vue.firebaseapp.com",
  // databaseURL: "https://maher-vue-default-rtdb.firebaseio.com",
  // projectId: "maher-vue",
  // storageBucket: "maher-vue.appspot.com",
  // messagingSenderId: "694861415607",
  // appId: "1:694861415607:web:71de73cd65bcbc105c7932"

  apiKey: "AIzaSyDlBPya-45ajS_9x27lL_6TBcWNmMhk8L4",
  authDomain: "posts-app-63482.firebaseapp.com",
  databaseURL: "https://posts-app-63482.firebaseio.com",
  projectId: "posts-app-63482",
  storageBucket: "posts-app-63482.appspot.com",
  messagingSenderId: "476032390285",
  appId: "1:476032390285:web:da399a93d74c618f7cbec4",
  measurementId: "G-XQBTD6HZSM",

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app);

export default firestoreDatabase;

export const provider =  new GoogleAuthProvider()