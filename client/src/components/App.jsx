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

// Styling
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // Store searched data
    const [searchedData, setSearchedData] = useState(null);
    // Function to query that data, and then set it.
    function searchAllInfo(summonerName) {
        axios.get(`/api/data/summoner/by-name/${summonerName}/all`)
            .then(({ data }) => {
                const Analyze = new DataAnalysis(data);
                const parsed = Analyze.getOverallAverage();
                setSearchedData(parsed);
            })
            .catch(console.log);
    }

    // Conditional rendering for landing page vs Info Page 
    const pageRender = searchedData
        ? (<InfoPage data={searchedData} />)
        : (<LandingPage search={searchAllInfo} />)

    return (
        <Container>
            <Header search={searchAllInfo} />
            {pageRender}
        </Container>
    );
};
