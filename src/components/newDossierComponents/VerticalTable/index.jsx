import React, { useState, useEffect } from 'react';

import './style.scss';
import TableRow from '../TableRow';

function VerticalTable({
    twoColumn = true,
    data
}) {

    const [keys, setKeys] = useState([]);
    const [mid, setMid] = useState(0);

    useEffect(() => {
        setKeys(prev => {
            if (data === null) return [];
            if (typeof data !== 'object') return [];

            console.log('keys', Object.keys(data));
            return Object.keys(data);
        });

        if (twoColumn && typeof data === 'object' && Object.keys(data).length >= 2) {
            setMid(prev => {
                console.log('mid is', Math.ceil(Object.keys(data).length / 2));
                return Math.ceil(Object.keys(data).length / 2);
            });
        }

        if (twoColumn && typeof data === 'object' && Object.keys(data).length < 2) {
            console.log('mid is -1');
            setMid(-1);
        }
    }, [data]);

    if (twoColumn === false) {
        return (
            <div className="vertical-table">
                <div className="column">
                    <table>
                        <tbody>
                            {
                                keys.map((key, index) => {
                                    console.log(key);

                                    return (
                                        <TableRow
                                            key={index}
                                            label={key}
                                            value={data[key]}
                                        />
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    return ( 
        mid === -1
            ? (
                <div className="vertical-table">
                    <div className='column'>
                        <table>
                            <tbody>
                                <TableRow
                                    label={keys[0]}
                                    value={data[keys[0]]}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            )
            : (
                <div className="vertical-table">
                    <div className="column">
                        <table>
                            <tbody>
                                {
                                    keys.slice(0, mid).map((key, index) => {
                                        console.log(key);

                                        return (
                                            <TableRow
                                                key={index}
                                                label={key}
                                                value={data[key]}
                                            />
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <table>
                            <tbody>
                                {
                                    keys.slice(mid).map((key, index) => {
                                        console.log(key);

                                        return (
                                            <TableRow
                                                key={index}
                                                label={key}
                                                value={data[key]}
                                            />
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            )
    );
}

export default VerticalTable;