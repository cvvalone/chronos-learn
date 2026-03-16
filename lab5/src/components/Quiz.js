import React, { useState } from 'react';
import './Quiz.css';

/**
 * Quiz Component - Interactive quiz to test historical knowledge
 * @param {function} onQuizComplete - Callback when quiz is completed with score
 */
const Quiz = ({ onQuizComplete }) => {
    const [answers, setAnswers] = useState({
        q1: '',
        q2: ''
    });
    const [userName, setUserName] = useState('');
    const [result, setResult] = useState(null);
    const [showAnswers, setShowAnswers] = useState(false);

    const correctAnswers = {
        q1: '476',
        q2: 'napoleon'
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!answers.q1 || !answers.q2 || !userName.trim()) {
            setResult({
                message: 'Будь ласка, дайте відповідь на всі запитання!',
                color: 'red',
                score: 0
            });
            return;
        }

        let score = 0;
        if (answers.q1 === correctAnswers.q1) score++;
        if (answers.q2 === correctAnswers.q2) score++;

        setShowAnswers(true);

        let message, color;
        if (score === 2) {
            message = `Відмінно, ${userName}! Ви набрали ${score}/2 балів.`;
            color = 'var(--accent)';
        } else if (score === 1) {
            message = `Непогано, ${userName}. Ваш результат: ${score}/2 балів. Варто повторити матеріал.`;
            color = 'var(--white)';
        } else {
            message = `Спробуйте ще раз, ${userName}. Ваш результат: 0/2.`;
            color = 'red';
        }

        setResult({ message, color, score });

        // Call the callback to update progress
        if (onQuizComplete) {
            onQuizComplete(score, 2, userName);
        }
    };

    const handleAnswerChange = (question, value) => {
        setAnswers({ ...answers, [question]: value });
    };

    const isCorrect = (question, value) => {
        return correctAnswers[question] === value;
    };

    return (
        <section className="section-padding bg-primary border-top">
            <div className="container">
                <div className="section-title">
                    <h2 className="font-serif text-accent">Перевірка Знань</h2>
                    <p className="text-muted">Пройдіть тест, щоб закріпити матеріал</p>
                </div>

                <form className="test-container" onSubmit={handleSubmit}>
                    <div className="question-group">
                        <label className="question-title text-white">
                            1. В якому році відбулося падіння Західної Римської імперії?
                        </label>
                        <label className={`option ${showAnswers && answers.q1 === '1492' ? 'wrong-answer' : ''} ${showAnswers && answers.q1 === '1492' ? 'correct-answer' : ''}`}>
                            <input
                                type="radio"
                                name="q1"
                                value="1492"
                                checked={answers.q1 === '1492'}
                                onChange={(e) => handleAnswerChange('q1', e.target.value)}
                                disabled={showAnswers}
                            />
                            <span className="text-muted">1492 р.</span>
                            {showAnswers && answers.q1 === '1492' && <span className="answer-icon answer-wrong">✖</span>}
                        </label>
                        <label className={`option ${showAnswers && answers.q1 === '476' ? 'correct-answer' : ''}`}>
                            <input
                                type="radio"
                                name="q1"
                                value="476"
                                checked={answers.q1 === '476'}
                                onChange={(e) => handleAnswerChange('q1', e.target.value)}
                                disabled={showAnswers}
                            />
                            <span className="text-muted">476 р.</span>
                            {showAnswers && answers.q1 === '476' && <span className="answer-icon answer-correct">✔</span>}
                        </label>
                        <label className={`option ${showAnswers && answers.q1 === '325' ? 'wrong-answer' : ''}`}>
                            <input
                                type="radio"
                                name="q1"
                                value="325"
                                checked={answers.q1 === '325'}
                                onChange={(e) => handleAnswerChange('q1', e.target.value)}
                                disabled={showAnswers}
                            />
                            <span className="text-muted">325 р.</span>
                            {showAnswers && answers.q1 === '325' && <span className="answer-icon answer-wrong">✖</span>}
                        </label>
                    </div>

                    <div className="question-group">
                        <label className="question-title text-white">
                            2. Оберіть подію, що НЕ належить до ХХ століття:
                        </label>
                        <label className={`option ${showAnswers && answers.q2 === 'ww1' ? 'wrong-answer' : ''}`}>
                            <input
                                type="radio"
                                name="q2"
                                value="ww1"
                                checked={answers.q2 === 'ww1'}
                                onChange={(e) => handleAnswerChange('q2', e.target.value)}
                                disabled={showAnswers}
                            />
                            <span className="text-muted">Перша світова війна</span>
                            {showAnswers && answers.q2 === 'ww1' && <span className="answer-icon answer-wrong">✖</span>}
                        </label>
                        <label className={`option ${showAnswers && answers.q2 === 'napoleon' ? 'correct-answer' : ''}`}>
                            <input
                                type="radio"
                                name="q2"
                                value="napoleon"
                                checked={answers.q2 === 'napoleon'}
                                onChange={(e) => handleAnswerChange('q2', e.target.value)}
                                disabled={showAnswers}
                            />
                            <span className="text-muted">Наполеонівські війни</span>
                            {showAnswers && answers.q2 === 'napoleon' && <span className="answer-icon answer-correct">✔</span>}
                        </label>
                        <label className={`option ${showAnswers && answers.q2 === 'coldwar' ? 'wrong-answer' : ''}`}>
                            <input
                                type="radio"
                                name="q2"
                                value="coldwar"
                                checked={answers.q2 === 'coldwar'}
                                onChange={(e) => handleAnswerChange('q2', e.target.value)}
                                disabled={showAnswers}
                            />
                            <span className="text-muted">Холодна війна</span>
                            {showAnswers && answers.q2 === 'coldwar' && <span className="answer-icon answer-wrong">✖</span>}
                        </label>
                    </div>

                    <div className="question-group">
                        <label htmlFor="userName" className="question-title text-white">
                            Ваше ім'я для сертифікату:
                        </label>
                        <input
                            type="text"
                            id="userName"
                            className="form-input"
                            placeholder="Введіть ім'я..."
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                            disabled={showAnswers}
                        />
                    </div>

                    {!showAnswers && (
                        <button type="submit" className="btn-submit">
                            Завершити тест
                        </button>
                    )}

                    {result && (
                        <div
                            className="text-white"
                            style={{
                                marginTop: '20px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                color: result.color
                            }}
                        >
                            {result.message}
                        </div>
                    )}

                    {showAnswers && (
                        <button
                            type="button"
                            className="btn-submit"
                            style={{ marginTop: '20px' }}
                            onClick={() => {
                                setAnswers({ q1: '', q2: '' });
                                setUserName('');
                                setResult(null);
                                setShowAnswers(false);
                            }}
                        >
                            Пройти ще раз
                        </button>
                    )}
                </form>
            </div>
        </section>
    );
};

export default Quiz;
