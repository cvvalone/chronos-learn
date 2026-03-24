const express = require('express');
const cors = require('cors');
const admin = require("firebase-admin");
const fs = require("fs");

let serviceAccount;

// Перевіряємо, чи існує файл у захищеній папці Render
if (fs.existsSync("/etc/secrets/serviceAccountKey.json")) {
    serviceAccount = require("/etc/secrets/serviceAccountKey.json");
} else {
    // Якщо ні, значить ми на локальному комп'ютері
    serviceAccount = require("./serviceAccountKey.json");
}

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Core middleware.
app.use(cors());
app.use(express.json());

// Serve static assets from the backend public directory.
app.use(express.static(path.join(__dirname, 'public')));

const TEST_RESULTS_COLLECTION = 'test_results';
const EVENTS_COLLECTION = 'events';

const DEFAULT_EVENTS = [
    {
        title: 'Античність',
        date: '800 до н.е. — 476 н.е.',
        period: 'ancient',
        shortDesc: 'Розквіт грецької філософії, римського права та архітектури.',
        fullDesc: 'Античність заклала фундамент сучасної європейської цивілізації. У цей час були створені основи демократії в Афінах, збудовані величні Колізей та Парфенон, а римське право стало базою для багатьох сучасних правових систем.',
        img: 'https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?auto=format&fit=crop&w=500&q=60',
        map: { lat: 41.8902, lng: 12.4922, zoom: 5, label: 'Рим, Італія' },
    },
    {
        title: 'Середньовіччя',
        date: '476 — 1492',
        period: 'medieval',
        shortDesc: 'Епоха лицарства, формування королівств та готичних соборів.',
        fullDesc: 'Період, що почався після падіння Західної Римської імперії. Характеризується феодальною системою, домінуванням релігії в житті суспільства, хрестовими походами та будівництвом неприступних замків.',
        img: 'https://i.pinimg.com/1200x/37/05/10/37051007336826ca9f34c8819bcf3f9c.jpg',
        map: { lat: 48.8584, lng: 2.2945, zoom: 5, label: 'Париж, Франція' },
    },
    {
        title: 'Відродження',
        date: 'XIV — XVII ст.',
        period: 'renaissance',
        shortDesc: 'Повернення до античних ідеалів, великі географічні відкриття.',
        fullDesc: 'Епоха Ренесансу подарувала людству геніїв на кшталт Леонардо да Вінчі та Мікеланджело. Це час стрімкого розвитку науки, мистецтва та початку книгодрукування Гутенбергом.',
        img: 'https://images.unsplash.com/photo-1576016770956-debb63d92058?auto=format&fit=crop&w=500&q=60',
        map: { lat: 43.7696, lng: 11.2558, zoom: 6, label: 'Флоренція, Італія' },
    },
    {
        title: 'Нові часи',
        date: 'XVII — XIX ст.',
        period: 'modern',
        shortDesc: 'Епоха просвітництва, промислової революції та формування націй.',
        fullDesc: 'Період великих наукових відкриттів, технологічного прогресу та соціальних змін. Час промислової революції, що змінила світ назавжди.',
        img: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=500&q=60',
        map: { lat: 51.5074, lng: -0.1278, zoom: 5, label: 'Лондон, Великобританія' },
    },
    {
        title: 'Новітній час',
        date: 'XX — XXI ст.',
        period: 'contemporary',
        shortDesc: 'Епоха світових воєн, технологічного прориву та глобалізації.',
        fullDesc: 'Сучасна епоха, що включає дві світові війни, космічну гонку, цифрову революцію та становлення глобального інформаційного суспільства.',
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=60',
        map: { lat: 40.7128, lng: -74.006, zoom: 5, label: 'Нью-Йорк, США' },
    },
];

