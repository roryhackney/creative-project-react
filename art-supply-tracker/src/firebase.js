import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCKqsdukJJTiFlOWtngZmuCwKFJlwn7QLU",
    authDomain: "artsupplytracker.firebaseapp.com",
    databaseURL: "https://artsupplytracker-default-rtdb.firebaseio.com",
    projectId: "artsupplytracker",
    storageBucket: "artsupplytracker.firebasestorage.app",
    messagingSenderId: "824613556340",
    appId: "1:824613556340:web:361581994b0ea573db8121",
    measurementId: "G-TQLW9QQ1XF"
};
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

export {firebaseApp, auth, database};