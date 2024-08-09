import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, set, onValue, child } from "firebase/database";
// import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
// import { getFirestore, doc, getDoc } from 'firebase/firestore/lite';

/**
 * getRedirectResult is unused and should not be included in the code base.
 * In addition, there are many other functions within firebase/auth that are
 * not imported and therefore should not be included as well.
 */

function initGmsTest() {
  const firebaseConfig = {
    apiKey: "AIzaSyDc--387sq_sqsmMWzTIzQvZd-g4-aVMKY",
    authDomain: "gsmtest-9f523.firebaseapp.com",
    databaseURL: "https://gsmtest-9f523-default-rtdb.firebaseio.com",
    projectId: "gsmtest-9f523",
    storageBucket: "gsmtest-9f523.appspot.com",
    messagingSenderId: "30656126464",
    appId: "1:30656126464:web:a925a0e4d20a5a32a442e5",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Realtime Database and get a reference to the service
  const db = getDatabase(app);
  return db;
}

function onDeviceChange(db, path) {
  const dbRef = ref(db, path);
  onValue(dbRef, (snapshot) => {
    const data = snapshot.val();
    updateStarCount(postElement, data);
  });
}

function getDeviceData(dbRef, prop = "stateTB") {
  get(child(dbRef, `thietbi1/${prop}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function getAll() {
  const dbRef = ref(getDatabase());
  get(child(dbRef, '/'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, "thietbi1/" + userId), {
    username: name,
    email: email,
    profile_picture: imageUrl,
  });
}

export { initGmsTest, onDeviceChange, writeUserData, getDeviceData,getAll };
