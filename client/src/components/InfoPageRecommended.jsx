import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Utils
import RecommendHandler from '../utils/recommendHandler.js';

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

export default function InfoPageRecommended({ data }) {
    const { overallDifference } = data;
    const Handler = new RecommendHandler(overallDifference);
    const agroInfo = Handler.generateAgroArray();
    return (
        <Container>
            <h2>Our Recommendations</h2>
            <h3>Gold Limit</h3>
            <ul>
                <li>{Handler.generateGoldString()}</li>
            </ul>

            <h3>Durability</h3>
            <ul>
                { agroInfo.map(text => <li>{text}</li>)}
            </ul>
        </Container>
    );
}
