import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupNavbar from './SignupNavbar';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        height: '',
        weight: '',
        age: '',
        gender: '',
        activityLevel: '',
        goal: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Email is not valid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        const heightPattern = /^[0-9]+(\.[0-9]+)?$/;
        if (!formData.height) {
            newErrors.height = 'Height is required';
        } else if (!heightPattern.test(formData.height)) {
            newErrors.height = 'Height must be a positive number';
        } else if (parseFloat(formData.height) > 250) {
            newErrors.height = 'Height cannot exceed 250 cm';
        }  else if (parseFloat(formData.height) < 60) {
            newErrors.height = 'Height cannot be less than 60 cm';
        }
        const weightPattern = /^[0-9]+(\.[0-9]+)?$/;
        if (!formData.weight) {
            newErrors.weight = 'Weight is required';
        } else if (!weightPattern.test(formData.weight)) {
            newErrors.weight = 'Weight must be a positive number';
        } else if (parseFloat(formData.weight) > 635) {
            newErrors.weight = 'Weight cannot exceed 635 kgs';
        } else if (parseFloat(formData.weight) < 3) {
            newErrors.weight = 'Weight cannot be less than 3 kgs';
        }

        if (!formData.age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(formData.age) || formData.age <= 0) {
            newErrors.age = 'Age must be a positive integer';
        } else if (parseFloat(formData.age) >= 90) {
            newErrors.age = 'Age cannot exceed 90 years';
        } else if (parseFloat(formData.age) <= 12) {
            newErrors.age = 'Age cannot be less than 12 years';
        }

        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
        }

        if (!formData.activityLevel) {
            newErrors.activityLevel = 'Activity level is required';
        }

        if (!formData.goal) {
            newErrors.goal = 'Goal is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if ((name === 'height' || name === 'weight') && !/^\d*\.?\d*$/.test(value)) {
                return; // Prevents updating the state if the input is invalid
        }

        // Only allow whole numbers for the age field
        if (name === 'age' && !/^\d*$/.test(value)) {
                return; // Prevents updating the state if the input is invalid
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true); // Show loading dialog
        const requestData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            height: parseFloat(formData.height),
            weight: parseFloat(formData.weight),
            age: parseInt(formData.age, 10),
            gender: formData.gender.toLowerCase(),
            activity_level: formData.activityLevel,
            goal: formData.goal
        };

        try {
            const response = await fetch('https://nutrifit-production-d71d.up.railway.app/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                // Delay navigation by 4 seconds after successful signup
                setTimeout(() => {
                    setIsLoading(false); // Hide loading dialog
                    navigate('/');
                }, 2000); // 4000 milliseconds = 4 seconds
            } else if(response.status===503){
                alert('Service is temporarily unavailable. Please try again later')
            }  
            else {
                const errorMessage = await response.text();
                alert(`Signup failed: ${errorMessage}`);
                setIsLoading(false); // Hide loading dialog immediately if signup fails
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`);
            setIsLoading(false); // Hide loading dialog in case of error
        }
    };

    return (
        <>
            <SignupNavbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg mt-12">
                    <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: 'Username', name: 'username', type: 'text', placeholder:"Username should be atleast 3 characters"},
                            { label: 'Email', name: 'email', type: 'email',placeholder:"Please enter valid email" },
                            { label: 'Password', name: 'password', type: 'password',placeholder:"Password should be minimum of 8 characters long" },
                            {
                                    label: 'Height',
                                    name: 'height',
                                    type: 'text',
                                    placeholder: "Please enter your height in cm",
                                    pattern: "^[0-9]*\\.?[0-9]*$",  // restricts to numbers and decimal point
                                    onKeyDown: (e) => {
                                        // prevent alphabetic and symbol input
                                        if (e.key.match(/[^0-9.]/) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }
                                },
                                {
                                    label: 'Weight',
                                    name: 'weight',
                                    type: 'text',
                                    placeholder: "Enter your weight in kg",
                                    pattern: "^[0-9]*\\.?[0-9]*$",  // restricts to numbers and decimal point
                                    onKeyDown: (e) => {
                                        // prevent alphabetic and symbol input
                                        if (e.key.match(/[^0-9.]/) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }
                                },
                                {
                                    label: 'Age',
                                    name: 'age',
                                    type: 'text',
                                    placeholder: "Please enter your age",
                                    pattern: "^[0-9]*$",  // restricts to only numbers
                                    onKeyDown: (e) => {
                                        // prevent alphabetic and symbol input
                                        if (e.key.match(/[^0-9]/) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }
                                }
                        ].map((field) => (
                            <div className="mb-4" key={field.name}>
                                <label className="block text-gray-600 mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                    placeholder={field.placeholder}
                                />
                                {errors[field.name] && (
                                    <p className="text-sm text-red-500 mt-1">{errors[field.name]}</p>
                                )}
                            </div>
                        ))}

                        <div className="mb-4">
                            <label className="block text-gray-600 mb-1">Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-600 mb-1">Activity Level</label>
                            <select
                                name="activityLevel"
                                value={formData.activityLevel}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="">Select Activity Level</option>
                                <option value="Sedentary">Sedentary</option>
                                <option value="Lightly active">Lightly active</option>
                                <option value="Moderately active">Moderately active</option>
                                <option value="Very active">Very active</option>
                                <option value="Super active">Super active</option>
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-600 mb-1">Goal</label>
                            <select
                                name="goal"
                                value={formData.goal}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                                required
                            >
                                <option value="">Select Goal</option>
                                <option value="Reduce Fat by 30%">Reduce Fat by 30%</option>
                                <option value="Reduce Fat by 20%">Reduce Fat by 20%</option>
                                <option value="Reduce Fat by 10%">Reduce Fat by 10%</option>
                                <option value="Muscle Gain">Muscle Gain</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-150"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>

            {isLoading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-md text-center">
                        <p className="text-lg font-semibold">Signing You Up!!</p>
                        <svg
                            className="animate-spin h-8 w-8 text-blue-500 mx-auto mt-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            ></path>
                        </svg>
                    </div>
                </div>
            )}
        </>
    );
};

export default Signup;
