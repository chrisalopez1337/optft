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
    width: 100%;
    justify-content: space-between;
    @media (max-width: 542px) {
        flex-direction: column;
    }
`;

const Logo = styled.h2`
    margin-left: 7px;
    color: #e64545;
`;

export default function Header({ search }) {
    return (
        <Container>
            <Logo>optft.gg</Logo>
            <HeaderSearchBar search={search} />
            <HeaderButtons />
        </Container>
    );
}
