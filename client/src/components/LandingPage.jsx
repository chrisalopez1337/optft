import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import LandingPageSignUp from './LandingPageSignUp.jsx';
import LandingPageInfo from './LandingPageInfo.jsx';

import image from '../../dist/assets/background.jpg';

// styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    background-image: url(${image});
    height: 92.5vh;
    x-overflow: hidden;
`;

export default function LandingPage() {
    return (
        <Container>
        </Container>
    );
}
