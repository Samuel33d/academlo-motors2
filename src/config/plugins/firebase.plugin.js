import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { envs } from "../enviroments/enviroments.js";

const firebaseConfig = {
    apiKey: envs.FIREBASE_API_KEY,
    projectId: envs.FIREBASE_PROJECT_ID,
    storageBucket: envs.FIREBASE_STORAGE_BUCKET,
    appId: envs.FIREBASE_APP_ID
};

const fireBaseApp = initializeApp(firebaseConfig);
const storage = getStorage(fireBaseApp)

export const utilsFireBase = {
    storage,
    ref,
    uploadBytes,
    getDownloadURL
}