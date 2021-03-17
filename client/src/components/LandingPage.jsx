import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import LandingSearch from './LandingSearch.jsx';
import LandingPageSignUp from './LandingPageSignUp.jsx';

import image from '../../dist/assets/background.jpg';

// styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    background-image: url(${image});
    height: 92.5vh;
    x-overflow: hidden;
`;

const SpacingDiv = styled.div`
    min-height: 200px;
`;

export default function LandingPage() {
    return (
        <Container>
            <h1>optft.gg</h1>
            <LandingSearch />
            <SpacingDiv></SpacingDiv>
        </Container>
    );
}
