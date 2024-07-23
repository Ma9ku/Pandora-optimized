import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';
import { TfiIdBadge } from "react-icons/tfi";
import { FaLocationDot } from "react-icons/fa6";
import { RiMapPinTimeFill } from "react-icons/ri";

import TableRow from '../TableRow';

function DocsCard({
    _iin,
    secondary = false,
}) {
    const [passports, setPassports] = useState([]);
    const [transportDocs, setTransportDocs] = useState([]);
    const [iinDocs, setIinDocs] = useState([]);
    const [transports, setTransports] = useState([]);

    const iin = _iin ? _iin : 790303402568;

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (_iin) {
            setLoading(false);
            return;
        };

        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}getFirstRowByIin`, { params: { iin: iin } })
                .then(res => {
                    const { mvIinDocList, mvAutoFls } = res.data;

                    mvIinDocList.map(doc => {
                        if (doc.doc_type_ru_name === 'Водительское удостоверение') {
                            setTransportDocs(prev => [...prev, doc]);
                        } else {
                            setIinDocs(prev => [...prev, doc]);
                        }
                    });

                    setTransports([
                        ...mvAutoFls,
                        {
                            brand_model: 'Tayota',
                            series_reg_number: 'Camry',
                            reg_number: '111',
                            date_certificate: '111',
                            end_date: '111',
                        }
                    ]);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }

        if (iin) {
            fetchData();
        }
    }, [iin]);

    if (isLoading) {
        return <div className={`docs-card-block loading ${secondary ? 'secondary' : ''}`}>
            ...Loading
        </div>;
    }

    return (
        <div className={`docs-card-block ${secondary ? 'secondary' : ''}`}>
            <Block
                title_text={'УДОСТОВЕРЕНИЕ ЛИЧНОСТИ'}
                title_icon={<TfiIdBadge />}
                data={{
                    'Орган выдачи': 'МВД РК',
                    'Срок действия': '12/03/2030',
                    'Номер документа': '12324332',
                    'Дата выдачи': '12/03/2020'
                }}
            />

            <Block
                title_text={'ПАСПОРТ'}
                title_icon={<TfiIdBadge />}
                data={{
                    'Орган выдачи': 'МВД РК',
                    'Срок действия': '12/03/2030',
                    'Номер документа': '12324332',
                    'Дата выдачи': '12/03/2020'
                }}
            />

            <Block
                title_body={<>
                    <FaLocationDot />
                    <div className="title-text">АДРЕС ПРОПИСКИ</div>
                    <div className='text-button'>Регистрация ФЛ на одном адресе</div>
                </>}
                data={{
                    'Область/Город респуб. значения': 'Астана',
                    'Регион/Район': 'Есиль',
                    'Населенный пункт/Город': 'Астана',
                    'Дата регистрации прописки': '12/03/2020',
                    'Улица': 'Сарайшык',
                    'Дом': '10',
                    'Квартира': '65',
                    'Дата снятия с прописки': '12/03/2024'
                }}
            />

            <Block
                title_text={'АДРЕС ВРЕМЕННОЙ РЕГИСТРАЦИИ'}
                title_icon={<RiMapPinTimeFill />}
                data={{
                    'Область/Город респуб. значения': 'Астана',
                    'Регион/Район': 'Есиль',
                    'Населенный пункт/Город': 'Астана',
                    'Дата регистрации прописки': '12/03/2020',
                    'Улица': 'Сарайшык',
                    'Дом': '10',
                    'Квартира': '65',
                    'Дата снятия с прописки': '12/03/2024'
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

            console.log('keys', Object.keys(data));
            return Object.keys(data);
        });

        if (typeof data === 'object' && Object.keys(data).length >= 2) {
            setMid(prev => {
                console.log('mid is', Math.ceil(Object.keys(data).length / 2));
                return Math.ceil(Object.keys(data).length / 2);
            });
        }

        if (typeof data === 'object' && Object.keys(data).length < 2) {
            console.log('mid is -1');
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
            }
        </div>
    );
}

export default DocsCard;
