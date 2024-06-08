import axios from "axios";

const getAllEventsData = async () => {
    try {     
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/events`, {
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
        console.log(`events ${data}`); // Log the data to inspect
        setEvents(data);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

export { getAllEventsData };
