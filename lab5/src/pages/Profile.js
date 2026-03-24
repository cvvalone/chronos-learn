import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressChart from '../components/ProgressChart';
import { useAuth } from '../context/AuthContext';
import { fetchAverageScore } from '../services/backendApi';
import './Profile.css';

/**
 * Profile Page - Displays user progress and statistics
 */
const Profile = ({ progress }) => {
    const { user } = useAuth();
    const [averageScore, setAverageScore] = useState(0);
    const [averageLoading, setAverageLoading] = useState(true);

    useEffect(() => {
        const loadAverage = async () => {
            try {
                setAverageLoading(true);

                const fallbackUserId = localStorage.getItem('activeTestUserId');
                const userId = user?.uid || fallbackUserId;
                const data = await fetchAverageScore(userId);

                setAverageScore(data?.averageScore ?? 0);
            } catch (error) {
                console.error('Failed to load average score:', error);
                setAverageScore(0);
            } finally {
                setAverageLoading(false);
            }
        };

        loadAverage();
    }, [user]);

    return (
        <div className="profile-page">
            {/* Hero Section */}
            <section className="profile-hero">
                <div className="container">
                    <h1 className="font-serif text-white">Профіль Навчання</h1>
                    <p className="text-muted">Відстежуйте свій прогрес та результати тестування</p>
                </div>
            </section>

            {/* Progress Section */}
            <section className="section-padding bg-primary">
                <div className="container">
                    <div className="tips-container" style={{ marginBottom: '24px' }}>
                        <h3 className="font-serif text-white">Середній бал (з backend)</h3>
                        <p className="text-muted" style={{ marginTop: '8px' }}>
                            {averageLoading ? 'Завантаження...' : `${averageScore} балів`}
                        </p>
                    </div>

                    <ProgressChart progress={progress} />

                    <div className="back-link-container">
                        <Link to="/" className="btn-outline">
                            ← Повернутися на головну
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tips Section */}
            <section className="section-padding bg-secondary">
                <div className="container">
                    <div className="tips-container">
                        <h3 className="font-serif text-white">Поради для покращення результатів</h3>
                        <div className="tips-grid">
                            <div className="tip-card">
                                <div className="tip-icon">📚</div>
                                <h4 className="text-white">Вивчайте матеріал</h4>
                                <p className="text-muted">
                                    Натискайте "Дізнатися більше" на кожній події, щоб краще зрозуміти контекст
                                </p>
                            </div>
                            <div className="tip-card">
                                <div className="tip-icon">🔄</div>
                                <h4 className="text-white">Повторюйте тести</h4>
                                <p className="text-muted">
                                    Проходьте тести кілька разів, щоб закріпити знання
                                </p>
                            </div>
                            <div className="tip-card">
                                <div className="tip-icon">🎯</div>
                                <h4 className="text-white">Використовуйте фільтри</h4>
                                <p className="text-muted">
                                    Фільтруйте події за періодами для систематичного вивчення
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Profile;
