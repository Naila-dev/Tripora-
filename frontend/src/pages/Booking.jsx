import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api"; // Axios instance for API requests
import { useAuth } from "../components/AuthContext"; // Access user authentication context

const Booking = () => {
  const { tourId } = useParams(); // Extract tour ID from the URL
  const navigate = useNavigate(); // React Router navigation
  const { user } = useAuth(); // Logged-in user info from AuthContext

  // === Component State ===
  const [tour, setTour] = useState(null); // Stores tour details
  const [loading, setLoading] = useState(true); // Loading state for tour data

  // Booking form data
  const [bookingData, setBookingData] = useState({
    date: "",
    numberOfPeople: 1,
    specialRequirements: "",
  });

  // Payment-related states
  const [paymentStatus, setPaymentStatus] = useState(null); // 'processing', 'failed', etc.
  const [paymentError, setPaymentError] = useState(null); // Holds any payment error messages

  // === Fetch Tour Data on Mount ===
  useEffect(() => {
    const fetchTour = async () => {
      try {
        const { data } = await api.get(`/tours/${tourId}`);
        setTour(data);
      } catch (error) {
        console.error("Error fetching tour:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [tourId]);

  // === Handle Form Input Changes ===
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // === Poll Payment Status ===
  const checkPaymentStatus = async (bookingId) => {
    try {
      const response = await api.get(`/payments/status/${bookingId}`);
      setPaymentStatus(response.data.status);

      if (response.data.error) {
        setPaymentError(response.data.error);
      }

      return response.data.status;
    } catch (error) {
      console.error("Error checking payment status:", error);
      return "error";
    }
  };

  // === Handle Booking Form Submission ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentError(null);
    setPaymentStatus("initializing");

    // Redirect to login if not authenticated
    if (!user) {
      navigate("/login", { state: { from: `/booking/${tourId}` } });
      return;
    }

    // Ensure user has phone number (for M-Pesa)
    if (!user.phone) {
      setPaymentError({
        code: "INVALID_PHONE",
        message: "Phone number is required for payment",
      });
      return;
    }

    try {
      // === Step 1: Create booking ===
      const bookingResponse = await api.post("/bookings", {
        tourId,
        date: bookingData.date,
        numberOfPeople: bookingData.numberOfPeople,
      });

      if (bookingResponse.status === 201) {
        const { bookingId, totalAmount } = bookingResponse.data;
        setPaymentStatus("processing");

        try {
          // === Step 2: Initiate M-Pesa payment ===
          const paymentResponse = await api.post("/payments/stkpush", {
            phone: user.phone,
            amount: totalAmount,
            bookingId,
          });

          if (paymentResponse.status === 200) {
            // === Step 3: Poll payment status every 5 seconds ===
            const pollInterval = setInterval(async () => {
              const status = await checkPaymentStatus(bookingId);

              if (status === "completed") {
                clearInterval(pollInterval);
                navigate("/dashboard", {
                  state: {
                    message: "Payment successful! Your booking is confirmed.",
                  },
                });
              } else if (["failed", "cancelled"].includes(status)) {
                clearInterval(pollInterval);
                setPaymentStatus(status);
              }
            }, 5000);

            // Stop polling after 2 minutes to prevent infinite loop
            setTimeout(() => {
              clearInterval(pollInterval);
              if (paymentStatus === "processing") {
                setPaymentError({
                  code: "TIMEOUT",
                  message: "Payment request timed out. Please try again.",
                });
              }
            }, 120000);
          }
        } catch (paymentError) {
          // Handle M-Pesa request failure
          setPaymentStatus("failed");
          setPaymentError({
            code:
              paymentError.response?.data?.error || "PAYMENT_FAILED",
            message:
              paymentError.response?.data?.message ||
              "Payment failed. Please try again.",
          });

          // Update backend booking status
          await api.patch(`/bookings/${bookingId}/payment-status`, {
            status: "failed",
          });
        }
      }
    } catch (error) {
      // Handle booking creation failure
      setPaymentStatus("failed");
      setPaymentError({
        code: "BOOKING_FAILED",
        message: "Failed to create booking. Please try again.",
      });
    }
  };

  // === Render UI ===

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!tour) return <div className="text-center mt-5">Tour not found</div>;

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">Book Tour</h3>
            </div>

            <div className="card-body">
              {/* Tour Details Section */}
              <div className="mb-4">
                <h4>{tour.title}</h4>
                <p className="text-muted">{tour.location}</p>
                <p className="fw-bold">Price: ${tour.price} per person</p>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit}>
                {/* Date Input */}
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    value={bookingData.date}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>

                {/* Number of People Input */}
                <div className="mb-3">
                  <label
                    htmlFor="numberOfPeople"
                    className="form-label"
                  >
                    Number of People
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="numberOfPeople"
                    name="numberOfPeople"
                    value={bookingData.numberOfPeople}
                    onChange={handleInputChange}
                    min="1"
                    max="10"
                    required
                  />
                </div>

                {/* Special Requirements Input */}
                <div className="mb-3">
                  <label
                    htmlFor="specialRequirements"
                    className="form-label"
                  >
                    Special Requirements
                  </label>
                  <textarea
                    className="form-control"
                    id="specialRequirements"
                    name="specialRequirements"
                    value={bookingData.specialRequirements}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Any special requirements or requests?"
                  />
                </div>

                {/* Payment Messages */}
                {paymentError && (
                  <div className="alert alert-danger mb-3">
                    <strong>{paymentError.code}:</strong>{" "}
                    {paymentError.message}
                  </div>
                )}

                {paymentStatus === "processing" && (
                  <div className="alert alert-info mb-3">
                    <div className="d-flex align-items-center">
                      <div
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      Processing payment... Please check your phone for
                      the M-Pesa prompt.
                    </div>
                  </div>
                )}

                {/* Submit + Back Buttons */}
                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={paymentStatus === "processing"}
                  >
                    {paymentStatus === "processing"
                      ? "Processing Payment..."
                      : "Confirm Booking"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                    disabled={paymentStatus === "processing"}
                  >
                    Back
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
