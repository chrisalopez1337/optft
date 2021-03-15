// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children Components
import HeaderButtons from './HeaderButtons.jsx';
import HeaderSearchBar from './HeaderSearchBar.jsx';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid #e64545;
    background-color: #1c1c1c;
`;

const RightContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-right: 10px;
`;

const CenterContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const Logo = styled.h2`
    margin-left: 7px;
    color: #e64545;
`;

export default function Header() {
    return (
        <Container>
            <Logo>optft.gg</Logo>

            <CenterContainer>
                <HeaderSearchBar />
            </CenterContainer>
            
            <RightContainer>
                <HeaderButtons />
            </RightContainer>
        </Container>
    );
}
