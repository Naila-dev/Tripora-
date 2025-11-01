// frontend/src/pages/TourForm.js

import { useState, useEffect } from 'react';
import API from '../api';

export default function TourForm({ tourToEdit, refreshTours, onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        duration: ''
    });
    const [imageFile, setImageFile] = useState(null);

    const isEditing = !!tourToEdit;

    useEffect(() => {
        if (isEditing) {
            setFormData({
                title: tourToEdit.title || '',
                description: tourToEdit.description || '',
                location: tourToEdit.location || '',
                price: tourToEdit.price || '',
                duration: tourToEdit.duration || '',
                // image is not set here, user has to re-upload if they want to change it
            });
        }
    }, [tourToEdit, isEditing]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const submissionData = new FormData();
        for (const key in formData) {
            submissionData.append(key, formData[key]);
        }
        if (imageFile) {
            submissionData.append('image', imageFile);
        }

        try {
            if (isEditing) {
                await API.put(`/tours/${tourToEdit._id}`, submissionData);
            } else {
                await API.post('/tours', submissionData);
            }
            refreshTours();
            onClose(); // Close modal on success
        } catch (err) {
            console.error(err.response?.data || err.message);
            alert(`Error: ${isEditing ? 'Updating' : 'Creating'} tour failed.`);
        }
    };

    return (
        <div>
            <h3 className="mb-4 fw-bold">{isEditing ? 'Edit Tour' : 'Add New Tour'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3"><input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="form-control" required /></div>
                <div className="mb-3"><textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="form-control" rows="3" required /></div>
                <div className="mb-3"><label className="form-label">Tour Image</label><input name="image" type="file" onChange={handleFileChange} className="form-control" /></div>
                <div className="row mb-3">
                    <div className="col"><input name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="form-control" required /></div>
                    <div className="col"><input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} className="form-control" required /></div>
                </div>
                <div className="mb-3"><input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="form-control" required /></div>
                <button type="submit" className="btn btn-primary w-100">{isEditing ? 'Save Changes' : 'Add Tour'}</button>
            </form>
        </div>
    );
}
