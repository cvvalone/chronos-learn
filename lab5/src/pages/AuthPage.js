import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

/**
 * AuthPage Component
 * 
 * Handles both login and registration
 * Automatically redirects authenticated users to home page
 */
const AuthPage = ({ mode = 'login' }) => {
    const [currentMode, setCurrentMode] = useState(mode);
    const navigate = useNavigate();
    const { user } = useAuth();

    // Redirect if already logged in
    if (user) {
        navigate('/');
        return null;
    }

    const handleAuthSuccess = () => {
        navigate('/');
    };

    return (
        <div className="auth-page">
            {currentMode === 'login' ? (
                <LoginForm
                    onSuccess={handleAuthSuccess}
                    onSwitchToRegister={() => setCurrentMode('register')}
                />
            ) : (
                <RegisterForm
                    onSuccess={handleAuthSuccess}
                    onSwitchToLogin={() => setCurrentMode('login')}
                />
            )}
        </div>
    );
};

export default AuthPage;
