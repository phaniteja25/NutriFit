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
            const response = await fetch('http://localhost:8080/user/userinfo', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch user info');
            
            const data = await response.json();
            setProfile(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

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
            const response = await fetch('http://localhost:8080/user/update_user_info', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    height: profile.height,
                    weight: profile.weight,
                    age: profile.age,
                    gender: profile.gender,
                    activity_level: profile.activityLevel,
                    goal: profile.goal,
                }),
            });

            if (!response.ok) throw new Error('Failed to update user info');

            const updatedData = await response.json();
            setProfile(updatedData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
                <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 bg-gray-100"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Height</label>
                        <input
                            type="text"
                            name="height"
                            value={profile.height}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={profile.weight}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Age</label>
                        <input
                            type="number"
                            name="age"
                            value={profile.age}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Activity Level</label>
                        <select
                            name="activityLevel"
                            value={profile.activityLevel}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
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

                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Goal</label>
                        <select
                            name="goal"
                            value={profile.goal}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${isEditing ? 'bg-white' : 'bg-gray-100'}`}
                        >
                            <option value="">Select Goal</option>
                            <option value="Reduce Fat by 30%">Reduce Fat by 30%</option>
                            <option value="Reduce Fat by 20%">Reduce Fat by 20%</option>
                            <option value="Reduce Fat by 10%">Reduce Fat by 10%</option>
                            <option value="Muscle Gain">Maintenance or a Slight Surplus</option>
                        </select>
                    </div>

                    <button
                        onClick={isEditing ? handleSaveClick : handleEditClick}
                        className="w-full py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {isEditing ? 'Save' : 'Edit'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserProfile;
