// src/LoginForm.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from '../redux/loginSlice';
import { login } from '../api/api';
import { Redirect } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const token = useSelector((state) => state.login.token);
    const error = useSelector((state) => state.login.error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await login(username, password);
            dispatch(loginSuccess(token));
        } catch (error) {
            dispatch(loginFailure('Login failed. Please check your credentials.'));
        }
    };

    if (token) {
        return <Redirect to="/home" />;
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default LoginForm;
