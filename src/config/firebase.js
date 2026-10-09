import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

export const CONFIG = {
    FIREBASE: {
        apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyApwujErcMv2TN0SDOBPf0DeZM3uVwEZDI",
        authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "messenger-fbbf9.firebaseapp.com",
        projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "messenger-fbbf9",
        databaseURL: import.meta.env?.VITE_FIREBASE_DATABASE_URL || "https://messenger-fbbf9-default-rtdb.asia-southeast1.firebasedatabase.app",
        storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "messenger-fbbf9.firebasestorage.app",
        messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "964023347209",
        appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:964023347209:web:d50f81c15d1dd2a981b0d8",
        measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "G-VSR1VWE445"
    },
    MAX_IMAGE_SIZE_BYTES: 10 * 1024 * 1024, // 10MB limit before compression
    MAX_FILE_SIZE_BYTES: 25 * 1024 * 1024, // 25MB limit for PDFs & documents
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    COMPRESSION_MAX_WIDTH: 1200,
    COMPRESSION_QUALITY: 0.8
};

const app = !getApps().length ? initializeApp(CONFIG.FIREBASE) : getApp();

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;
