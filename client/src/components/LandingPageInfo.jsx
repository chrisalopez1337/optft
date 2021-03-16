import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin: 15px;
    border: 2px solid #e64545;
    border-radius: 5px;
    padding: 15px;
    background-color: #1c1c1c;
    min-width: 400px;
    max-width: 400px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export default function LandingPageInfo() {
    return (
        <Container>
            <h3>What is optft.gg?</h3>
            <p> Optft.gg is a single page web application to analyze your last 20 TFT games and show your individual performance, and that versus your peersand then gives tips to improve your play!</p>
        </Container>
    );
}
