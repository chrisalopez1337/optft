import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row;
    @media (max-width: 542px) {
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
    cursor: pointer;
    @media (max-width: 625px) {
        font-size: 16px;
        padding: 7px 10px 7px 10px;
    }
`;

const Form = styled.form`
    display: inherit;
`;

export default function LandingSearch({ search }) {
    // Hold field data
    const [fields, setFields] = useState({ summonerName: '', region: 'NA'});
    const { summonerName, region } = fields;
    // Field handler
    function handleField(e) {
        const { target } = e;
        const { name, value } = target;
        setFields({ ...fields, [name]: value });
    }

    // Submit handler
    function handleSubmit(e) {
        e.preventDefault();
        search(summonerName);
    }

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <SearchBar placeholder="Search for a summoner..." name="summonerName" onChange={handleField} value={summonerName}/>
                <Select name="region" value={region} onChange={handleField}>
                    <option value="NA">NA</option>
                    <option>EU</option>
                </Select>
                <SearchButton type="submit">Search</SearchButton>
            </Form>
        </Container>
    );
}
