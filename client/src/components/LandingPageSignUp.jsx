import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    margin: 15px;
    border: 2px solid #e64545;
    border-radius: 5px;
    padding: 15px;
    background-color: #1c1c1c;
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
`;

const Label = styled.label`
    color: whitesmoke;
    font-weight: bold;
`;


export default function LandingPageSignUp() {
    return (
        <Container>
            <h3>Create an account</h3>
            <Form>
                <Label htmlFor="username">Username</Label>
                <Input type="text" name="username" />

                <Label htmlFor="email">E-mail</Label>
                <Input type="email" name="email" />

                <Label htmlFor="password">Password</Label>
                <Input type="password" name="password" />

                <Label htmlFor="passwordVerify">Verify Password</Label>
                <Input type="password" name="passwordVerify" />
            </Form>
        </Container>
    );
}
