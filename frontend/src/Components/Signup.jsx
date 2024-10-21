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
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Construct the payload for the API
        const requestData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            height: parseFloat(formData.height),  // Convert to float (double precision)
            weight: parseFloat(formData.weight),  // Convert to float (double precision)
            age: parseInt(formData.age, 10),      // Convert age to an integer
            gender: formData.gender.toLowerCase(), // Assuming API expects lowercase gender
            activity_level: formData.activityLevel,
            goal: formData.goal
        };
        navigate('/');

        try {
            // Send a POST request to the signup API
            const response = await fetch('http://localhost:8080/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {

                alert('Signup successful!'); // Show success alert
                // Handle successful signup (e.g., redirect to login page or show success message)
            } else {
                const errorMessage = await response.text(); // Get the plain text response
                alert(`Signup failed: ${errorMessage}`); // Show error alert with message from server
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}`); // Show alert for unexpected errors
        }
    };

    return (
        <>
        <SignupNavbar></SignupNavbar>
        <div className="container">
            <div className="signup-form-container">
                <h2>Signup</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>UserName</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>EmailID</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Height</label>
                        <input
                            type="text"
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Weight</label>
                        <input
                            type="text"
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select className='sg-select'
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Activity Level</label>
                        <select className='sg-select'
                            name="activityLevel"
                            value={formData.activityLevel}
                            onChange={handleChange}
                            required
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
                        <select className='sg-select'
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Goal</option>
                            <option value="Reduce Fat by 30%">Reduce Fat by 30%</option>
                            <option value="Reduce Fat by 20%">Reduce Fat by 20%</option>
                            <option value="Reduce Fat by 10%">Reduce Fat by 10%</option>
                            <option value="Muscle Gain">Maintenance or a Slight Surplus</option>
                        </select>
                    </div>
                    <button className='s-btn' type="submit">SignUp</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default Signup;