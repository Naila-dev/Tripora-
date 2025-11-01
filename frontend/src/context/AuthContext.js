import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Save token to localStorage whenever it changes
    useEffect(() => {
        if (token) localStorage.setItem('token', token);
        else localStorage.removeItem('token');
    }, [token]);

    // Login function
    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });

            if (res.data && res.data.user && res.data.token) {
                setUser(res.data.user);
                setToken(res.data.token);
            } else {
                console.error('Login response invalid:', res.data);
            }
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password });

            if (res.data && res.data.user && res.data.token) {
                setUser(res.data.user);
                setToken(res.data.token);
            } else {
                console.error('Register response invalid:', res.data);
            }
        } catch (err) {
            console.error('Register error:', err.response?.data || err.message);
        }
    };

    // Logout
    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

