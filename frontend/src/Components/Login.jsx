import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupNavbar from './SignupNavbar';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Check for token on page load
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setIsLoggedIn(true); // Set logged-in state
        }
    }, []); // Empty dependency array ensures it runs only once on mount

/*     useEffect(() => {
        if (isLoggedIn) {
            alert('You are already logged in!');
        }
    }, [isLoggedIn]); // Runs only when isLoggedIn changes */

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8080/user/generate-token', {
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
                    }, 100); // 100ms delay
                    setIsLoggedIn(true);
                    // alert('Login successful');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            } else if (response.status === 404) {
                alert('User not found');
            } else if (response.status === 401) {
                alert('Wrong credentials');
            } else {
                alert('An error occurred. Please try again later.');
            }
        } catch (error) {
            alert('An error occurred. Please check your connection.');
        }
    };

    return (
        <>
        <SignupNavbar></SignupNavbar>
        <div className="lg-container">
            <div className="login-form-container">
                <h2>Login</h2>
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
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-footer">
                        <a href="/forgot-password" className="forgot-password">Forget Password</a>
                        <a href="/Signup" className="sign-in">Sign In</a>
                    </div>
                    <button className='lg-btn' type="submit">Login</button>
                </form>
            </div>
        </div>
        </>
    );
};

export default Login;
