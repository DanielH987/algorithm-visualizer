import React, { useState, useEffect } from 'react';
import './LongCommonSub.css';
import Cell from './Cell';

const generateRandomString = (length) => {
    let result = '';
    const characters = 'AB';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

const computeLCS = (string1, string2) => {
    const m = string1.length;
    const n = string2.length;
    const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (string1[i - 1] === string2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    let lcs = '';
    let i = m, j = n;
    while (i > 0 && j > 0) {
        if (string1[i - 1] === string2[j - 1]) {
            lcs = string1[i - 1] + lcs;
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }

    return lcs;
};

const LongCommonSub = () => {
    const [string1, setString1] = useState('');
    const [string2, setString2] = useState('');
    const [tableData, setTableData] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);

    const numRows = 13;
    const numCols = 13;

    useEffect(() => {
        setString1(generateRandomString(11));
        setString2(generateRandomString(11));
    }, []);

    useEffect(() => {
        if (string1 && string2) {
            const rows = [];
            for (let i = 0; i < numRows; i++) {
                const cells = [];
                for (let j = 0; j < numCols; j++) {
                    if (i === 0 && j > 1) {
                        cells.push(string1[j - 2]);
                    } else if (i === 1 && j > 0) {
                        cells.push(0);
                    } else if (i > 1 && j === 0) {
                        cells.push(string2[i - 2]);
                    } else if (i > 0 && j === 1) {
                        cells.push(0);
                    } else {
                        cells.push('');
                    }
                }
                rows.push(cells);
            }
            setTableData(rows);
        }
    }, [string1, string2, numRows, numCols]);

    const handleCellChange = (rowIndex, cellIndex, newValue) => {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][cellIndex] = newValue;
        setTableData(updatedTableData);
    };

    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const lcs = computeLCS(string1, string2);

    return (
        <div className="container">
            <h2>Preparation for Quiz QLCS</h2>
            <h3>{string1} and {string2}</h3>
            <table>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cellValue, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    value={cellValue}
                                    onChange={handleCellChange}
                                    rowIndex={rowIndex}
                                    cellIndex={cellIndex}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <br />
            <button onClick={handleShowAnswer} className='styled-button'>
                {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && <h3>The Longest Common Subsequence is: {lcs}</h3>}
        </div>
    );
};

export default LongCommonSub;
