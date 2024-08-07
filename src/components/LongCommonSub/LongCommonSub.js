import React, { useState, useEffect } from 'react';

const generateRandomString = (length) => {
    let result = '';
    const characters = 'AB';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const LongCommonSub = () => {
    const [string1, setString1] = useState('');
    const [string2, setString2] = useState('');

    useEffect(() => {
        setString1(generateRandomString(11));
        setString2(generateRandomString(11));
    }, []);

    return (
        <div>
            <h2>Preparation for Quiz QLCS</h2>
            <h3>{string1} and {string2}</h3>
        </div>
    );
};

export default LongCommonSub;
