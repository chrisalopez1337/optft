import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    @media (max-width: 500px) {
        display: none;
    }
`;

const SearchBar = styled.input`
    background-color: #1c1c1c;
    color: whitesmoke;
    font-family: inherit;
    padding: 10px 0px 10px 15px;
    border-left: 2px solid #e64545;
    border-top: 2px solid #e64545;
    border-bottom: 2px solid #e64545;
    border-right: transparent;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    font-size: 20px;
    min-width: 400px;
    @media (max-width: 625px) {
        font-size: 16px;
        min-width: 250px;
        padding: 7px 0px 7px 10px;
    }
`;

const Select = styled.select`
    border-top: 2px solid #e64545;
    border-bottom: 2px solid #e64545;
    border-left: transparent;
    color: whitesmoke;
    padding: 10px 15px 10px 0px;
    font-family: inherit;
    font-size: 19px;
    background-color: #1c1c1c;
    @media (max-width: 625px) {
        font-size: 15.5px;
        padding: 7px 10px 7px 0px;
    }
`;

const SearchButton = styled.div`
    border-top: 2px solid #e64545;
    border-bottom: 2px solid #e64545;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    border-right: 2px solid #e64545;
    padding: 10px 15px 10px 15px;
    background-color: #e64545;
    color: whitesmoke;
    font-family: inherit;
    font-size: 20px;
    @media (max-width: 625px) {
        font-size: 16px;
        padding: 7px 10px 7px 10px;
    }
`;

export default function LandingSearch() {
    return (
        <Container>
            <SearchBar placeholder="Search for a summoner..."/>
            <Select>
                <option>NA</option>
                <option>EU</option>
            </Select>
            <SearchButton>Search</SearchButton>
        </Container>
    );
}
