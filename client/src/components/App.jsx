// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import Header from './Header.jsx';

// Styling
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    return (
        <Container>
            <Header />
        </Container>
    );
};
