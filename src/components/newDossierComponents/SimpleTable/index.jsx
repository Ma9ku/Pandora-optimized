import React, { useState, useEffect } from 'react';

import './style.scss';
import { useTheme } from '../../../context/themeContext';

function SimpleTable({
    columns,
    rows,
    onRowClick = null
}) {

    const { theme } = useTheme();

    if (columns.lenght === 0) return null;

    return ( 
        <table className={`simple-table ${theme}`}>
            <thead>
                <tr>
                {
                    columns
                    ? columns.map((column, index) => {

                        if (typeof column === 'object') {
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
                rows 
                ? rows.map((row, r_index) => {
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