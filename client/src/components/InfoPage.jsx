import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
`;

export default function InfoPage() {
    return (
        <Container>
            <h1>Info Page</h1>
        </Container>
    );
}
