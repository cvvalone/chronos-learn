import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './RegisterForm.css';

/**
 * RegisterForm Component
 * Handles user registration with email and password using Firebase Auth
 */
const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !password || !confirmPassword) {
            setError('Усі поля обов\'язкові');
            return;
        }

        if (password.length < 6) {
            setError('Пароль повинен містити мінімум 6 символів');
            return;
        }

        if (password !== confirmPassword) {
            setError('Паролі не збігаються');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Введіть коректну електронну адресу');
            return;
        }

        setLoading(true);

        try {
            // Create user with email and password using Firebase SDK
            await createUserWithEmailAndPassword(auth, email, password);
            // Success - parent component will handle redirect
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            // Handle Firebase errors
            if (err.code === 'auth/email-already-in-use') {
                setError('Цей email уже зареєстрований');
            } else if (err.code === 'auth/invalid-email') {
                setError('Невалідна електронна адреса');
            } else if (err.code === 'auth/weak-password') {
                setError('Пароль занадто простий');
            } else {
                setError('Помилка реєстрації: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form">
                <h2 className="font-serif text-white">Реєстрація</h2>
                <p className="text-muted">Створіть новий акаунт</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="email" className="text-white">Електронна адреса</label>
                        <input
                            id="email"
                            type="email"
                            className="form-input"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="text-white">Пароль</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            placeholder="Мінімум 6 символів"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="text-white">Підтвердіть пароль</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className="form-input"
                            placeholder="Повторіть пароль"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Реєстрація...' : 'Зареєструватися'}
                    </button>
                </form>

                <div className="auth-switch">
                    <p className="text-muted">
                        Уже маєте акаунт?{' '}
                        <button
                            type="button"
                            className="link-btn"
                            onClick={onSwitchToLogin}
                        >
                            Увійти
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
