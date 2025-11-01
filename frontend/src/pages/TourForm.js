// frontend/src/pages/TourForm.js

import { useState } from 'react';
import API from '../api';

export default function TourForm({ refreshTours }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/tours', {
                title, description, price, location, duration
            }); // token auto-added
            refreshTours();
            setTitle(''); setDescription(''); setPrice(''); setLocation(''); setDuration('');
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
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
