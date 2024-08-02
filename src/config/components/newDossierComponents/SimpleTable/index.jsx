import React, { useState, useEffect } from 'react';

import './style.scss';
import { useTheme } from '../../../context/themeContext';
import { FaSort } from 'react-icons/fa6';

function SimpleTable({
    columns,
    rows,
    onRowClick = null,
    withSorting = false,
    sortingColumns = null
}) {

    const { theme } = useTheme();

    const [ sortedRows, setSortedRows ] = useState([]) 
    const [ sortingColumnIndex, setSortingColumnIndex ] = useState(-1)

    useEffect(() => {
        if (!withSorting || sortingColumnIndex === -1) {
            setSortedRows(rows);
            return;
        }

        const rowsCopy = [...rows];
        rowsCopy.sort((a, b) => {
            const valueA = a[sortingColumnIndex];
            const valueB = b[sortingColumnIndex];

            // Convert values to numbers if they are numeric
            const numA = Number(valueA);
            const numB = Number(valueB);

            if (!isNaN(numA) && !isNaN(numB)) {
                return numA - numB; // Sort numerically
            }

            // Otherwise, sort as strings
            return String(valueA).localeCompare(String(valueB));
        });

        setSortedRows(rowsCopy);
    }, [sortingColumnIndex, rows])    

    if (columns.lenght === 0) return null;

    return ( 
        <table className={`simple-table ${theme}`}>
            <thead>
                <tr>
                {
                    columns
                    ? columns.map((column, index) => {

                        if (typeof column === 'object') {
                            if (withSorting && column.sorting) {
                                return <th className={`${sortingColumnIndex === index ? 'sorting-column' : ''}`} align={column.align} key={index}>
                                    {column.value}
                                    <FaSort 
                                        style={{
                                            color: sortingColumnIndex === index 
                                                ? theme === 'dark'
                                                    ? 'white' 
                                                    : 'black'
                                                : theme === 'dark'
                                                    ? 'rgb(84, 84, 84)' 
                                                    : 'rgb(181, 181, 181)'
                                        }}
                                        onClick={() => setSortingColumnIndex(prev => {
                                            if (prev === index) return -1;
                                            return index;
                                        })}
                                    />
                                </th>
                            }

                            return <th align={column.align} key={index}>{column.value}</th>
                        }

                        return <th key={index}>{column}</th>

                    }) 
                    : null
                }
                </tr>
            </thead>
            <tbody>
            {
                sortedRows 
                ? sortedRows.map((row, r_index) => {
                    return <tr 
                        key={r_index}
                    >

                    {
                        row.map((columnRow, index) => {

                            const handleClick = () => {
                                if (onRowClick === null || onRowClick === undefined) return;
    
                                onRowClick({
                                    column_index: index,
                                    row_index: r_index,
                                    row_data: row
                                });
                            }

                            if (typeof columns[0] === 'object') {
                                return <td 
                                    align={columns[index].align} 
                                    key={index}
                                    onClick={handleClick}
                                >
                                    {columnRow}
                                </td>
                            }

                            return <td align='center' onClick={handleClick} key={index}>{columnRow}</td>
                        })
                    }

                    </tr>
                })
                : null
            }
            </tbody>
        </table>
    );
}

export default SimpleTable;