import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManagersTable = () => {
    const [managers, setManagers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/managers')
            .then(response => {
                setManagers(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>Registered Managers</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Contact Number</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {managers.map(manager => (
                            <tr key={manager._id}>
                                <td>{manager.Name}</td>
                                <td>{manager.NIC}</td>
                                <td>{manager.contactNumber}</td>
                                <td>{manager.email}</td>
                                <td>{manager.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ManagersTable;