// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    @media (max-width: 542px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const Button = styled.button`
    border: 2px solid #e64545;
    cursor: pointer;
    margin-right: 5px;
    margin-left: 5px;
    font-family: inherit;
    padding: 7px;
    font-size: 16px;
    transition-duration: 0.2s;
    color: whitesmoke;
    font-weight: bold;
    background-color: transparent;
    border-radius: 7px;
    &:hover {
        background-color: #e64545;
        border: 2px solid whitesmoke;
    }
`;

export default function HeaderButtons({ setRenderView }) {
    return (
        <Container>
            <Button onClick={() => setRenderView('sign-up')}>Sign Up</Button>
            <Button onClick={() => setRenderView('log-in')}>Log In</Button>
        </Container>
    );
}
