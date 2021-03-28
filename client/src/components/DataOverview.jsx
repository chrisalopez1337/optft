import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Children components
import SummonerCard from './SummonerCard.jsx';
// Container
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export default function DataOverview({ setRenderView, data, summoner, search }) {
    return (
        <Container>
            <SummonerCard 
                data={data}
                summoner={summoner}
                search={search}
            />
        </Container>
    );
}
