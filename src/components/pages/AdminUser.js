import { useEffect, useState } from "react";
import axios from "axios";

export const AdminUser = () => {
    const [users, setUsers] = useState([]);

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

    useEffect(() => {
        getAllUsersData();
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <>
        
            <section className="admin-user-section">
                <div className="container11">
                    <h2 style={{color:"brown"}}> Admin Users Data </h2>
                    <table  class="table table-success table-striped">
                        <thead>
                            <tr> 
                            <th> Name </th>
                            <th> Email </th>
                            <th> Mob.No. </th>
                            <th> Edit </th>
                            <th> Delete </th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((curUser, index) => {
                                return (
                                    <tr key={index}>
                                    <td> {curUser.name} </td>
                                    <td> {curUser.email} </td>
                                    <td> {curUser.number} </td>
                                    <td> Edit </td>
                                    <td> Delete </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
                

            {users.length > 0 ? (
                users.map((curUser, index) => (
                    <h2 key={index}>{curUser.index}</h2>
                ))
            ) : (
                <p>No users found</p>
            )}
        </>
    );
};


