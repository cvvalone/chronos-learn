/**
 * Firebase Configuration and Initialization
 * 
 * This file initializes Firebase App, Authentication, and Firestore
 * for the History Education Platform (Variant 15)
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyAVMyjWiSYiYRMXjsr72oIeEWPe9Sygg48",
    authDomain: "new-web-project-f8b78.firebaseapp.com",
    projectId: "new-web-project-f8b78",
    storageBucket: "new-web-project-f8b78.firebasestorage.app",
    messagingSenderId: "1034190787164",
    appId: "1:1034190787164:web:bd255abbdc851423b04c99",
    measurementId: "G-NPLH42PZK8"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

/**
 * Firebase Authentication
 * Handles user sign up, sign in, sign out, and authentication state
 */
export const auth = getAuth(app);

export default app;
