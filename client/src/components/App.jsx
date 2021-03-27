// Dependencies
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { setOne, getOne, setOneWithTTL, getOneWithTTL, pruneExpired, deleteOne } from 'local-js';
// Utility functions
import DataAnalysis from '../utils/dataHandler.js';
// Children components
import Header from './Header.jsx';
import LandingPage from './LandingPage.jsx';
import InfoPage from './InfoPage.jsx';
import SignUp from './SignUp.jsx';
import LogIn from './LogIn.jsx';
import Recover from './Recover.jsx';
import RecoveryPasswordReset from './RecoveryPasswordReset.jsx';

// Styling
const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export default function App() {
    // Store logged in user data
    const [userData, setUserData] = useState(null);

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

    // Mount user on load
    useEffect(() => {
        const username = getOne('user');
        if (username) {
            setUserData(getUser(username.username));
            console.log(userData);
        }
    }, [])

    // Get user function
    function getUser(searchItem) {
        axios.get(`/api/users/${searchItem}`)
            .then(res => {
                if (res.data?.username) {
                    return res.data
                } else {
                    return false;
                }
            })
            .catch(console.log);
    }

    // Log in handler
    function logIn(userData) {
        persistUser(userData.username);
        setUserData(userData);
    }

    // Persist user
    function persistUser(username) {
        const data = { username };
        const key = 'user';
        const ttl = 604800; 
        setOneWithTTL(key, data, ttl);
    }
    // Log out handler
    function logOut() {
        const key = 'user';
        deleteOne(key);
        setUserData(null);
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
        ? <LogIn setRenderView={setRenderView} logIn={logIn}/>
        : renderView === 'recover'
        ? <Recover setRenderView={setRenderView} />
        : renderView === 'recover-password'
        ? <RecoveryPasswordReset setRenderView={setRenderView} />
        : <></>

    return (
        <Container>
            <Header search={searchAllInfo} setRenderView={setRenderView} />
            {pageRender}
        </Container>
    );
};
