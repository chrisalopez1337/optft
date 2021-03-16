import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import LandingPageSignUp from './LandingPageSignUp.jsx';
import LandingPageInfo from './LandingPageInfo.jsx';

// styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
`;

export default function LandingPage() {
    return (
        <Container>
            <LandingPageInfo />
            <LandingPageSignUp />
        </Container>
    );
}
