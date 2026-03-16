import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './LoginForm.css';

/**
 * LoginForm Component
 * Handles user login with email and password using Firebase Auth
 */
const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email || !password) {
            setError('Усі поля обов\'язкові');
            return;
        }

        setLoading(true);

        try {
            // Sign in user using Firebase SDK
            await signInWithEmailAndPassword(auth, email, password);
            // Success - parent component will handle redirect
            if (onSuccess) {
                onSuccess();
            }
        } catch (err) {
            // Handle Firebase errors
            if (err.code === 'auth/user-not-found') {
                setError('Користувач не знайдений');
            } else if (err.code === 'auth/wrong-password') {
                setError('Невірний пароль');
            } else if (err.code === 'auth/invalid-email') {
                setError('Невалідна електронна адреса');
            } else if (err.code === 'auth/user-disabled') {
                setError('Акаунт деактивований');
            } else {
                setError('Помилка входу: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form-container">
            <div className="auth-form">
                <h2 className="font-serif text-white">Вхід</h2>
                <p className="text-muted">Увійдіть до своєї історії та прогресу</p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleLogin}>
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
                            placeholder="Введіть пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={loading}
                    >
                        {loading ? 'Вхід...' : 'Увійти'}
                    </button>
                </form>

                <div className="auth-switch">
                    <p className="text-muted">
                        Немаєте акаунту?{' '}
                        <button
                            type="button"
                            className="link-btn"
                            onClick={onSwitchToRegister}
                        >
                            Зареєструватися
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
