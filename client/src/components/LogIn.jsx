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

export default function LogIn() {
    return (
        <Container>
            <h3>Sign In</h3>
            <Form>
                <Label htmlFor="username">Username/Email</Label>
                <Input type="text" name="username" />

                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" />

                <SignUpButton>Sign In</SignUpButton>
                <HasAccountButton>Recover Account</HasAccountButton>
            </Form>
        </Container>
    );
}
