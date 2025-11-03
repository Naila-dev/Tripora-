// frontend/src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                try {
                    const res = await API.get('/auth/me'); // An endpoint to get current user
                    setUser(res.data);
                } catch (err) {
                    console.error('Failed to fetch user', err);
                    setToken(null);
                    localStorage.removeItem('token');
                }
            }
        };
        fetchUser();
    }, [token]);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        const { token: apiToken, user: apiUser } = res.data;
        setToken(apiToken);
        setUser(apiUser);
        localStorage.setItem('token', apiToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
        return res; // Return response for admin login check
    };

    const register = async (userData) => {
        // userData is an object like { name, email, password, phone }
        const res = await API.post('/auth/register', userData);
        const { token: apiToken, user: apiUser } = res.data;
        setToken(apiToken);
        setUser(apiUser);
        localStorage.setItem('token', apiToken);
        API.defaults.headers.common['Authorization'] = `Bearer ${apiToken}`;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};