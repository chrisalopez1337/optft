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
    margin-left: 15px;
    color: #e64545;
    cursor: pointer;
    transition-duration: 0.2s;
    &:hover {
        margin-left: 0px;
        color: whitesmoke;
    }
`;

export default function Header({ search, setRenderView }) {
    return (
        <Container>
            <Logo onClick={() => setRenderView('home')}>optft.gg</Logo>
            <HeaderSearchBar search={search} />
            <HeaderButtons setRenderView={setRenderView}/>
        </Container>
    );
}
