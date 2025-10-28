import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import { Alert, Container, Row, Col, Card } from 'react-bootstrap';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const successMessage = location.state?.message;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await api.get('/bookings/my-bookings');
        setBookings(data);
      } catch (err) {
        setError('Failed to fetch bookings.');
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <Container className="mt-5"><p>Loading...</p></Container>;
  }

  if (error) {
    return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-5">
      <h2>My Bookings</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        <Row>
          {bookings.map(booking => (
            <Col key={booking._id} md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{booking.tour.title}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}<br />
                    <strong>Guests:</strong> {booking.guests}<br />
                    <strong>Status:</strong> {booking.paymentStatus}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Dashboard;