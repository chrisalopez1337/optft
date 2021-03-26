// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Utility functions
import DataAnalysis from '../utils/dataHandler.js';
// Children components
import Header from './Header.jsx';
import LandingPage from './LandingPage.jsx';
import InfoPage from './InfoPage.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';

// Styling
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // Store general data
    const [summoner, setSummoner] = useState(null);

    // Store current render view
    const [renderView, setRenderView] = useState('home');


    // Summoner handler
    function parseSummoner(data) {
        const { summonerName } = data; // Will parse our more later
        const summoner = { summonerName };
        setSummoner(summoner);
    }

    // Store searched data
    const [searchedData, setSearchedData] = useState(null);
    // Function to query that data, and then set it.
    function searchAllInfo(summonerName) {
        axios.get(`/api/data/summoner/by-name/${summonerName}/all`)
            .then(({ data }) => {
                parseSummoner(data);
                const Analyze = new DataAnalysis(data);
                const parsed = Analyze.getOverallAverage();
                setSearchedData(parsed);
                setRenderView('info-page');
            })
            .catch(console.log);
    }

    // Conditional rendering
    const pageRender = renderView === 'home'
        ? <LandingPage search={searchAllInfo} setRenderView={setRenderView}/>
        : renderView === 'info-page'
        ? <InfoPage data={searchedData} summoner={summoner} setRenderView={setRenderView}/>
        : renderView === 'sign-up'
        ? <SignUp setRenderView={setRenderView} />
        : renderView === 'log-in'
        ? <LogIn setRenderView={setRenderView} />
        : <></>

    return (
        <Container>
            <Header search={searchAllInfo} setRenderView={setRenderView} />
            {pageRender}
        </Container>
    );
};
