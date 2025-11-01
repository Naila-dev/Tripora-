// frontend/src/pages/AdminDashboard.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TourForm from './TourForm';

export default function AdminDashboard() {
    const [tours, setTours] = useState([]);
    const { token } = useContext(AuthContext);

    const fetchTours = async () => {
        const res = await axios.get('http://localhost:5000/api/tours', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTours(res.data);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/tours/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        fetchTours();
    };

    useEffect(() => { fetchTours(); }, []);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <TourForm refreshTours={fetchTours} />
            <ul>
                {tours.map(t => (
                    <li key={t._id}>
                        {t.title} - ${t.price}
                        <button onClick={() => handleDelete(t._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
