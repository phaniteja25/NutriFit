import React, { useState } from 'react';

const Login = () => {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit login data
        console.log('Login Form Submitted:', formData);
    };

    return (
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
    );
};

export default Login;
