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

export default function RecoveryPasswordReset({ setRenderView }) {
    // Set current form they are on
    const [currentForm, setCurrentForm] = useState('enter');

    // Field Storage
    const [fields, setFields] = useState({ searchItem: '', hash: '', newPassword: '' });
    const { searchItem, hash, newPassword } = req.body;
    // Field handler
    function handleField(e) {
        const { target } = e; 
        const { name, value } = target;
        setFields({...fields, [name]: value});
    }

    // Storage for response messaging and if the item worked or not
    const [serverResponse, setServerResponse] = useState({ updated: null, message: null });

    // Submit handler for the user requesting an email
    function handleEmailRequest(e) {
        e.preventDefault();
    }

    // JSX Items
    const EnterFormJSX = 
        (
            <Form>
                <Label htmlFor="searchItem">Username/Email</Label>
                <Input name="searchItem" type="text" value={searchItem} onChange={handleField} />
                
                <Button type="submit">Send recovery token</Button>
            </Form>
        );

    const EnterTokenJSX = 
        (
            <Form>
                <Label htmlFor="searchItem">Enter Token</Label>
                <Input name="searchItem" type="text" />
                
                <Button type="submit">Send recovery token</Button>
            </Form>
        );

    // Conditional JSX rending
    const moduleRender = currentForm === 'enter'
        ? EnterFormJSX 
        : <></>;
    return (
        <Container>
            <h2>Reset Password</h2>
            { moduleRender }
        </Container>
    );
}
