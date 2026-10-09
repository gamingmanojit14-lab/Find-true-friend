/* =========================================================
   firebase-config.js
   একটাই জায়গা যেখানে Firebase config বসাতে হবে।
   সব HTML পেজ এখান থেকে db + প্রয়োজনীয় Firestore functions নেবে।

   ব্যবহার:
     <script type="module">
       import { db, collection, doc, getDoc, getDocs, addDoc,
                setDoc, updateDoc, deleteDoc, query, where,
                orderBy, limit, serverTimestamp, getCountFromServer }
              from './firebase-config.js';
       // ... বাকি কোড
     </script>

   ⚠️ এই ফাইলে শুধু তোমার Firebase web config বসাও।
      কোনো service-account JSON, private key, বা Admin SDK
      ক্রেডেনশিয়াল এখানে রাখো না — সেগুলো ব্রাউজারে কখনো
      রাখা যাবে না।
   ========================================================= */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  getCountFromServer
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

/* =========================================================
   ⚠️⚠️ এখানে তোমার নিজের Firebase config বসাও ⚠️⚠️
   Firebase Console → Project settings → Your apps → Web
   থেকে কপি করে নিচের মানগুলো পেস্ট করো।
   ========================================================= */
const firebaseConfig = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

/* Firebase init — একবারই হয়, সব পেজ এই একই instance পাবে। */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* সব পেজের জন্য যা যা দরকার, সব এখান থেকে export হচ্ছে। */
export { db };

/* Firestore functions re-export — যাতে প্রতিটি পেজে
   আবার CDN থেকে import করতে না হয়। */
export {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  getCountFromServer
};
