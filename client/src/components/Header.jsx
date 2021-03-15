// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    border-bottom: 2px solid #e64545;
    background-color: #1c1c1c;
`;

const Logo = styled.h2`
    margin-left: 7px;
    color: #e64545;
`;

export default function Header() {
    return (
        <Container>
            <Logo>optft.gg</Logo>
        </Container>
    );
}
