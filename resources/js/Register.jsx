import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register', {
                name, email, password, password_confirmation
            });
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name: </label><br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br /><br />
            <label>Email: </label><br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br /><br />
            <label>Password: </label><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br /><br />
            <label>Confirm Password: </label><br />
            <input type="password" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required /><br /><br />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
