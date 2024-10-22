import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
        activityLevel: '',
        goal: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
            fetchUserInfo(savedToken);
        }
    }, []);

    const fetchUserInfo = async (authToken) => {
        try {
            const response = await axios.get('http://localhost:8080/user/userinfo', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setProfile(response.data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleEditClick = () => {
        setIsEditing(true);
    };
    const handleSaveClick = async () => {
        try {
            const response = await axios.put(
                'http://localhost:8080/user/update_user_info',
                {
                    height: profile.height,
                    weight: profile.weight,
                    age: profile.age,
                    gender: profile.gender,
                    activity_level: profile.activityLevel,
                    goal: profile.goal,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className='container'>
                <div className="profile-container">
                    <h2>User Profile</h2>

                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            readOnly
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
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
                        <select
                            className='up-select'
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Activity Level</label>
                        <select
                            className='up-select'
                            name="activityLevel"
                            value={profile.activityLevel}
                            onChange={handleChange}
                            disabled={!isEditing}
                        >
                            <option value="">Select Activity Level</option>
                            <option value="Sedentary (little or no exercise)">Sedentary (little or no exercise)</option>
                            <option value="Lightly active (training/sports 2-3 days/week)">Lightly active (training/sports 2-3 days/week)</option>
                            <option value="Moderately active (training/sports 4-5 days/week)">Moderately active (training/sports 4-5 days/week)</option>
                            <option value="Very active (training/sports 6-7 days/week)">Very active (training/sports 6-7 days/week)</option>
                            <option value="Super active (very intense exercise daily)">Super active (very intense exercise daily)</option>
                            <option value="Extremely active (twice per day, extra heavy workouts)">Extremely active (twice per day, extra heavy workouts)</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Goal</label>
                        <select
                            className='up-select'
                            name="goal"
                            value={profile.goal}
                            onChange={handleChange}
                            disabled={!isEditing}
                        >
                            <option value="">Select Goal</option>
                            <option value="Reduce Fat by 30%">Reduce Fat by 30%</option>
                            <option value="Reduce Fat by 20%">Reduce Fat by 20%</option>
                            <option value="Reduce Fat by 10%">Reduce Fat by 10%</option>
                            <option value="Muscle Gain">Maintenance or a Slight Surplus</option>
                        </select>
                    </div>

                    <button
                        className='up-btn'
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
