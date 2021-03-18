import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Images
import ossia from '../../dist/assets/test.png';
import slayer from '../../dist/assets/slayer.png';
import filledStar from '../../dist/assets/filledstar.png'; 
import blankStar from '../../dist/assets/blankstar.png'; 

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
    max-width: 800px;
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
    width: 15%;
    max-width: 15%;
`;
Ossia.defaultProps = {
    src: ossia,
}

const TraitHolder = styled.div`
    display: flex;
    align-items: flex-start:
    justify-content: flex-start;
    margin-left: 15px;
    flex-direction: row;
`;

const TraitImage = styled.img`
    max-width:10%;
    margin-left: 2px;
    margin-right: 2px;
`;
TraitImage.defaultProps = {
    src: slayer,
}

const TeamInfoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: row;
`;

const TeamMemberHolder = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
`;

const MemberStarsHolder = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
`;

const FilledStar = styled.img`
    width: 5%;
`;
FilledStar.defaultProps = {
    src: filledStar,
}

const BlankStar = styled.img`
    width: 5%;
`;
BlankStar.defaultProps = {
    src: blankStar,
}

const ChampionImage = styled.img`
    width: 10%;
`;
ChamnpionImage.defaultProps = {
    src: yuumi,
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

                <TraitHolder>
                    <TraitImage />
                    <TraitImage />
                    <TraitImage />
                    <TraitImage />
                    <TraitImage />
                </TraitHolder>

                <TeamInfoContainer>
                    <TeamMemberHolder>                    
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>
                    </TeamMemberHolder>                    
                </TeamInfoContainer>
            </Row>
        </Container>
    );
}
