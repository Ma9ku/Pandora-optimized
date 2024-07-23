import React from 'react';
import './style.css';

const Table = ({ data }) => {
    const parsedData = data
        .slice(1, -1)
        .split('},{')
        .map(entry => entry.replace(/[\{\}"]/g, '').split(','));

    const headers = ["Тип", "Место", "Страна", "Время"];

    return (
        <table className="excel-table">
            <thead>
                <tr>
                    {headers.map(header => (
                        <th key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {parsedData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
