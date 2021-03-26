import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 15px;
    border: 2px solid #e64545;
    border-radius: 5px;
    padding: 15px;
    background-color: #1c1c1c;
    min-width: 400px;
    @media (max-width: 455px) {
        min-width: 300px;
    }
    @media (max-width: 360px) {
        min-width: 250px;
    }
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const ErrorMessage = styled.div`
    font-size: 16px;
    max-width: 75%;
    color: red;
    margin: 4px;
`;

const SuccessMessage = styled.div`
    font-size: 16px;
    max-width: 75%;
    color: green;
    margin: 4px;
`;


const Input = styled.input`
   background-color: transparent;
   border: 1.5px solid #e64545;
   border-radius: 5px;
   font-family: inherit;
   font-size: 14px;
   padding: 5px;
   color: whitesmoke;
   margin-bottom: 15px;
   min-width: 200px;
`;

const Label = styled.label`
    color: whitesmoke;
    font-weight: bold;
    margin-bottom: 3px;
`;

const HasAccountButton = styled.button`
    border: transparent;
    margin-right: 5px;
    margin-left: 5px;
    font-family: inherit;
    padding: 7px;
    font-size: 16px;
    transition-duration: 0.2s;
    color: whitesmoke;
    font-weight: bold;
    background-color: transparent;
    margin-top: 7px;
    &:hover {
        color: #e64545;
    }
`;

const SignUpButton = styled.button`
    border: 2px solid whitesmoke;
    margin-right: 5px;
    margin-left: 5px;
    font-family: inherit;
    padding: 7px;
    font-size: 16px;
    transition-duration: 0.2s;
    color: whitesmoke;
    font-weight: bold;
    background-color: #e64545;
    border-radius: 7px;
    &:hover {
        background-color: whitesmoke;
        border: 2px solid #e64545;
        color: #e64545;
    }
`;

export default function LogIn({ setRenderView }) {

    // Set up form data
    const [fields, setFields] = useState({ username: '', password: '' });
    const { username, password } = fields;

    // Set up message data
    const [messages, setMessages] = useState({ errorMessage: '', successMessage: ''});
    const { errorMessage, successMessage } = messages;

    // Handle message update
    function handleMessage(messageType, value) {
        setMessages({...messages, [messageType] : value });
    }
    
    // Handle input change
    function handleChange(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({...fields, [name]: value });
    }

    // Submit handler form
    function handleSubmit(e) {
        e.preventDefault();
        // Send user data to the validation route.
        const userData = { username, password };
        axios.post('/api/users/validate', userData)
            .then(({ data }) => {
                if (data.valid) {
                    handleMessage('successMessage', 'Logged in! Loading profile...');
                    setRenderView('home');
                } else {
                    // User is either not found or invalid.
                    console.log('hi')
                    handleMessage('errorMessage', 'Please double check your credentials.');
                }
            })
            .catch(err => console.log(err));
    }


    return (
        <Container>
            <h3>Sign In</h3>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="username">Username/Email</Label>
                <Input type="text" name="username" value={username} onChange={handleChange} />

                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" value={password} onChange={handleChange} />

                <SignUpButton type="submit">Sign In</SignUpButton>
                <HasAccountButton>Recover Account</HasAccountButton>
                
                { successMessage === '' ? null : <SuccessMessage>{successMessage}</SuccessMessage> }
                { errorMessage === '' ? null : <ErrorMessage>{errorMessage}</ErrorMessage> }
            </Form>
        </Container>
    );
}
