import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const Wrapper = styled.div`
    border: 1px solid #171616;
    background-color: #4f4b4b;
    box-shadow: 0px 0px 25px #171616;
    margin: 15px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 800px;
    min-height: 275px;

`;

const PortraitWrapper = styled.div`
    border: 0.5px solid #e64545;
    box-shadow: 0px 0px 15px #e64545;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1c1c1c;
`;

const Portrait = styled.img`
    width: 200px;
`;

const Title = styled.h1`
    font-size: 20px;
`;

const InfoWrapper = styled.div`
    border: 0.5px solid #e64545;
    box-shadow: 0px 0px 15px #e64545;
    margin: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #1c1c1c;
    width: 600px;
    padding-bottom: 20px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: flex-row;
`;

const PlayerInfoContainer = styled.div`
    border: 0.5px solid #0f75db;
    box-shadow: 0px 0px 5px #0f75db;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 250px;
    background-color: #4f4b4b;
    margin-right: 5px;
    margin-bottom: 10px;
`;

const PeerInfoContainer = styled.div`
    border: 0.5px solid #db940f;
    box-shadow: 0px 0px 5px #db940f;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    width: 250px;
    background-color: #4f4b4b;
    margin-left: 5px;
    margin-bottom: 10px;
`;

const ItemTitle = styled.h4`
    margin-left: 10px;
`;

const TitleHolderLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 250px;
    margin-right: 5px;
`;

const TitleHolderRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 250px;
    margin-left: 5px;
`;
const BlueTitle = styled.h4`
    color: #0f75db;
`;

const GoldTitle = styled.h4`
    color: #db940f;
`;

export default function SummonerCard({ search, summoner, data }) {
    console.log(data);
    // Summoner Image parser
    const [summonerIconId, setSummonerIconId] = useState('');
    useEffect(() => {
        if (summoner) {
            const { profileIconId } = summoner;
            const src = `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${profileIconId}.png`;
            setSummonerIconId(src);
        }
    }, [summoner]);

    // Parsing summonerData
    const [playerAverages, setPlayerAverages] = useState({ 
        damageToPlayers: '', 
        goldLeft: '', 
        lastRound: '', 
        level: '', 
        playerTraits: null, 
        playersEliminated: '', 
        timeEliminated: ''});
    return (
        <Container>
            <Wrapper>
                <PortraitWrapper>
                    <Title>Scarra</Title>
                    <Portrait src={summonerIconId}/>
                </PortraitWrapper>

                <InfoWrapper>
                    <Row>
                            <TitleHolderLeft>
                                <BlueTitle>Your Average</BlueTitle>
                            </TitleHolderLeft>

                            <TitleHolderRight>
                                <GoldTitle>Peers Average</GoldTitle>
                            </TitleHolderRight>
                    </Row>

                    <Row>
                        <PlayerInfoContainer>
                            <ItemTitle>Gold Left: {playerAverages.goldLeft}</ItemTitle>
                        </PlayerInfoContainer>
                        
                        <PeerInfoContainer>
                            <ItemTitle>Gold Left:</ItemTitle>
                        </PeerInfoContainer>
                    </Row>

                    <Row>
                        <PlayerInfoContainer>
                            <ItemTitle>Damage To Players: {playerAverages.damageToPlayers}</ItemTitle>
                        </PlayerInfoContainer>
                        
                        <PeerInfoContainer>
                            <ItemTitle>Damage To Players:</ItemTitle>
                        </PeerInfoContainer>
                    </Row>

                    <Row>
                        <PlayerInfoContainer>
                            <ItemTitle>Round Eliminated: {playerAverages.lastRound}</ItemTitle>
                        </PlayerInfoContainer>
                        
                        <PeerInfoContainer>
                            <ItemTitle>Round Eliminated:</ItemTitle>
                        </PeerInfoContainer>
                    </Row>

                    <Row>
                        <PlayerInfoContainer>
                            <ItemTitle>Level: {playerAverages.level}</ItemTitle>
                        </PlayerInfoContainer>
                        
                        <PeerInfoContainer>
                            <ItemTitle>Level:</ItemTitle>
                        </PeerInfoContainer>
                    </Row>

                    <Row>
                        <PlayerInfoContainer>
                            <ItemTitle>Players Eliminated: {playerAverages.playersEliminated}</ItemTitle>
                        </PlayerInfoContainer>
                        
                        <PeerInfoContainer>
                            <ItemTitle>Players Eliminated:</ItemTitle>
                        </PeerInfoContainer>
                    </Row>

                    <Row>
                        <PlayerInfoContainer>
                            <ItemTitle>Time Eliminated: {playerAverages.timeEliminated}</ItemTitle>
                        </PlayerInfoContainer>
                        
                        <PeerInfoContainer>
                            <ItemTitle>Time Eliminated:</ItemTitle>
                        </PeerInfoContainer>
                    </Row>
                </InfoWrapper>
            </Wrapper>
        </Container>
    )
}
