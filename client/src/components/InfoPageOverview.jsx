import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Utils
import { secondsToMinutes } from '../utils/time.js'; 
import { percentageCreator } from '../utils/strings.js';
// Children components
import Percentage from './Percentage.jsx';

// Styled
const Container = styled.div`
    display: flex;
    aling-items: center;
    justify-content: space-around;
    border: 2px solid #e64545;
    background-color: #1c1c1c;
    flex-direction: row;
    padding: 7px;
    border-radius: 7px;
    width: 95%;
    margin-top: 14px;
    margin-bottom: 14px;
`;

const LeftTextColumn = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-left: 15px;
`;

const RightTextColumn = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const MiddleSpacerColumn = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
`;

const PercentageColumn = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const Ul = styled.ul`
    list-style-type: square;
`;

const PercentageUl = styled.ul`
    list-style-type: none;
`;

export default function InfoPageOverview({ data }) {
    const { playerAverages, overallAverages, overallDifference } = data;

    return (
        <Container>
            <LeftTextColumn>
                <h3>Your Average</h3>
                <Ul>
                    <li>Gold left: {playerAverages.goldLeft}</li>
                    <li>Last Round: {playerAverages.lastRound}</li>
                    <li>Level: {playerAverages.level}</li>
                    <li>Players Eliminated: {playerAverages.playersEliminated}</li>
                    <li>Time Eliminated: {secondsToMinutes(playerAverages.timeEliminated)}</li>
                </Ul>
            </LeftTextColumn>
            
            <MiddleSpacerColumn>
                <h1>VS</h1>
            </MiddleSpacerColumn>

            <RightTextColumn>
                <h3>Peers Average</h3>
                <Ul>
                    <li>Gold left: {overallAverages.averageGoldLeft}</li>
                    <li>Last Round: {overallAverages.averageLastRound}</li>
                    <li>Level: {overallAverages.averageLevel}</li>
                    <li>Players Eliminated: {overallAverages.averagePlayersEliminated}</li>
                    <li>Time Eliminated: {secondsToMinutes(overallAverages.averageTimeEliminated)}</li>
                </Ul>
            </RightTextColumn>

            <MiddleSpacerColumn>
                <h1>=</h1>
            </MiddleSpacerColumn>

            <PercentageColumn>
                <h3>Difference</h3>
                <PercentageUl>
                    <Percentage percentObj={percentageCreator(overallDifference.goldLeft)} />
                    <Percentage percentObj={percentageCreator(overallDifference.lastRound)} />
                    <Percentage percentObj={percentageCreator(overallDifference.level)} />
                    <Percentage percentObj={percentageCreator(overallDifference.playersEliminated)} />
                    <Percentage percentObj={percentageCreator(overallDifference.timeEliminated)} />
                </PercentageUl>
            </PercentageColumn>
        </Container>
    );
}
