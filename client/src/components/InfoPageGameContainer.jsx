import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ossia from '../../dist/assets/test.png';

// Styling
const Container = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    border: 2px solid #e64545;
    background-color: #140f0f;
    padding: 10px;
    border-radius: 7px;
    min-width: 800px;
    margin-top: 30px;
    transition-duration: 0.2s;
    &:hover {
        border: 2px solid whitesmoke;
        background-color: #402323;
    }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    flex-direction: row;
`;

const RankTypeAndInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 16px;
    flex-direction: column;
    margin-left: 10px;
`;

const WonPlacementText = styled.p`
    color: #10c20a;
`;

const Ossia = styled.img`
    width: 30%;
`;
Ossia.defaultProps = {
    src: ossia,
}


export default function InfoPageGameContainer() {
    return (
        <Container>
            <h3>9 Months ago</h3>
            <Row>
                <Ossia />

                <RankTypeAndInfo>
                    <p>Ranked TFT</p>
                    <WonPlacementText>1st place</WonPlacementText>
                </RankTypeAndInfo>
            </Row>
        </Container>
    );
}
