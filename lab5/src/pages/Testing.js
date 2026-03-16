import React from 'react';
import FirestoreDemo from '../components/FirestoreDemo';

/**
 * Testing Page Component
 * 
 * Lab Requirement: Protected Route
 * This page is ONLY accessible to authenticated users
 * Unauthenticated users are redirected to login page
 * 
 * This page demonstrates:
 * - Reading historical events from Firestore
 * - Writing user progress to Firestore
 * - Firestore database operations
 */
const Testing = ({ onQuizComplete, progress }) => {
    return (
        <div className="testing-page">
            <FirestoreDemo onQuizComplete={onQuizComplete} progress={progress} />
        </div>
    );
};

export default Testing;
