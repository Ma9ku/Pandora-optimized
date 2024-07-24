import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';
import { TfiIdBadge } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { RiMapPinTimeFill } from "react-icons/ri";

import TableRow from '../TableRow';
import { useTheme } from '../../../context/themeContext';

function UlDocsCard({
}) {
    const { theme } = useTheme();

    const [passports, setPassports] = useState([]);

    let { bin } = useParams();

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}cc`, { params: { bin: bin } })
                .then(res => {
                    console.log('docs', res.data);

                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }

        if (bin) {
            fetchData();
        }
    }, [bin]);

    if (isLoading) {
        return <div className={`docs-card-block loading`}>
            ...Loading
        </div>;
    }

    return (
        <div className={`docs-card-block ${theme}`}>

            <Block
                title_body={<>
                    <FaLocationDot />
                    <div className="title-text">АДРЕС ПРОПИСКИ</div>
                    <div className='text-button'>Регистрация ЮЛ на одном адресе</div>
                </>}
                data={{
                    'Область': 'Астана',
                    'Город': 'Есиль',
                    'Район': '12/03/2020',
                    'Улица': 'Сарайшык',
                    'Номер дома': '10',
                    'Номер помещения': '12/03/2024'
                }}
            />
        </div>
    );
}

const Block = ({ title_text, title_icon, title_body = null, data, body = null }) => {
    const [keys, setKeys] = useState([]);
    const [mid, setMid] = useState(0);

    useEffect(() => {
        setKeys(prev => {
            if (data === null) return [];
            if (typeof data !== 'object') return [];

            return Object.keys(data);
        });

        if (typeof data === 'object' && Object.keys(data).length >= 2) {
            setMid(prev => {
                return Math.ceil(Object.keys(data).length / 2);
            });
        }

        if (typeof data === 'object' && Object.keys(data).length < 2) {
            setMid(-1);
        }
    }, [data]);

    return (
        <div className="block">
            {
                title_body !== null
                    ? (
                        <div className="title">
                            {title_body}
                        </div>
                    )
                    : (
                        <div className='title'>
                            {title_icon}
                            <div className='title-text'>
                                {title_text}
                            </div>
                        </div>
                    )
            }
            {
                mid === -1
                    ? (
                        <div className="body">
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
                        <div className="body">
                            <div className="column">
                                <table>
                                    <tbody>
                                        {
                                            keys.slice(0, mid).map((key, index) => {

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
        </div>
    );
}

export default UlDocsCard;
