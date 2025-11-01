import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login({ onSwitchToRegister, onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            if (onSuccess) onSuccess(); // Close the modal on success
            navigate('/'); // redirect to homepage
        } catch (err) {
            alert('Login failed: ' + err.response?.data?.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="auth-form">
            <h2>Login</h2>
            <input className="form-control" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            <input className="form-control" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn-submit">Login</button>
            <p className="auth-switch-text">
                Don't have an account? <button type="button" onClick={onSwitchToRegister} className="auth-switch-button">Register</button>
            </p>
        </form>
    );
}