// Save a finished test result for a user.
app.post('/api/test-results', async (req, res) => {
    try {
        const { userId, score, testId } = req.body;

        if (!userId || typeof score !== 'number') {
            return res.status(400).json({
                error: 'Invalid payload. "userId" and numeric "score" are required.',
            });
        }

        const resultDoc = {
            userId,
            score,
            testId: testId || null,
            completedAt: admin.firestore.FieldValue.serverTimestamp(),
            completedDateISO: new Date().toISOString(),
        };

        const docRef = await db.collection(TEST_RESULTS_COLLECTION).add(resultDoc);

        return res.status(201).json({
            message: 'Test result saved successfully.',
            id: docRef.id,
        });
    } catch (error) {
        console.error('Error saving test result:', error);
        return res.status(500).json({ error: 'Failed to save test result.' });
    }
});

// Return all test results for a specific user.
app.get('/api/test-results', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                error: 'Missing required query parameter: userId',
            });
        }

        const snapshot = await db
            .collection(TEST_RESULTS_COLLECTION)
            .where('userId', '==', userId)
            .get();

        const results = snapshot.docs
            .map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            .sort((a, b) => {
                const first = a.completedDateISO || '';
                const second = b.completedDateISO || '';
                return first < second ? 1 : -1;
            });

        return res.status(200).json({ userId, results });
    } catch (error) {
        console.error('Error fetching user test results:', error);
        return res.status(500).json({ error: 'Failed to fetch user test results.' });
    }
});

// Calculate and return average score for a specific user.
app.get('/api/test-results/average', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({
                error: 'Missing required query parameter: userId',
            });
        }

        const snapshot = await db
            .collection(TEST_RESULTS_COLLECTION)
            .where('userId', '==', userId)
            .get();

        if (snapshot.empty) {
            return res.status(200).json({
                userId,
                averageScore: 0,
                totalAttempts: 0,
            });
        }

        const scores = snapshot.docs
            .map((doc) => doc.data().score)
            .filter((value) => typeof value === 'number');

        if (!scores.length) {
            return res.status(200).json({
                userId,
                averageScore: 0,
                totalAttempts: 0,
            });
        }

        const sum = scores.reduce((accumulator, current) => accumulator + current, 0);
        const average = sum / scores.length;

        return res.status(200).json({
            userId,
            averageScore: Number(average.toFixed(2)),
            totalAttempts: scores.length,
        });
    } catch (error) {
        console.error('Error calculating average score:', error);
        return res.status(500).json({ error: 'Failed to calculate average score.' });
    }
});

// Read all events from Firestore. Returns defaults if collection is empty.
app.get('/api/events', async (req, res) => {
    try {
        const snapshot = await db.collection(EVENTS_COLLECTION).get();

        if (snapshot.empty) {
            const defaults = DEFAULT_EVENTS.map((event, index) => ({
                id: `default-${index + 1}`,
                ...event,
            }));

            return res.status(200).json({ events: defaults, source: 'defaults' });
        }

        const events = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        return res.status(200).json({ events, source: 'firestore' });
    } catch (error) {
        console.error('Error fetching events:', error);
        return res.status(500).json({ error: 'Failed to fetch events.' });
    }
});

// Add a new historical event to Firestore.
app.post('/api/events', async (req, res) => {
    try {
        const { title, date, period, shortDesc, fullDesc, img, map } = req.body;

        if (!title || !date || !period || !shortDesc) {
            return res.status(400).json({
                error: 'Invalid payload. "title", "date", "period", and "shortDesc" are required.',
            });
        }

        const newEvent = {
            title,
            date,
            period,
            shortDesc,
            fullDesc: fullDesc || '',
            img: img || '',
            map: map || null,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            createdAtISO: new Date().toISOString(),
        };

        const docRef = await db.collection(EVENTS_COLLECTION).add(newEvent);

        return res.status(201).json({
            message: 'Event saved successfully.',
            id: docRef.id,
        });
    } catch (error) {
        console.error('Error saving event:', error);
        return res.status(500).json({ error: 'Failed to save event.' });
    }
});

// Simple health check endpoint for deployment monitoring.
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});
