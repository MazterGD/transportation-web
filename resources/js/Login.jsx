import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token);  // Store the token
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Email: </label><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> <br /><br />
            <label>Password: </label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> <br /><br />
            <button type="submit">Login</button><br /><br />
        </form>
    );
};

export default Login;
