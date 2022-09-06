import React from 'react';
import { login } from '../firebase';
import LoginForm from '../components/LoginForm';

export default function Login({ navigation }) {

    const handleSubmit = async (e, email, password) => {
        e.preventDefault();
        const user = await login(email, password);
        if (user) {
            navigation.replace('Main');
        }
    }
    
    return <LoginForm handleSubmit={handleSubmit} />;
}