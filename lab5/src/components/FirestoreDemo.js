import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
    fetchEvents,
    fetchUserTestResults,
    saveTestResult,
    addEvent
} from '../services/backendApi';
import './FirestoreDemo.css';

/**
 * FirestoreDemo Component
 * 
 * Demonstrates reading from and writing to Firebase Firestore database
 * Shows how to fetch events and save user progress
 * 
 * Lab Requirement Demonstrations:
 * - Reading historical events from Firestore
 * - Writing user test scores to Firestore
 * - Fetching user progress data
 */
const FirestoreDemo = ({ progress }) => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const [userProgress, setUserProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showAddEvent, setShowAddEvent] = useState(false);
    const [newEventData, setNewEventData] = useState({
        title: '',
        date: '',
        period: 'modern',
        shortDesc: '',
        fullDesc: '',
        img: ''
    });

    const safeProgress = Array.isArray(progress) ? progress : [];
    const totalAttempts = safeProgress.length;
    const totalScore = safeProgress.reduce((sum, attempt) => sum + (attempt.score || 0), 0);
    const totalPossible = safeProgress.reduce((sum, attempt) => sum + (attempt.total || 0), 0);
    const averagePercentage = totalPossible > 0 ? (totalScore / totalPossible) * 100 : 0;
    const latestAttempt = totalAttempts > 0 ? safeProgress[totalAttempts - 1] : null;

    /**
     * READ OPERATION EXAMPLE
     * Fetch events from Firestore when component mounts
     */
    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // Fetch events from backend API
                const eventsData = await fetchEvents();
                setEvents(eventsData?.events || []);

                // Fetch user progress if authenticated
                if (user) {
                    const progressData = await fetchUserTestResults(user.uid);
                    setUserProgress(progressData?.results || []);
                }
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Помилка при завантаженні даних');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user]);

    /**
     * WRITE OPERATION EXAMPLE
     * Save a new event to Firestore
     */
    const handleAddEvent = async (e) => {
        e.preventDefault();

        // Validation
        if (!newEventData.title || !newEventData.date || !newEventData.shortDesc) {
            setError('Заповніть всі обов\'язкові поля');
            return;
        }

        try {
            // Write new event via backend API
            const response = await addEvent(newEventData);
            const docId = response?.id;
            console.log('Event added with ID:', docId);

            // Update local state
            setEvents([...events, { id: docId, ...newEventData }]);

            // Reset form
            setNewEventData({
                title: '',
                date: '',
                period: 'modern',
                shortDesc: '',
                fullDesc: '',
                img: ''
            });
            setShowAddEvent(false);
            setError(null);
        } catch (err) {
            console.error('Error adding event:', err);
            setError('Помилка при добавленні події');
        }
    };

    /**
     * WRITE OPERATION EXAMPLE
    * Save user test score through backend API
     */
    const handleSaveTestScore = async () => {
        if (!user) {
            setError('Будь ласка, увійдіть для збереження результату');
            return;
        }

        if (totalAttempts === 0 || totalPossible === 0) {
            setError('Спочатку пройдіть тест, щоб зберегти прогрес');
            return;
        }

        try {
            const docId = (await saveTestResult({
                userId: user.uid,
                score: Number(averagePercentage.toFixed(2)),
                testId: 'history-aggregated-progress'
            }))?.id;
            console.log('Score saved with ID:', docId);

            // Reload user progress
            const progressData = await fetchUserTestResults(user.uid);
            setUserProgress(progressData?.results || []);

            setError(null);
            alert(`Прогрес успішно збережено: ${totalScore}/${totalPossible} (${averagePercentage.toFixed(1)}%)`);
        } catch (err) {
            console.error('Error saving score:', err);
            setError('Помилка при збереженні результату');
        }
    };

    if (loading && events.length === 0) {
        return <div className="loading">Завантаження...</div>;
    }

    return (
        <div className="firestore-demo">
            <div className="container">
                <h2 className="font-serif text-white">Демонстрація БД</h2>
                <p className="text-muted">
                    Приклади читання та запису даних через backend API
                </p>

                {error && <div className="error-message">{error}</div>}

                {/* READ OPERATION SECTION */}
                <div className="demo-section">
                    <h3 className="text-accent">📖 Операція читання: Історичні події</h3>
                    <p className="text-muted">
                        Завантажені записи через endpoint /api/events
                    </p>

                    {events.length > 0 ? (
                        <div className="events-list">
                            {events.map((event) => (
                                <div key={event.id} className="event-item">
                                    <h4 className="text-white">{event.title || 'Без назви'}</h4>
                                    <p className="text-muted">
                                        <strong>Період:</strong> {event.period}
                                    </p>
                                    <p className="text-muted">
                                        <strong>Дата:</strong> {event.date}
                                    </p>
                                    <p className="text-white">{event.shortDesc}</p>
                                    <code className="event-id">ID: {event.id}</code>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted">Немає доступних подій</p>
                    )}
                </div>

                {/* WRITE OPERATION SECTION - Add New Event */}
                <div className="demo-section">
                    <h3 className="text-accent">✍️ Операція запису: Додати нову подію</h3>
                    <p className="text-muted">
                        Запис нової події через endpoint /api/events
                    </p>

                    <button
                        className="btn-outline"
                        onClick={() => setShowAddEvent(!showAddEvent)}
                    >
                        {showAddEvent ? 'Скасувати' : 'Додати нову подію'}
                    </button>

                    {showAddEvent && (
                        <form onSubmit={handleAddEvent} className="add-event-form">
                            <div className="form-group">
                                <label className="text-white">Назва события</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={newEventData.title}
                                    onChange={(e) => setNewEventData({
                                        ...newEventData,
                                        title: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-white">Дата</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Наприклад: 1800 - 1850"
                                    value={newEventData.date}
                                    onChange={(e) => setNewEventData({
                                        ...newEventData,
                                        date: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-white">Період</label>
                                <select
                                    className="form-input"
                                    value={newEventData.period}
                                    onChange={(e) => setNewEventData({
                                        ...newEventData,
                                        period: e.target.value
                                    })}
                                >
                                    <option value="ancient">Античність</option>
                                    <option value="medieval">Середньовіччя</option>
                                    <option value="renaissance">Відродження</option>
                                    <option value="modern">Нові часи</option>
                                    <option value="contemporary">Новітній час</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="text-white">Короткий опис</label>
                                <textarea
                                    className="form-input"
                                    value={newEventData.shortDesc}
                                    onChange={(e) => setNewEventData({
                                        ...newEventData,
                                        shortDesc: e.target.value
                                    })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="text-white">Повний опис</label>
                                <textarea
                                    className="form-input"
                                    value={newEventData.fullDesc}
                                    onChange={(e) => setNewEventData({
                                        ...newEventData,
                                        fullDesc: e.target.value
                                    })}
                                />
                            </div>

                            <button type="submit" className="btn-submit">
                                Зберегти подію через backend
                            </button>
                        </form>
                    )}
                </div>

                {/* WRITE OPERATION SECTION - Save Test Score */}
                {user && (
                    <div className="demo-section">
                        <h3 className="text-accent">📊 Операція запису: Результат тесту</h3>
                        <p className="text-muted">
                            Запис результату тесту користувача через endpoint /api/test-results
                        </p>

                        <p className="text-white">
                            Користувач: <strong>{user.email}</strong>
                        </p>

                        <button
                            className="btn-submit"
                            onClick={handleSaveTestScore}
                            disabled={totalAttempts === 0}
                        >
                            Зберегти загальний прогрес ({totalScore}/{totalPossible} балів, спроб: {totalAttempts})
                        </button>
                    </div>
                )}

                {/* READ OPERATION SECTION - User Progress */}
                {user && (
                    <div className="demo-section">
                        <h3 className="text-accent">📈 Операція читання: Мій прогрес</h3>
                        <p className="text-muted">
                            Завантажено через endpoint /api/test-results
                        </p>

                        {userProgress.length > 0 ? (
                            <div className="progress-list">
                                {userProgress.map((item) => (
                                    <div key={item.id} className="progress-item">
                                        <div>
                                            <p className="text-white">
                                                Результат: <strong>{item.score} балів</strong>
                                            </p>
                                            {item.testId && <p className="text-muted">Тест: {item.testId}</p>}
                                            <p className="text-muted text-sm">
                                                {new Date(item.completedDateISO || item.createdAtISO || Date.now()).toLocaleString('uk-UA')}
                                            </p>
                                        </div>
                                        <code className="progress-id">ID: {item.id}</code>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted">Немає записів прогресу</p>
                        )}
                    </div>
                )}

                {!user && (
                    <div className="demo-section auth-required">
                        <p className="text-muted">
                            🔒 Увійдіть до свого акаунту для перегляду та збереження прогресу
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FirestoreDemo;
