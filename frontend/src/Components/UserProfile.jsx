import React, { useState } from 'react';

const UserProfile = () => {
    // Initial state for the profile fields
    const [profile, setProfile] = useState({
        username: 'JohnDoe',
        email: 'johndoe@example.com',
        password: '********',
        height: '180 cm',
        weight: '75 kg',
        age: '30',
        gender: 'Male',
        activityLevel: 'Moderate',
        goal: 'Maintain Weight'
    });

    const [isEditing, setIsEditing] = useState(false); // Toggle between editing and viewing modes

    // Handler to toggle editing mode
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handler to save the changes
    const handleSaveClick = () => {
        setIsEditing(false);
        // You can add code here to save the profile data to a server or database
    };

    // Handler to change the form values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className='container'>
            <div className="profile-container">
            <h2>User Profile</h2>
            <div className="form-group">
                <label>UserName</label>
                <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Height</label>
                <input
                    type="text"
                    name="height"
                    value={profile.height}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Weight</label>
                <input
                    type="text"
                    name="weight"
                    value={profile.weight}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Age</label>
                <input
                    type="number"
                    name="age"
                    value={profile.age}
                    onChange={handleChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label>Gender</label>
                <select className='up-select'
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    disabled={!isEditing}
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Activity Level</label>
                <select className='up-select'
                    name="activityLevel"
                    value={profile.activityLevel}
                    onChange={handleChange}
                    disabled={!isEditing}
                >
                    <option value="Low">Low</option>
                    <option value="Moderate">Moderate</option>
                    <option value="High">High</option>
                </select>
            </div>
            <div className="form-group">
                <label>Goal</label>
                <select className='up-select'
                    name="goal"
                    value={profile.goal}
                    onChange={handleChange}
                    disabled={!isEditing}
                >
                    <option value="Lose Weight">Lose Weight</option>
                    <option value="Maintain Weight">Maintain Weight</option>
                    <option value="Gain Weight">Gain Weight</option>
                </select>
            </div>

            <button className='up-btn' onClick={isEditing ? handleSaveClick : handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
        </div>
        
    );
};

export default UserProfile;
