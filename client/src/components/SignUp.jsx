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



export default function SignUp() {
    
       // Store form data;
    const [fields, setFields] = useState({ username: '', password: '', verifyPassword: '', email: '' });
    const { username, password, verifyPassword, email } = fields;

    // Store user messaging
    const [messages, setMessages] = useState({ submitMessage: '', usernameMessage: '', passwordMessage: '', verifyPasswordMessage: '', emailMessage: ''});
    const { usernameMessage, passwordMessage, verifyPasswordMessage, emailMessage, submitMessage } = messages;

    // Update handlers
    function handleChange(e) {
        const { target } = e;
        const { value, name } = target;
        setFields({...fields, [name]: value});
    }

    function handleMessage(name, value) {
        setMessages({...messages, [name]: value});
    }
    // Form validation for username: 4-10 Chars no special.
    useEffect(() => {
        if (username === '') {
            handleMessage('usernameMessage', '');
        } else {
            const regex = new RegExp("^[a-zA-Z0-9]{4,10}$");
            if (regex.test(username)) {
                // Make sure username doesnt already exist.
                axios.get(`/api/users/${username}`)
                    .then(({ data }) => {
                        if (!data.username) {
                            // Username is available.
                            handleMessage('usernameMessage', '');
                        } else {
                            // Username is taken;
                            const message = 'Username is already taken';
                            handleMessage('usernameMessage', message);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                const message = 'Username must be 4-10 characters, and contain no special characters.';
                handleMessage('usernameMessage', message)
            }
        }
    }, [username]);

    // Form validation for password
    useEffect(() => {
        if (password === '') {
            handleMessage('passwordMessage', '');
        } else {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
            if (regex.test(password)) {
                handleMessage('passwordMessage', '');
            } else {
                handleMessage('passwordMessage', 'Password must be eight or more characters, contain atleast one uppercase, one symbol, and one lowercase.');
            }
        }
    }, [password]);

    // Form validation for password verification
    useEffect(() => {
        if (verifyPassword === '' && password === '') {
            handleMessage('verifyPasswordMessage', '');
        } else if (verifyPassword === password) {
            handleMessage('verifyPasswordMessage', '');
        } else {
            handleMessage('verifyPasswordMessage', 'Passwords must match');
        }
    }, [verifyPassword]);


    // Form validation for email
    useEffect(() => {
        if (email === '') {
            handleMessage('emailMessage', '');
        } else {
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (regex.test(email.toLowerCase())) {
                // First make sure the email hasnt already been registered.
                axios.get(`/api/users/${email}`)
                    .then(({ data }) => {
                        if (!data.email) {
                            // This means the email hasnt been taken.
                            handleMessage('emailMessage', '');
                        } else {
                            // The email is already registered.
                            const message = 'This email is already registered';
                            handleMessage('emailMessage', message);
                        }
                    })
                    .catch(err => console.error(err));
            } else {
                handleMessage('emailMessage', 'Please enter a valid email.');
            }
        }
    }, [email]);


    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();

        let valid = true; // For some reason return statements werent working so this is a temp fix, will refactor later.
        
        // First make sure all the fields have been filled out.
        const requiredFields = [username, email, password, verifyPassword];
        for (let i = 0; i < requiredFields.length; i++) {
            const item = requiredFields[i];
            if (item === '') {
                const message = 'All fields must be filled out';
                handleMessage('submitMessage', message);
                return;
            }
        }

        // Then make sure the formatting is correct for all fields.
        const errorMessages = [usernameMessage, emailMessage, passwordMessage, verifyPasswordMessage];
        for (let i = 0; i < errorMessages.length; i++) {
            const item = errorMessages[i];
            if (item !== '') {
                const message = 'Please make sure all fields are formatted correctly.';
                handleMessage('submitMessage', message);
                return;
            }
        }

        // Format the data to be POSTed.
        const userData = { username, email, password };
        // Create the user.
        axios.post('/api/users/create', userData)
            .then(res => {
                const message = `Thanks for signing up ${username}! Please log in :)`;
                handleMessage('submitMessage', message);
            })
            .catch(err => console.error(err));
    }



    return (
        <Container>
            <h3>Create an account</h3>
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="username">Username</Label>
                <Input type="text" name="username" value={username} onChange={handleChange} />
                
                { usernameMessage === '' ? null : <p>{usernameMessage}</p>}

                <Label htmlFor="email">E-mail</Label>
                <Input type="email" name="email" value={email} onChange={handleChange} />

                { emailMessage === '' ? null : <p>{emailMessage}</p>}

                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" value={password} onChange={handleChange} />

                { passwordMessage === '' ? null : <p>{passwordMessage}</p>}

                <Label htmlFor="verifyPassword">Verify Password</Label>
                <Input type="password" name="verifyPassword" value={verifyPassword} onChange={handleChange}/>

                { verifyPasswordMessage === '' ? null : <p>{verifyPasswordMessage}</p>}

                <SignUpButton type="subimt">Create Account</SignUpButton>
                <HasAccountButton>Already Signed Up?</HasAccountButton>
                
                { submitMessage === '' ? null : <p>{submitMessage}</p>}
            </Form>
        </Container>
    );
}
