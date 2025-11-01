// frontend/src/pages/TourForm.js
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function TourForm({ refreshTours }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const { token } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:5000/tripora/tours', {
            title, description, price, location, duration
        }, { headers: { Authorization: `Bearer ${token}` } });
        refreshTours();
        setTitle(''); setDescription(''); setPrice(''); setLocation(''); setDuration('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
            <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} />
            <input placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} />
            <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
            <button type="submit">Book Now</button>
        </form>
    );
}
