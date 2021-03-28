import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
`;

const InnerWrapper = styled.div`
    width: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    @media (max-width: 545px) {
        max-width: 350px;
    }
    @media (max-width: 400px) {
        max-width: 250px;
    }
`;

const RecoverDiv = styled.div`
    border: 2px solid #e64545;
    border-radius: 7px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1c1c1c;
    transition-duration: 0.3s;
    margin: 10px;
    cursor: points;
    min-width: 200px;
    width: inherit;
    &:hover {
        border: 2px solid whitesmoke;
        background-color: whitesmoke;
        color: #e64545;
    }
`;

export default function Recover({ setRenderView }) {
    return (
        <Container>
            <InnerWrapper>
                <h1>Recover</h1>
                <RecoverDiv onClick={() => setRenderView('recover-password')}>
                    <h2> Forgot Password </h2>
                </RecoverDiv>

                <RecoverDiv>
                    <h2> Forgot Email </h2>
                </RecoverDiv>

                <RecoverDiv onClick={() => setRenderView('recover-username')}>
                    <h2> Forgot Username </h2>
                </RecoverDiv>
            </InnerWrapper>
        </Container>
    );
}

// We want this component to sent an Auth token to an email, and then if the token matchs return the users username.
