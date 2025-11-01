import { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('user');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            return null;
        }
    });
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);

    // Save token to localStorage whenever it changes
    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem('user', JSON.stringify(user));
        else localStorage.removeItem('user');
    }, [user]);

    // Login function
    const login = async (email, password) => {
        try {
            const res = await API.post('/auth/login', { email, password });

            if (res.data && res.data.user && res.data.token) {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem('refreshToken', res.data.refreshToken);
            } else {
                console.error('Login response invalid:', res.data);
            }
        } catch (err) {
            throw err;
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const res = await API.post('/auth/register', { name, email, password });

            if (res.data && res.data.user && res.data.token) {
                setUser(res.data.user);
                setToken(res.data.token);
                localStorage.setItem('refreshToken', res.data.refreshToken);
            } else {
                console.error('Register response invalid:', res.data);
            }
        } catch (err) {
            throw err;
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('refreshToken');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
