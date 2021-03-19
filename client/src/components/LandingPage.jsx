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
    background-size: cover;
    height: 100vh;
    x-overflow: hidden;
    @media (max-width: 542px) {
        background-image: none;
        background-color: #2e2c2c;
        justify-content: flex-start;
    }
`;

const Logo = styled.h1`
    font-size: 48px;
    @media (max-width: 625px) {
        font-size: 36px;
    }
    @media (max-width: 542px) {
        display: none;        
    }
`;

const SpacingDiv = styled.div`
    min-height: 200px;
    @media (max-width: 542px) {
        display: none;        
    }
`;

const Ads = styled.div`
    background-color: #1c1c1c;
    border: 2px solid #e64545;
    border-radius: 7px;
    width: 728px;
    height: 90px;
    padding: 7px;
    margin-top: 50px;
    @media (max-width: 775px) {
        width: 320px;
        height: 100px;
    }
`;

export default function LandingPage({ search }) {
    return (
        <Container>
            <Logo>optft.gg</Logo>
            <LandingSearch search={search}/>
            <Ads>Advertisement</Ads>
            <SpacingDiv></SpacingDiv>
        </Container>
    );
}
