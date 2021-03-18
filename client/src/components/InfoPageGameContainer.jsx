import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
// Images
import ossia from '../../dist/assets/test.png';
import slayer from '../../dist/assets/slayer.png';
import filledStar from '../../dist/assets/filledstar.png'; 
import blankStar from '../../dist/assets/blankstar.png'; 
import yuumi from '../../dist/assets/yuumi.png';
import item from '../../dist/assets/item.png';

// Styling
const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid #e64545;
    background-color: #140f0f;
    padding: 10px;
    border-radius: 7px;
    width: 800px;
    margin-top: 30px;
    transition-duration: 0.2s;
    &:hover {
        border: 2px solid whitesmoke;
        background-color: #402323;
    }

    @media (max-width: 860px) {
        width: 600px;
    }

    @media (max-width: 665px) {
        width: 500px; 
    }

    @media (max-width: 542px) {
        width: 375px;
    }
`;


const RankTypeAndInfo = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: 16px;
    flex-direction: column;
    margin-left: 10px;
    @media (max-width: 860px) {
        font-size: 12px;
    }
    @media (max-width: 542px) {
        font-size: 14px;
    }
`;


const WonPlacementText = styled.p`
    color: #10c20a;
`;

const Ossia = styled.img`
    width: 15%;
    max-width: 15%;
    border: 1px solid whitesmoke;
    border-radius: 7px;
    @media (max-width: 860px) {
        width: 10%;
    }
    @media (max-width: 542px) {
        width: 25%;
    }
`;
Ossia.defaultProps = {
    src: ossia,
}

const TraitHolder = styled.div`
    display: flex;
    align-items: flex-start:
    justify-content: flex-start;
    flex-direction: row;
    margin-left: 15px;
`;

const TraitImage = styled.img`
    max-width: 15%;
    margin-left: 2px;
    margin-right: 2px;
`;
TraitImage.defaultProps = {
    src: slayer,
}


const TeamMemberHolder = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    margin-right: 4px;
    margin-left: 4px;
`;

const MemberStarsHolder = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-bottom: 2px;
`;

const FilledStar = styled.img`
    width: 30%;
`;
FilledStar.defaultProps = {
    src: filledStar,
}

const BlankStar = styled.img`
    width: 30%;
`;
BlankStar.defaultProps = {
    src: blankStar,
}

const ChampionImage = styled.img`
    width: 100%;
    border: 0.5px solid whitesmoke;
    border-radius: 7px;
`;
ChampionImage.defaultProps = {
    src: yuumi,
}

const ChampionItemHolder = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-top: 2px;
`;

const Item = styled.img`
    width: 30%;
    margin: 1px;
`;
Item.defaultProps = {
    src: item,
}

const Row = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-grow: 0;
`;

const Column = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column; 
`;

const TeamMembersContainer = styled.div`
    display: flex;
    align-items; center;
    justify-content: flex-start;
    flex-direction: row;
    max-width: 400px;
    @media (max-width: 860px) {
        max-width: 325px;
    }

    @media (max-width: 665px) {
        max-width: 275px;
    }

    @media (max-width: 542px) {
        display: none;
    }
`;

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

                    <TeamMembersContainer>
                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>
                        
                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>

                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>

                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>
                        
                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>

                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>
                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>
                        
                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>

                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>
                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>
                        
                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>

                    <TeamMemberHolder>
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <Column>
                            <ChampionImage />
                        </Column>

                        <ChampionItemHolder>
                            <Item />
                            <Item />
                            <Item />
                        </ChampionItemHolder>
                    </TeamMemberHolder>
                    </TeamMembersContainer>
                
            </Row>
        </Container>
    );
}
               /*  <Row>
                    <TeamMemberHolder>                    
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <ChampionImage />

                        <ChampionItemHolder>
                            <Item />               
                            <Item />               
                            <Item />               
                        </ChampionItemHolder>
                    </TeamMemberHolder>                    

                    <TeamMemberHolder>                    
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <ChampionImage />

                        <ChampionItemHolder>
                            <Item />               
                            <Item />               
                            <Item />               
                        </ChampionItemHolder>
                    </TeamMemberHolder>                    

                    <TeamMemberHolder>                    
                        <MemberStarsHolder>
                            <FilledStar />
                            <FilledStar />
                            <BlankStar />
                        </MemberStarsHolder>

                        <ChampionImage />

                        <ChampionItemHolder>
                            <Item />               
                            <Item />               
                            <Item />               
                        </ChampionItemHolder>
                    </TeamMemberHolder>                    


                </Row> */
