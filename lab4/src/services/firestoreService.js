/**
 * Firestore Helper Functions
 * 
 * Functions for reading and writing data to Firebase Firestore
 * 
 * Firestore Collections:
 * - events: Historical events data
 * - quizQuestions: Quiz questions and answers
 * - userProgress: User scores and quiz attempts
 */

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    doc,
    serverTimestamp,
    query,
    where
} from 'firebase/firestore';
import { db } from '../firebase';

// --- READ OPERATIONS ---

/**
 * Fetch all historical events from Firestore
 * 
 * Lab Requirement: Read historical events from Firestore database
 * 
 * @returns {Promise<Array>} Array of event objects
 */
export const fetchEvents = async () => {
    try {
        const eventsCollection = collection(db, 'events');
        const querySnapshot = await getDocs(eventsCollection);

        const events = [];
        querySnapshot.forEach((doc) => {
            events.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

/**
 * Fetch quiz questions from Firestore
 * 
 * Lab Requirement: Read quiz questions from Firestore database
 * 
 * @returns {Promise<Array>} Array of quiz question objects
 */
export const fetchQuizQuestions = async () => {
    try {
        const questionsCollection = collection(db, 'quizQuestions');
        const querySnapshot = await getDocs(questionsCollection);

        const questions = [];
        querySnapshot.forEach((doc) => {
            questions.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return questions;
    } catch (error) {
        console.error('Error fetching quiz questions:', error);
        throw error;
    }
};

/**
 * Fetch user progress from Firestore
 * 
 * @param {string} userId - The user's Firebase UID
 * @returns {Promise<Array>} Array of user progress records
 */
export const fetchUserProgress = async (userId) => {
    try {
        const progressCollection = collection(db, 'userProgress');
        const q = query(progressCollection, where('userId', '==', userId));
        const querySnapshot = await getDocs(q);

        const progress = [];
        querySnapshot.forEach((doc) => {
            progress.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return progress;
    } catch (error) {
        console.error('Error fetching user progress:', error);
        throw error;
    }
};

// --- WRITE OPERATIONS ---

/**
 * Save user quiz score to Firestore
 * 
 * Lab Requirement: Write data to Firestore (user test scores)
 * 
 * @param {string} userId - The user's Firebase UID
 * @param {number} score - The score the user achieved
 * @param {number} total - The total possible score
 * @param {string} userName - The user's name
 * @returns {Promise<string>} Document ID of the saved record
 */
export const saveUserScore = async (userId, score, total, userName, extraData = {}) => {
    try {
        const progressCollection = collection(db, 'userProgress');

        const docRef = await addDoc(progressCollection, {
            userId: userId,
            score: score,
            total: total,
            userName: userName,
            percentage: total > 0 ? (score / total) * 100 : 0,
            timestamp: serverTimestamp(),
            createdAt: new Date().toISOString(),
            ...extraData
        });

        return docRef.id;
    } catch (error) {
        console.error('Error saving user score:', error);
        throw error;
    }
};

/**
 * Add a new historical event to Firestore
 * 
 * Lab Requirement: Write data to Firestore (new events)
 * 
 * @param {Object} eventData - Object containing event information
 * @returns {Promise<string>} Document ID of the created event
 */
export const addNewEvent = async (eventData) => {
    try {
        const eventsCollection = collection(db, 'events');

        const docRef = await addDoc(eventsCollection, {
            ...eventData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });

        return docRef.id;
    } catch (error) {
        console.error('Error adding event:', error);
        throw error;
    }
};

/**
 * Add a new quiz question to Firestore
 * 
 * @param {Object} questionData - Object containing question information
 * @returns {Promise<string>} Document ID of the created question
 */
export const addNewQuestion = async (questionData) => {
    try {
        const questionsCollection = collection(db, 'quizQuestions');

        const docRef = await addDoc(questionsCollection, {
            ...questionData,
            createdAt: serverTimestamp()
        });

        return docRef.id;
    } catch (error) {
        console.error('Error adding question:', error);
        throw error;
    }
};

/**
 * Update an existing event in Firestore
 * 
 * @param {string} eventId - The event document ID
 * @param {Object} updates - Object containing fields to update
 * @returns {Promise<void>}
 */
export const updateEvent = async (eventId, updates) => {
    try {
        const eventRef = doc(db, 'events', eventId);
        await updateDoc(eventRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating event:', error);
        throw error;
    }
};

// --- MOCK DATA INITIALIZATION ---

/**
 * Add sample historical events to Firestore (for testing/initialization)
 * 
 * This function can be called once to populate the database with initial data
 * 
 * @returns {Promise<void>}
 */
export const initializeEvents = async () => {
    try {
        const sampleEvents = [
            {
                title: "Античність",
                date: "800 до н.е. — 476 н.е.",
                period: "ancient",
                shortDesc: "Розквіт грецької філософії, римського права та архітектури.",
                fullDesc: "Античність заклала фундамент сучасної європейської цивілізації. У цей час були створені основи демократії в Афінах, збудовані величні Колізей та Парфенон.",
                img: "https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=500&q=60"
            },
            {
                title: "Середньовіччя",
                date: "476 — 1492",
                period: "medieval",
                shortDesc: "Епоха лицарства, формування королівств та готичних соборів.",
                fullDesc: "Період, що почався після падіння Західної Римської імперії. Характеризується феодальною системою, домінуванням релігії та будівництвом неприступних замків.",
                img: "https://i.pinimg.com/1200x/37/05/10/37051007336826ca9f34c8819bcf3f9c.jpg"
            }
        ];

        for (const event of sampleEvents) {
            await addNewEvent(event);
        }

        console.log('Sample events initialized successfully');
    } catch (error) {
        console.error('Error initializing events:', error);
    }
};

export default {
    fetchEvents,
    fetchQuizQuestions,
    fetchUserProgress,
    saveUserScore,
    addNewEvent,
    addNewQuestion,
    updateEvent,
    initializeEvents
};
