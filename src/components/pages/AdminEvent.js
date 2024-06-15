import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // Import react-modal

// Ensure to set the app element for accessibility
Modal.setAppElement('#root');

const AdminEvent = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch all events data on component mount
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/events`, {
                    headers: {
                        'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                        'Content-Type': 'application/json'
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Empty dependency array ensures this runs only once on mount

    // Handle opening the modal for editing
    const handleEdit = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    // Handle the deletion of an event
    const handleDelete = async (eventId) => {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/admin/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                    'Content-Type': 'application/json'
                }
            });
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    // Handle saving the edited event
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/admin/events/${selectedEvent.id}`, selectedEvent, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                    'Content-Type': 'application/json'
                }
            });
            setEvents(events.map(event => event.id === selectedEvent.id ? selectedEvent : event));
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Format date to a readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Format time to a readable format
    const formatTime = (timeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(timeString).toLocaleTimeString(undefined, options);
    };

    return (
        <>
            <section className="admin-user-section">
                <div className="container12">
                    <h2 style={{ marginTop: '2rem' }}>Admin Events Data</h2>
                    <table className="table table-success table-striped">
                        <thead>
                            <tr>
                                <th>Uploaded Date</th>
                                <th>Event Name</th>
                                <th>Starting Date</th>
                                <th>Ending Date</th>
                                <th>Guest</th>
                                <th>Description</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                events.map((curEvent, index) => (
                                    <tr key={index}>
                                        <td>{formatDate(curEvent.uploadedDate)}</td>
                                        <td>{curEvent.eventName}</td>
                                        <td>{`${formatDate(curEvent.startingDate)} ${formatTime(curEvent.startingDate)}`}</td>
                                        <td>{`${formatDate(curEvent.endingDate)} ${formatTime(curEvent.endingDate)}`}</td>
                                        <td>{curEvent.guest}</td>
                                        <td>{curEvent.description}</td>
                                        <td><button className="btn btn-warning btn-sm" onClick={() => handleEdit(curEvent)}>Edit</button></td>
                                        <td><button className="btn btn-danger btn-sm" onClick={() => handleDelete(curEvent.id)}>Delete</button></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8">No events found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {selectedEvent && (
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Edit Event">
                    <h2>Edit Event</h2>
                    <form onSubmit={handleSave}>
                        <div className="form-group">
                            <label>Event Name:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="eventName"
                                value={selectedEvent.eventName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Starting Date:</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="startingDate"
                                value={new Date(selectedEvent.startingDate).toISOString().slice(0, 16)}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ending Date:</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                name="endingDate"
                                value={new Date(selectedEvent.endingDate).toISOString().slice(0, 16)}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Guest:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="guest"
                                value={selectedEvent.guest}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea
                                className="form-control"
                                name="description"
                                value={selectedEvent.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default AdminEvent;
