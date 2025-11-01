// frontend/src/pages/AdminDashboard.js
import { useState, useEffect, useContext } from 'react';
import API from '../api'; // ✅ use centralized API
import { AuthContext } from '../context/AuthContext';
import TourForm from './TourForm';

export default function AdminDashboard() {
    const [tours, setTours] = useState([]);
    const { token } = useContext(AuthContext);

    const fetchTours = async () => {
        try {
            const res = await API.get('/tours'); // token is auto-added
            setTours(res.data);
        } catch (err) {
            console.error('Error fetching tours:', err.response?.data || err.message);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this tour?')) return;

        try {
            await API.delete(`/tours/${id}`); // token auto-added
            fetchTours(); // Refresh list after deletion
        } catch (err) {
            console.error('Error deleting tour:', err.response?.data || err.message);
        }
    };

    useEffect(() => { 
        if (token) fetchTours();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <TourForm refreshTours={fetchTours} />
            <ul>
                {tours.length === 0 ? (
                    <li>No tours available.</li>
                ) : (
                    tours.map(t => (
                        <li key={t._id}>
                            {t.title} - ${t.price}
                            <button onClick={() => handleDelete(t._id)}>Delete</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}
