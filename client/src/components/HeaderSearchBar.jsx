import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// Styling
const Container = styled.div`
    display: flex;
    margin-left: 10px;
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


export default function HeaderSearchBar() {
    return (
        <Container>
            <Input type="text" placeholder="Summoner Name..." />
            <Select>
                <option>NA</option>
                <option>EU</option>
            </Select>
        </Container>
    );
}
