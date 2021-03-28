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
    height: 275px;
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
    height: 250px;
    width: 600px;
    padding-left: 10px;
    padding-right: 10px;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;


export default function SummonerCard({ search, summoner, data }) {
    const [summonerIconId, setSummonerIconId] = useState('');
    useEffect(() => {
        if (summoner) {
            const { profileIconId } = summoner;
            const src = `http://ddragon.leagueoflegends.com/cdn/11.6.1/img/profileicon/${profileIconId}.png`;
            setSummonerIconId(src);
        }
    }, [summoner]);
    return (
        <Container>
            <Wrapper>
                <PortraitWrapper>
                    <Title>Scarra</Title>
                    <Portrait src={summonerIconId}/>
                </PortraitWrapper>

                <InfoWrapper>
                </InfoWrapper>
            </Wrapper>
        </Container>
    )
}
