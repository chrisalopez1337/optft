import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    margin-left: 10px;
    @media (max-width: 542px) {
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const Form = styled.form`
    display: inherit;
`;

const Input = styled.input`
    border-left: 2px solid #e64545;
    border-top: 2px solid #e64545;
    border-bottom: 2px solid #e64545;
    border-right: transparent;
    color: whitesmoke;
    padding: 7px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    font-family: inherit;
    font-size: 14px;
    background-color: transparent;
    width: 300px;
    @media (max-width: 670px) {
        width: 100%;
    }
`;

const Select = styled.select`
    border-right: 2px solid #e64545;
    border-top: 2px solid #e64545;
    border-bottom: 2px solid #e64545;
    border-left: transparent;
    color: whitesmoke;
    padding: 7px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    font-family: inherit;
    font-size: 14px;
    background-color: transparent;
`;


export default function HeaderSearchBar({ search }) {
    // Hold fields values
    const [fields, setFields] = useState({ summonerName: '', region: 'NA' });
    const { summonerName, region } = fields;
    // Handler to set fields
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
                <Input type="text" placeholder="Summoner Name..." name="summonerName" value={summonerName} onChange={handleField}/>
                <Select value={region} onChange={handleField} name="region">
                    <option value="NA">NA</option>
                    <option>EU</option>
                </Select>
            </Form>
        </Container>
    );
}
