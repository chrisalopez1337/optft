import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import InfoPageOverview from './InfoPageOverview.jsx';
import InfoPageRecommended from './InfoPageRecommended.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    border: 2px solid #e64545;
    border-radius: 7px;
    min-width: 800px;
    background-color: #140f0f;
`;

export default function InfoPageGeneralStats() {
    return (
        <Container>
            <InfoPageOverview />
            <InfoPageRecommended />
        </Container>
    );
}
