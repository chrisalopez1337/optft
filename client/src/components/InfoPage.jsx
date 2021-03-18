import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import InfoPageGeneralStats from './InfoPageGeneralStats.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default function InfoPage() {
    return (
        <Container>
            <h1>Summoner Name</h1>
            <InfoPageGeneralStats />
        </Container>
    );
}
