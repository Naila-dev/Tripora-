// frontend/src/pages/Register.js
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register({ onSwitchToLogin, onSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register({ name, email, password, phone });
            if (onSuccess) onSuccess(); // Close the modal on success
            navigate('/');
        } catch (err) {
            alert('Registration failed: ' + err.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Register</h2>
            <input className="form-control" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <input className="form-control" type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
            <button type="submit" className="btn-submit">Register</button>
            <p className="auth-switch-text">
                Already have an account? <button type="button" onClick={onSwitchToLogin} className="auth-switch-button">Login</button>
            </p>
        </form>
    );
}
