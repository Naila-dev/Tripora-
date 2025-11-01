// frontend/src/pages/ToursList.js
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function TourList() {
    const [tours, setTours] = useState([]);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchTours = async () => {
            const res = await axios.get('http://localhost:5000/tripora/tours', {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            setTours(res.data);
        };
        fetchTours();
    }, [token]);

    
    return (
        <div>
            <h2>Tours</h2>
            {tours.map(t => (
                <div key={t._id}>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <p>Price: KES{t.price}</p>
                </div>
            ))}
        </div>
    );
}
