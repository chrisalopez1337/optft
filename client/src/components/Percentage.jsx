import React, { useState, useEffect } from 'react';

export default function Percentage({ percentObj }) {
    const { type, string } = percentObj;
    return (
        <>
            <li>{string}</li>
        </>
    );
}
