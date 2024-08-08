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

const LongCommonSub = () => {
    const [string1, setString1] = useState('');
    const [string2, setString2] = useState('');
    const numRows = 13;
    const numCols = 13;
    const [tableData, setTableData] = useState([]);

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
        </div>
    );
};

export default LongCommonSub;
