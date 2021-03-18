import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    border: 2px solid #e64545;
    background-color: #140f0f;
    padding: 10px;
    border-radius: 7px;
    min-width: 800px;
    margin-top: 30px;
    transition-duration: 0.2s;
    &:hover {
        border: 2px solid whitesmoke;
        background-color: #ff4d4d;
    }
`;

export default function InfoPageGameContainer() {
    return (
        <Container>
            <h1>Game # Info</h1>
        </Container>
    );
}
