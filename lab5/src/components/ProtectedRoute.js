import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute Component
 * 
 * This component wraps routes that require authentication.
 * Unauthenticated users are redirected to the login page.
 * 
 * Used for:
 * - Testing (Quiz) page - accessible only to authenticated users
 * - Any other protected pages in the future
 * 
 * @param {React.Component} element - The component to render if authenticated
 * @returns {React.Component} - Either the protected component or redirect to login
 */
const ProtectedRoute = ({ element }) => {
    const { user, loading } = useAuth();

    // Show loading state while checking authentication
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundColor: 'var(--primary)',
                color: 'var(--text)'
            }}>
                <div>Завантаження...</div>
            </div>
        );
    }

    /**
     * If user is authenticated, render the protected component
     * Otherwise, redirect to login page
     * 
     * Lab requirement: Testing page must only be accessible to authenticated users
     */
    if (user) {
        return element;
    }

    // Redirect to login page if not authenticated
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
