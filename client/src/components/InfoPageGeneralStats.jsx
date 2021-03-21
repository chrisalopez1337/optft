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
    @media (max-width: 860px) {
        min-width: 600px;
    }

    @media (max-width: 665px) {
        min-width: 400px;
    }

    @media (max-width: 542px) {
        width: 300px;
    }
`;

export default function InfoPageGeneralStats({ data }) {
    return (
        <Container>
            <InfoPageOverview data={data} />
            <InfoPageRecommended data={data} />
        </Container>
    );
}
