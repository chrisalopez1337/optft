import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import InfoPageGeneralStats from './InfoPageGeneralStats.jsx';
import InfoPageGameContainer from './InfoPageGameContainer.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const Summoner = styled.h1`
    @media (max-width: 860px) {
        font-size: 22px;
    }

    @media (max-width: 665px) {
        font-size: 18px;
    }
`;

export default function InfoPage() {
    let testArray = [ 1, 2 ];
    return (
        <Container>
            <Summoner>Summoner Name</Summoner>
            <InfoPageGeneralStats />
            { testArray.map(number => <InfoPageGameContainer />)}        
        </Container>
    );
}
