import { FaEye, FaEyeSlash } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './LongCommonSub.css';

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
    const numRows = 9;
    const numCols = 9;

    const [string1, setString1] = useState('');
    const [string2, setString2] = useState('');
    const [tableData, setTableData] = useState([]);
    const [correctTableData, setCorrectTableData] = useState([]);
    const [showAnswer, setShowAnswer] = useState(false);
    const [lcs, setLcs] = useState('');
    const [lcsLength, setLcsLength] = useState(0);
    const [userLcs, setUserLcs] = useState('');
    const [userLcsLength, setUserLcsLength] = useState('');
    const [verificationResult, setVerificationResult] = useState('');
    const [resultColor, setResultColor] = useState('');
    const [showAnswerColor, setShowAnswerColor] = useState('black');
    const [showAnswerButton, setShowAnswerButton] = useState(true);
    const [boxStyleOverride, setBoxStyleOverride] = useState('toggle-box');
    const [areCellsDisabled, setAreCellsDisabled] = useState(false);
    const [highlightedCells, setHighlightedCells] = useState([]);
    const [selectValues, setSelectValues] = useState(
        Array.from({ length: numRows }, () => Array(numCols).fill(null))
    );

    const generateNewStrings = () => {
        setString1(generateRandomString(7));
        setString2(generateRandomString(7));
        setVerificationResult('');
        setShowAnswer(false);
        setUserLcs('');
        setUserLcsLength('');
        setShowAnswerColor('black');
        setShowAnswerButton(true);
        setTableData([]);
        setCorrectTableData([]);
        setSelectValues(Array.from({ length: numRows }, () => Array(numCols).fill(null)));
        setHighlightedCells([]); 
    };

    useEffect(() => {
        generateNewStrings();
    }, []);

    useEffect(() => {
        if (string1 && string2) {
            const rows = [];
            const CorrectRows = [];
            const newSelectValues = Array.from({ length: numRows }, () => Array(numCols).fill(null));
    
            for (let i = 0; i < numRows; i++) {
                const cells = [];
                const correctCells = [];
                for (let j = 0; j < numCols; j++) {
                    if (i === 0 && j > 1) {
                        cells.push(string1[j - 2]);
                        correctCells.push(string1[j - 2]);
                    } else if (i === 1 && j > 0) {
                        cells.push(0);
                        correctCells.push(0);
                    } else if (i > 1 && j === 0) {
                        cells.push(string2[i - 2]);
                        correctCells.push(string2[i - 2]);
                    } else if (i > 0 && j === 1) {
                        cells.push(0);
                        correctCells.push(0);
                    } else {
                        cells.push('');
                        correctCells.push('');
                    }
                }
                rows.push(cells);
                CorrectRows.push(correctCells);
            }
    
            for (let row = 0; row < CorrectRows.length; row++) {
                for (let column = 0; column < CorrectRows[row].length; column++) {
                    if (row > 1 && column > 1) {
                        if (CorrectRows[0][column] === CorrectRows[row][0]) {
                            const num = CorrectRows[row - 1][column - 1] + 1;
                            CorrectRows[row][column] = num;
                            newSelectValues[row][column] = 'upleft';
                        } else {
                            const num1 = CorrectRows[row - 1][column];
                            const num2 = CorrectRows[row][column - 1];
                            const num = Math.max(num1, num2);
    
                            CorrectRows[row][column] = num;
    
                            if (num1 > num2) {
                                newSelectValues[row][column] = 'up';
                            } else if (num2 > num1) {
                                newSelectValues[row][column] = 'left';
                            } else {
                                newSelectValues[row][column] = 'up';
                            }
                        }
                    }
                }
            }
    
            setSelectValues(newSelectValues);
            setTableData(rows);
            setCorrectTableData(CorrectRows);
    
            const computedLcs = computeLCS(string1, string2);
            setLcs(computedLcs);
            setLcsLength(computedLcs.length);
        }
    }, [string1, string2, numRows, numCols]);    

    useEffect(() => {
        computeBackTrack();
    }, [selectValues, correctTableData]);

    useEffect(() => {
        const userLcsLengthInt = parseInt(userLcsLength, 10);
        if (userLcs === lcs && userLcsLengthInt === lcsLength) {
            setShowAnswerColor('green');
        } else {
            setShowAnswerColor('red');
        }
    }, [userLcs, userLcsLength, lcs, lcsLength]);

    const handleCellChange = (rowIndex, cellIndex, newValue) => {
        const updatedTableData = [...tableData];
        updatedTableData[rowIndex][cellIndex] = newValue;
        setTableData(updatedTableData);
    };

    const handleShowAnswer = () => {
        setShowAnswer(!showAnswer);
        setShowAnswerButton(false);
    };

    const handleVerifyAnswer = (e) => {
        e.preventDefault();
        const userLcsLengthInt = parseInt(userLcsLength, 10);
        if (userLcs === lcs && userLcsLengthInt === lcsLength) {
            setVerificationResult('Correct!');
            setResultColor('green');
        } else {
            setVerificationResult('Incorrect!');
            setResultColor('red');
        }
    };

    const computeBackTrack = () => {
        const highlightPath = [];
        let i = numRows - 1;
        let j = numCols - 1;
    
        if (numRows <= 2 || numCols <= 2) return;
    
        while (i > 1 && j > 1) {
            highlightPath.push([i, j]);
    
            if (selectValues[i][j] === 'upleft') {
                i--;
                j--;
            } else if (selectValues[i][j] === 'up') {
                i--;
            } else if (selectValues[i][j] === 'left') {
                j--;
            } else {
                break;
            }
        }
    
        setHighlightedCells(highlightPath);
    };    

    const toggleBox = () => {
        setBoxStyleOverride((prevStyle) => (prevStyle === '' ? 'toggle-box' : ''));
        setAreCellsDisabled((prevDisabled) => !prevDisabled);
    };

    return (
        <div className="container">
            <h2>Preparation for Quiz QLCS</h2>
            <h3>{string1} and {string2}</h3>
            <div className="button-container">
                <button className="styled-button" onClick={toggleBox}>
                    {boxStyleOverride === 'toggle-box' ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            <br />
            <table>
                <tbody>
                    {areCellsDisabled ? correctTableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cellValue, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    value={cellValue}
                                    onChange={handleCellChange}
                                    rowIndex={rowIndex}
                                    cellIndex={cellIndex}
                                    disabled={areCellsDisabled}
                                    selectValue={selectValues[rowIndex][cellIndex]}
                                    highlight={highlightedCells.some(([hRow, hCol]) => hRow === rowIndex && hCol === cellIndex)}
                                />
                            ))}
                        </tr>
                        )) 
                        : 
                        tableData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cellValue, cellIndex) => (
                                <Cell
                                    key={cellIndex}
                                    value={cellValue}
                                    onChange={handleCellChange}
                                    rowIndex={rowIndex}
                                    cellIndex={cellIndex}
                                    disabled={areCellsDisabled}
                                    selectValue={null}
                                />
                            ))}
                        </tr>
                        ))
                    }
                </tbody>
            </table>
            <br />
            {showAnswer && 
                <h3 style={{ color: showAnswerColor }}>
                    LCS: {lcs} | Length: {lcs.length}
                </h3>
            }
            <div className="styled-container">
                <button onClick={generateNewStrings} className='styled-button'>
                    Generate New
                </button>
                {showAnswerButton && 
                    <button onClick={handleShowAnswer} className='styled-button'>
                        Show Answer
                    </button>
                }
            </div>
            <form className="lcs-form" onSubmit={handleVerifyAnswer}>
                <h3>Verify your answer</h3>
                <div className="form-group">
                    <label>LCS:</label>
                    <input
                        type="text"
                        value={userLcs}
                        onChange={(e) => setUserLcs(e.target.value.toUpperCase())}
                    />
                </div>
                <div className="form-group">
                    <label>Length:</label>
                    <input
                        type="number"
                        value={userLcsLength}
                        onChange={(e) => setUserLcsLength(e.target.value)}
                        className=''
                        min='0'
                    />
                </div>
                <button type="submit" className='styled-button'>Submit</button>
                {verificationResult && <h3 style={{ color: resultColor }}>{verificationResult}</h3>}
            </form>
        </div>
    );
};

export default LongCommonSub;
