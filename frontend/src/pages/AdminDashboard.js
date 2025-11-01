// frontend/src/pages/AdminDashboard.js
import { useState, useEffect, useContext } from 'react';
import API from '../api'; // ✅ use centralized API
import { AuthContext } from '../context/AuthContext';
import TourForm from './TourForm'; // Assuming TourForm can handle create/edit
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/adminDashboard.css";

export default function AdminDashboard() {
    const [tours, setTours] = useState([]);
    const { token } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tourToEdit, setTourToEdit] = useState(null);

    const fetchTours = async () => {
        try {
            const res = await API.get('/tours'); // token is auto-added
            setTours(res.data);
        } catch (err) {
            console.error('Error fetching tours:', err.response?.data || err.message);
        }
    };

    const handleAdd = () => {
        setTourToEdit(null);
        setIsModalOpen(true);
    };

    const handleEdit = (tour) => {
        setTourToEdit(tour);
        setIsModalOpen(true);
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
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="fw-bold">Admin Dashboard</h2>
                <button className="btn btn-primary" onClick={handleAdd}>
                    + Add New Tour
                </button>
            </div>

            <div className="card shadow-sm">
                <div className="card-body">
                    <h4 className="card-title mb-3">Manage Tours</h4>
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Title</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tours.length === 0 ? (
                                <tr><td colSpan="4" className="text-center">No tours available.</td></tr>
                            ) : (
                                tours.map(tour => (
                                    <tr key={tour._id}>
                                        <td>{tour.title}</td>
                                        <td>{tour.location}</td>
                                        <td>Ksh {tour.price}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-secondary btn-action" onClick={() => handleEdit(tour)}>Edit</button>
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(tour._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal-content">
                        <button className="admin-modal-close" onClick={() => setIsModalOpen(false)}>&times;</button>
                        <TourForm tourToEdit={tourToEdit} refreshTours={fetchTours} onClose={() => setIsModalOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}
