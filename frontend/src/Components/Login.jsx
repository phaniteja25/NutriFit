import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupNavbar from './SignupNavbar';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
    const [forgotPasswordData, setForgotPasswordData] = useState({
        username: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setIsLoggedIn(true);
        }
    }, []);
 // Empty dependency array ensures it runs only once on mount

    useEffect(() => {
    if (isLoggedIn) {
        // alert('You are already logged in!');
    }
    }, [isLoggedIn]); // Runs only when isLoggedIn changes


    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleForgotPasswordChange = (e) => {
        const { name, value } = e.target;
        setForgotPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleForgotPasswordSubmit = async (e) => {
        e.preventDefault();
        const { username, newPassword, confirmNewPassword } = forgotPasswordData;

        if (newPassword !== confirmNewPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('https://nutrifit-production-8d5a.up.railway.app/user/update-password', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, newPassword })
            });

            if (response.ok) {
                alert('Password reset successful');
                setShowForgotPasswordDialog(false);
            } else {
                alert('Failed to reset password');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.' + error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://nutrifit-production-8d5a.up.railway.app/user/generate-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 100);
                    setIsLoggedIn(true);
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } else if (response.status === 404) {
                alert('User not found');
            } else if (response.status === 401) {
                alert('Wrong credentials');
            } else if(response.status===503){
                alert('Service is temporarily unavailable. Please try again later')
            } 
            else {
                alert('An error occurred. Please try again later.');
            }
        } catch (error) {
            alert('An error occurred. Please check your connection.');
        }
    };

    return (
        <>
            <SignupNavbar />
            <div className="flex min-h-screen w-full">
                <div className="flex flex-col justify-center w-1/2 p-8 bg-white">
                    <div className="max-w-xs mx-auto">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 mb-1">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    type="button"
                                    onClick={() => setShowForgotPasswordDialog(true)}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    type="button"
                                    onClick={() => navigate("/Signup")}
                                    className="text-sm text-blue-600 hover:underline"
                                >
                                    New User? Register Here
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
                            >
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
                <div className="flex w-1/2 items-center bg-blue-50 p-10">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-blue-600">Welcome to NutriNova!</h2>
                        <p className="text-gray-700 text-lg">
                            NutriNova is your personal health companion, designed to help you track your meals, monitor nutrition, and achieve your fitness goals.
                        </p>
                        <ul className="list-disc list-inside text-gray-700">
                            <li><strong>Track Meals:</strong> Log every meal and keep a record of your daily food intake.</li>
                            <li><strong>Calorie Goals:</strong> Set daily calorie goals and monitor your progress with visual feedback.</li>
                            <li><strong>Macronutrient Insights:</strong> Get a breakdown of proteins, fats, and carbs for a balanced diet.</li>
                            <li><strong>AI Meal Plan Generator</strong>Utilize AI Tool to generate Meal Plan for the week</li>
                            <li><strong>Stay Motivated: </strong> View your progress over time and stay motivated to reach your goals.</li>
                        </ul>
                        <p className="text-gray-700 text-lg">
                            Join us today to take control of your nutrition and make healthier choices every day!
                        </p>
                    </div>
                </div>
            </div>
            {showForgotPasswordDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
                        <form onSubmit={handleForgotPasswordSubmit}>
                        <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={forgotPasswordData.username}
                        onChange={handleForgotPasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Enter your username"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">New Password</label>
                    <input
                        type="password"
                        name="newPassword"
                        value={forgotPasswordData.newPassword}
                        onChange={handleForgotPasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Enter new password"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 mb-1">Confirm New Password</label>
                    <input
                        type="password"
                        name="confirmNewPassword"
                        value={forgotPasswordData.confirmNewPassword}
                        onChange={handleForgotPasswordChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        placeholder="Confirm new password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
                >
                    Submit
                </button>
                <button
                    type="button"
                    onClick={() => setShowForgotPasswordDialog(false)}
                    className="w-full py-2 mt-2 bg-gray-200 text-gray-600 rounded hover:bg-gray-300 transition duration-150"
                >
                    Cancel
                </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Login;
