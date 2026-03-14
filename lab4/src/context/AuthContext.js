import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

/**
 * AuthContext
 * Provides authentication state and methods throughout the application
 * Tracks user login status using onAuthStateChanged listener
 */
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Set up authentication state listener
     * This listener tracks changes in user authentication status
     * Called automatically when the app mounts
     */
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (currentUser) => {
                setUser(currentUser);
                setLoading(false);
            },
            (err) => {
                setError(err.message);
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    /**
     * Sign out the current user
     * @returns {Promise} Promise that resolves when sign out is complete
     */
    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const value = {
        user,
        loading,
        error,
        signOut: handleSignOut,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

/**
 * Custom hook to use AuthContext
 * @returns {Object} Auth context value (user, loading, isAuthenticated, signOut)
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export default AuthContext;
