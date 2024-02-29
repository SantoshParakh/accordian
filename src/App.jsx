import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiGlobe, FiHeart, FiEdit } from 'react-icons/fi'; 
import { FaTrash } from "react-icons/fa";
import "./App.css" 


const App = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({});

    async function getUsersDetails() {
        try {
            const res = await fetch('https://joaosilgo.github.io/dummy_db/users.json');
            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getUsersDetails();
    }, []);

    const handleHeartClick = (id) => {
        const updatedUsers = users.map(user => {
            if (user.id === id) {
                return { ...user, liked: !user.liked };
            }
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setEditMode(true);
        setEditedUser(user);
    };

    const handleDeleteClick = (id) => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
    };

    const handleSaveEdit = () => {
        const updatedUsers = users.map(user => {
            if (user.id === editedUser.id) {
                return editedUser;
            }
            return user;
        });
        setUsers(updatedUsers);
        setEditMode(false);
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setEditedUser({});
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    return (
        <div className="user-grid">
            {users.map((user) => (
                <div key={user.id} className="user-box">
                    <h2>{user.name}</h2>
                    <p><FiMail />  {user.email}</p>
                    <p><FiPhone />  {user.phone}</p>
                    <p><FiGlobe />  {user.website}</p>
                    <hr/>
                    <div style={{display:"flex",alignItems:"center", justifyContent:"space-around", cursor:"pointer", onMouseHover:"blue"}} className="button-container">
                        <div onClick={() => handleHeartClick(user.id)}><FiHeart fill={user.liked ? 'red' : 'none'} stroke="red" size={20} /></div> 
                        <div onClick={() => handleEditClick(user)} className="edit-button"><FiEdit size={20}/></div>
                        <div onClick={() => handleDeleteClick(user.id)} className="delete-button"><FaTrash fill={'grey'} size={20}/></div>
                    </div>
                </div>
            ))}
            {editMode && selectedUser && (
                <div className="modal">
                    <div className="modal-content">
                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                        <h2>Basic Modal</h2>
                        <span style={{cursor:"pointer"}} fontSize={"40px"} onClick={handleCancelEdit}>&times;</span>
                        </div>
                        <hr style={{marginBottom:"30px"}}/>
                        <div className="form-group">
                            <label><span className="required-field"> Name:</span></label>
                            <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><span className="required-field"> Email:</span></label>
                            <input type="text" name="email" value={editedUser.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><span className="required-field"> Phone:</span></label>
                            <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label><span className="required-field"> Website:</span></label>
                            <input type="text" name="website" value={editedUser.website} onChange={handleChange} />
                        </div>
                        <div className="modal-buttons">
                            <button  onClick={handleCancelEdit}>Cancel</button>
                            <button onClick={handleSaveEdit}>OK</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;