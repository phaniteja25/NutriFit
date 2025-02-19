import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import bg_img from './image_bg.jpg';

const UserProfile = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        height: '',
        weight: '',
        age: '',
        gender: 'Male', // Default value
        activity_level: 'Sedentary (little or no exercise)', // Default value
        goal: 'Reduce Fat by 30%', // Default value
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
            const response = await fetch('https://nutrifit-production-8d5a.up.railway.app/user/userinfo', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch user info: ${response.statusText}`);
            }

            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching user info:', error.message);
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
        if (!profile.height || !profile.weight || !profile.age) {
            alert('Please fill out all fields before saving.');
            return;
        }

        try {
            const response = await fetch('https://nutrifit-production-8d5a.up.railway.app/user/update_user_info', {
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
                    activity_level: profile.activity_level,
                    goal: profile.goal,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update user info: ${response.statusText}`);
            }

            const updatedData = await response.json();
            setProfile(updatedData);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user info:', error.message);
        }
    };

    return (
        <>
            <Navbar />
            <div
                className="flex justify-center items-center min-h-screen p-4"
                style={{
                    backgroundImage: `url(${bg_img})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundBlendMode: 'darken',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}
            >
                <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>

                    {/* Username Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={profile.username}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-100"
                        />
                    </div>

                    {/* Dynamic Fields */}
                    {['height', 'weight', 'age'].map((field) => (
                        <div className="mb-4" key={field}>
                            <label className="block text-gray-600 mb-1">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                            <input
                                type={field === 'age' ? 'number' : 'text'}
                                name={field}
                                value={profile[field]}
                                onChange={handleChange}
                                disabled={!isEditing}
                                className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${
                                    isEditing ? 'bg-white' : 'bg-gray-100'
                                }`}
                            />
                        </div>
                    ))}

                    {/* Gender Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Gender</label>
                        <select
                            name="gender"
                            value={profile.gender}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${
                                isEditing ? 'bg-white' : 'bg-gray-100'
                            }`}
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Activity Level Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Activity Level</label>
                        <select
                            name="activity_level"
                            value={profile.activity_level}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${
                                isEditing ? 'bg-white' : 'bg-gray-100'
                            }`}
                        >
                            <option value="Sedentary (little or no exercise)">Sedentary (little or no exercise)</option>
                            <option value="Lightly active (training/sports 2-3 days/week)">Lightly active (training/sports 2-3 days/week)</option>
                            <option value="Moderately active (training/sports 4-5 days/week)">Moderately active (training/sports 4-5 days/week)</option>
                            <option value="Very active (training/sports 6-7 days/week)">Very active (training/sports 6-7 days/week)</option>
                            <option value="Super active (very intense exercise daily)">Super active (very intense exercise daily)</option>
                            <option value="Extremely active (twice per day, extra heavy workouts)">Extremely active (twice per day, extra heavy workouts)</option>
                        </select>
                    </div>

                    {/* Goal Field */}
                    <div className="mb-4">
                        <label className="block text-gray-600 mb-1">Goal</label>
                        <select
                            name="goal"
                            value={profile.goal}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring ${
                                isEditing ? 'bg-white' : 'bg-gray-100'
                            }`}
                        >
                            <option value="Reduce Fat by 30%">Reduce Fat by 30%</option>
                            <option value="Reduce Fat by 20%">Reduce Fat by 20%</option>
                            <option value="Reduce Fat by 10%">Reduce Fat by 10%</option>
                            <option value="Muscle Gain">Muscle Gain</option>
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
