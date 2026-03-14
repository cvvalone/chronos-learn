import React from 'react';
import { Link } from 'react-router-dom';
import ProgressChart from '../components/ProgressChart';
import './Profile.css';

/**
 * Profile Page - Displays user progress and statistics
 */
const Profile = ({ progress }) => {
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
