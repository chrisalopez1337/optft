import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    aling-items: center;
    justify-content: center;
    text-align: center;
    border: 2px solid #e64545;
    background-color: #1c1c1c;
    flex-direction: column;
    padding: 7px;
    border-radius: 7px;
    width: 95%;
    margin-top: 14px;
    margin-bottom: 14px;
`;

export default function InfoPageRecommended() {
    return (
        <Container>
            <h2>Our Recommendations</h2>
            <p>Due to your low [ x item ] we would recommend you play more [ x ]</p>
        </Container>
    );
}
