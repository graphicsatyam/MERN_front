import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal"; // Import react-modal

// Ensure to set the app element for accessibility
Modal.setAppElement('#root');

export const AdminEvent = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllEventsData = async () => {
        try {     
            const response = await axios.get(`${process.env.BACKEND_URL}/api/admin/events`, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                    'Content-Type': 'application/json'
                }
            });

            console.log(response); // Log the response to inspect

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }
            
            const data = response.data;
            console.log('events', data); // Log the data to inspect
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        getAllEventsData();
    }, []); // Empty dependency array ensures this runs only once on mount

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatTime = (timeString) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(timeString).toLocaleTimeString(undefined, options);
    };

    const handleEdit = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleDelete = async (eventId) => {
        try {   
            const response = await axios.delete(`${process.env.BACKEND_URL}/api/admin/events/${eventId}`, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                    'Content-Type': 'application/json'
                }
            });

            console.log(response); // Log response for debugging

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    const handleSave = async () => {
        try {      
            const response = await axios.put(`${process.env.BACKEND_URL}/api/admin/events/${selectedEvent.id}`, selectedEvent, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`, // Ensure the token is set in .env
                    'Content-Type': 'application/json'
                }
            });

            console.log(response); // Log response for debugging

            if (response.status !== 200) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setEvents(events.map(event => event.id === selectedEvent.id ? selectedEvent : event));
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEvent(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <>
        <section className="admin-user-section">
            <div className="container">
                <h2 style={{ marginTop: '4rem' }}> Admin Events Data </h2>
                <table className="table table-success table-striped">
                    <thead>
                        <tr>
                            <th> Uploaded Date </th>
                            <th> Event Name </th>
                            <th> Starting Date </th>
                            <th> Ending Date </th>
                            <th> Guest </th>
                            <th> Description </th>
                            <th> Edit </th>
                            <th> Delete </th>
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
                                    <td><button onClick={() => handleEdit(curEvent)}>Edit</button></td>
                                    <td><button onClick={() => handleDelete(curEvent.id)}>Delete</button></td>
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
                <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
                    <div className="input-group">
                        <label>Event Name:</label>
                        <input
                            type="text"
                            name="eventName"
                            value={selectedEvent.eventName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Starting Date:</label>
                        <input
                            type="datetime-local"
                            name="startingDate"
                            value={new Date(selectedEvent.startingDate).toISOString().slice(0, 16)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Ending Date:</label>
                        <input
                            type="datetime-local"
                            name="endingDate"
                            value={new Date(selectedEvent.endingDate).toISOString().slice(0, 16)}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Guest:</label>
                        <input
                            type="text"
                            name="guest"
                            value={selectedEvent.guest}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={selectedEvent.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsModalOpen(false)}>Cancel</button>
                </form>
            </Modal>
        )}
        </>
    );
};

export default AdminEvent;
