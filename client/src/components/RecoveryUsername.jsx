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

const Button = styled.button`
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

const Col = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
`;


export default function RecoveryUsername({ setRenderView }) {
    // Set current form they are on
    const [currentForm, setCurrentForm] = useState('enter');

    // Store message
    const [message, setMessage] = useState('');

    // Store username
    const [username, setUsername] = useState('');

    // Field Storage
    const [fields, setFields] = useState({ email: '', hash: '' });
    const { email, hash } = fields;
    // Field handler
    function handleField(e) {
        const { target } = e; 
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }



    // Submit handler for user entering the token
    function handleTokenRequest(e) {
        e.preventDefault();
        axios.post('/api/users/recovery/verify-hash', { hash, searchItem: email, hashType: 'usernameHash' })
            .then(({ data }) => {
                // update server response
                setMessage(data.message);
                // If it was verified continue the user
                if (data.match) {
                    setCurrentForm('complete');
                }
            })
            .catch(console.log);
    }

    // Email handler
    function handleEmailRequest(e) {
        e.preventDefault();
        if (email === '') {
            setMessage('Please enter an email.');
        }
        // First fetch userData and make sure that the email; is actually associated with an account.
        axios.get(`/api/users/${email}`)
            .then(({ data }) => {
                if(data) {
                    setUsername(data.username);
                    // Now send them the hash to their email.
                    axios.post('/api/users/recovery/send-recovery-email', { searchItem: email, hashType: 'usernameHash' })
                        .then(({ data }) => {
                            if (data) {
                                setMessage(data.message);
                                setCurrentForm('hash');
                            }
                        })
                        .catch(console.log);
                } else {
                    setMessage('Email is not associated with an account.');
                }
            })
            .catch(console.log);
    }

    // JSX Items
    const EnterFormJSX = 
        (
            <Form onSubmit={handleEmailRequest}>
                <Label htmlFor="searchItem">Email linked to your account</Label>
                <Input name="email" type="email" value={email} onChange={handleField} />
                
                <Button type="submit">Send recovery token</Button>
            </Form>
        );

    const EnterTokenJSX = 
        (
            <Form onSubmit={handleTokenRequest}>
                <Label htmlFor="hash">Enter Token</Label>
                <Input name="hash" type="text" value={hash} onChange={handleField} />
                
                <Button type="submit">Verify Token</Button>
            </Form>
        );


    const completeJSX = 
        (
            <Col>
                <h1>Your username is: {username}</h1>
                <Button onClick={() => setRenderView('log-in')}>Log In</Button>
            </Col>
        );

    // Conditional JSX rending
    const moduleRender = currentForm === 'enter'
        ? EnterFormJSX 
        : currentForm === 'hash'
        ? EnterTokenJSX
        : currentForm === 'complete'
        ? completeJSX
        : <></>;
    return (
        <Container>
            <h2>Recover Username</h2>
            { moduleRender }
            <p>{ message === '' ? null : message }</p>
        </Container>
    );
}
