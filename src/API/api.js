import axios from "axios";


const getAllUsersData = async () => {
    try {         
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/admin/users`, {
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
        console.log(`users ${data}`); // Log the data to inspect
        setUsers(data);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

export { getAllUsersData }