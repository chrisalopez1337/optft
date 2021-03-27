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


export default function RecoveryPasswordReset({ setRenderView }) {
    // Set current form they are on
    const [currentForm, setCurrentForm] = useState('enter');

    // Field Storage
    const [fields, setFields] = useState({ searchItem: '', hash: '', newPassword: '' });
    const { searchItem, hash, newPassword } = fields;
    // Field handler
    function handleField(e) {
        const { target } = e; 
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }

    // Password messaging
    const [pwdMessage, setPwdMessage] = useState('');

    // Form validation for password
    useEffect(() => {
        if (newPassword === '') {
            setPwdMessage('');
        } else {
            const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
            if (regex.test(newPassword)) {
                setPwdMessage('');
            } else {
                setPwdMessage('Password must be eight or more characters, contain atleast one uppercase, one symbol, and one lowercase.');
            }
        }
    }, [newPassword]);

    // Storage for response messaging and if the item worked or not
    const [serverResponse, setServerResponse] = useState({ updated: null, message: null });
    const { updated, message } = serverResponse;

    // Submit handler for the user requesting an email
    function handleEmailRequest(e) {
        e.preventDefault();
        if (searchItem === '') {
            setServerResponse({ updated: false, message: 'Please enter a username or email'});
        }
        // Attempt to update the users token and send the email
        axios.post('/api/users/recover/send-password-recovery', { searchItem })
            .then(({ data }) => {
                // update the server response
                setServerResponse(data);
                // If it was updated, move them to the next form
                if (data.updated) {
                    setCurrentForm('hash');
                }
            })
            .catch(console.log);
    }

    // Submit handler for user entering the token
    function handleTokenRequest(e) {
        e.preventDefault();
        axios.post('/api/users/recovery/verify-hash', { hash, searchItem })
            .then(({ data }) => {
                // update server response
                setServerResponse(data);
                // If it was verified continue the user
                if (data.match) {
                    setCurrentForm('newPassword');
                }
            })
            .catch(console.log);
    }

    function handlePasswordUpdate(e) {
        e.preventDefault();
        axios.post('/api/users/recovery/change-password', { searchItem, newPassword })
            .then(({ data }) => {
                console.log(data)
                // update server response
                setServerResponse(data);
                if (data.updated) {
                    setCurrentForm('complete');
                }
            })
            .catch(console.log)
    }

    // JSX Items
    const EnterFormJSX = 
        (
            <Form onSubmit={handleEmailRequest}>
                <Label htmlFor="searchItem">Username/Email</Label>
                <Input name="searchItem" type="text" value={searchItem} onChange={handleField} />
                
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

    const newPasswordJSX = 
        (
            <Form onSubmit={handlePasswordUpdate}>
                <Label htmlFor="newPassword">Enter New Password</Label>
                <Input name="newPassword" type="password" value={newPassword} onChange={handleField} />
                
                <Button type="submit">Update Password</Button>
                { pwdMessage === '' ? null : <p>{pwdMessage}</p> }
            </Form>
        );

    const completeJSX = 
        (
            <Col>
                <h1>{message}</h1>
                <Button onClick={() => setRenderView('log-in')}>Log In</Button>
            </Col>
        );

    // Conditional JSX rending
    const moduleRender = currentForm === 'enter'
        ? EnterFormJSX 
        : currentForm === 'hash'
        ? EnterTokenJSX
        : currentForm === 'newPassword'
        ? newPasswordJSX
        : currentForm === 'complete'
        ? completeJSX
        : <></>;
    return (
        <Container>
            <h2>Reset Password</h2>
            { moduleRender }
            <p>{ message === '' ? null : message !== '' && currentForm !== 'complete' ? message : null }</p>
        </Container>
    );
}
