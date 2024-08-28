import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import NavManager from '../components/NavManager';
import SideNav from '../components/SideNavAdmin';

export const HomePackag = () => {
    const [packags, setPackags] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false); // Define isOpen state
    const toggleNav = () => { // Define toggleNav function
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setLoading(true);
        const fetchPackags = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/package${searchQuery ? `?query=${searchQuery}` : ''}`);
                setPackags(response.data.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchPackags();
    }, [searchQuery]);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5555/search?query=${searchQuery}`);
            setPackags(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <NavManager managerName={"Admin"}></NavManager><br /><br /><br />
            <SideNav isOpen={isOpen} toggleNav={toggleNav} /> {/* Pass isOpen and toggleNav props */}
            <div>
                <div className="p-4">
                    <div className='flex justify-between items-center'>
                        <h1 className="heading">Package List</h1>
                    </div>
                    <div>
                        <Link to='/packages/create'>
                            <MdOutlineAddBox className='icona' />
                        </Link>
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchInputChange} className="search-input" />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    {loading ? (
                        <Spinner />
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className='header'>Package ID</th>
                                    <th className='header'>Name</th>
                                    <th className='header'>Image</th>
                                    <th className='header'>Price</th>
                                    <th className='header'>Description</th>
                                    <th className='header'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {packags.map((packag, index) => (
                                    <tr key={packag.id} className='row'>
                                        <td>{index + 1}</td>
                                        <td>{packag.packageName}</td>
                                        <td>
                                            <img src={packag.image} alt={` ${packag.name}`} className='packag-image' />
                                        </td>
                                        <td>{packag.packagePrice}</td>
                                        <td>{packag.packageInfo}</td>
                                        <td>
                                            <div className='actions'>
                                                <Link to={`/packages/details/${packag._id}`}>
                                                    <BsInfoCircle className='icon' />
                                                </Link>
                                                <Link to={`/packages/edit/${packag._id}`}>
                                                    <AiOutlineEdit className='icon' />
                                                </Link>
                                                <Link to={`/packages/delete/${packag._id}`}>
                                                    <MdOutlineDelete className='icond' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}

export default HomePackag;