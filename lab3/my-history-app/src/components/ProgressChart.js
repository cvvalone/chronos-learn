import React from 'react';
import './ProgressChart.css';

/**
 * ProgressChart Component - Displays user's learning progress
 * @param {Array} progress - Array of quiz completion records
 */
const ProgressChart = ({ progress }) => {
    const totalAttempts = progress.length;
    const totalScore = progress.reduce((sum, p) => sum + p.score, 0);
    const totalPossible = progress.reduce((sum, p) => sum + p.total, 0);
    const averagePercentage = totalPossible > 0 ? ((totalScore / totalPossible) * 100).toFixed(1) : 0;

    const getGrade = (percentage) => {
        if (percentage >= 90) return { grade: 'Відмінно', color: 'var(--green)' };
        if (percentage >= 75) return { grade: 'Добре', color: 'var(--accent)' };
        if (percentage >= 60) return { grade: 'Задовільно', color: 'var(--blue)' };
        return { grade: 'Потрібно покращити', color: '#dc2626' };
    };

    const gradeInfo = getGrade(averagePercentage);

    return (
        <div className="progress-chart">
            <h3 className="font-serif text-white">Ваш прогрес навчання</h3>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value text-accent">{totalAttempts}</div>
                    <div className="stat-label text-muted">Пройдено тестів</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value text-accent">{totalScore}/{totalPossible}</div>
                    <div className="stat-label text-muted">Правильних відповідей</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value" style={{ color: gradeInfo.color }}>
                        {averagePercentage}%
                    </div>
                    <div className="stat-label text-muted">Середній результат</div>
                </div>

                <div className="stat-card">
                    <div className="stat-value" style={{ color: gradeInfo.color }}>
                        {gradeInfo.grade}
                    </div>
                    <div className="stat-label text-muted">Оцінка</div>
                </div>
            </div>

            {totalAttempts === 0 && (
                <div className="no-data text-muted">
                    <p>Ви ще не проходили жодного тесту.</p>
                    <p>Поверніться на головну сторінку і пройдіть тест!</p>
                </div>
            )}

            {totalAttempts > 0 && (
                <div className="progress-history">
                    <h4 className="text-white">Історія спроб:</h4>
                    <div className="history-list">
                        {progress.map((attempt, index) => (
                            <div key={index} className="history-item">
                                <div className="history-info">
                                    <span className="text-white">{attempt.userName}</span>
                                    <span className="text-muted text-sm">
                                        {new Date(attempt.timestamp).toLocaleString('uk-UA')}
                                    </span>
                                </div>
                                <div className="history-score">
                                    <span className={attempt.score === attempt.total ? 'text-green' : 'text-white'}>
                                        {attempt.score}/{attempt.total}
                                    </span>
                                    <span className="text-muted text-sm">
                                        ({((attempt.score / attempt.total) * 100).toFixed(0)}%)
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProgressChart;
