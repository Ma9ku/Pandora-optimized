import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';
import { TfiIdBadge } from "react-icons/tfi";
import { FaLocationDot, FaXmark } from "react-icons/fa6";
import { RiMapPinTimeFill } from "react-icons/ri";

import TableRow from '../TableRow';
import { useTheme } from '../../../context/themeContext';
import SimpleText from '../UI/Text';
import SameAddress from '../RisksTab/Blocks/SameAddress';
import ModalWindow from '../modalWindow';

function DocsCard({
    _iin = null,
    secondary = false,
    sameAddressFls = []
}) {
    const { theme } = useTheme();
    const [ addressModalOpen, setAddressModalOpen ] = useState(false);

    const [passports, setPassports] = useState([]);
    const [transportDocs, setTransportDocs] = useState([]);
    const [iinDocs, setIinDocs] = useState([]);
    const [transports, setTransports] = useState([]);
    const [addressesPerm, setAddressesPerm] = useState([])
    const [addressesTemp, setAddressesTemp] = useState([])

    let { iin } = useParams();
    iin = _iin ? _iin : iin;

    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (_iin) {
            setLoading(false);
            return;
        };

        console.log("iin on doc", iin)

        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}getFirstRowByIin`, { params: { iin: iin } })
                .then(res => {
                    console.log('docs', res.data);

<<<<<<< HEAD
                    const { mvIinDocList, mvFlAddresses, registrationTemps } = res.data;
=======
                    const { mvIinDocList, mvAutoFls, mvFlAddresses, registrationTemps } = res.data;
>>>>>>> 4c331df3535cd582753eef8ef3e18f6fb7f0452b

                    mvIinDocList.map(doc => {
                        if (doc.doc_type_ru_name === 'Паспорт') {
                            setPassports(prev => [...prev, doc]);
                        } else {
                            setIinDocs(prev => [...prev, doc]);
                        }
                    });
                    setAddressesPerm(mvFlAddresses)
                    setAddressesTemp(registrationTemps)
<<<<<<< HEAD
=======
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
>>>>>>> 4c331df3535cd582753eef8ef3e18f6fb7f0452b
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
        return <div className={`docs-card-block loading ${theme} ${secondary ? 'secondary' : ''}`}>
            ...Loading
        </div>;
    }

    return (
        <div className={`docs-card-block ${theme} ${secondary ? 'secondary' : ''}`}>
            {
                addressModalOpen ? (
                    <ModalWindow closer={setAddressModalOpen}>
                        <SameAddress iin={iin} data={sameAddressFls ? sameAddressFls : []} defaultOpen={true}/>
                    </ModalWindow>
                ) : null
            }

            { 
                iinDocs && iinDocs.length > 0 
                    ? (
                        <Block
                            title_text={'УДОСТОВЕРЕНИЕ ЛИЧНОСТИ'}
                            title_icon={<TfiIdBadge />}
                            data={{
                                'Орган выдачи': iinDocs[0].issue_organization_ru_name,
                                'Срок действия': iinDocs[0].expiry_date,
                                'Номер документа': iinDocs[0].doc_number,
                                'Дата выдачи': iinDocs[0].issue_date
                            }}
                        />
                    ) :  
                    <Block
                        title_text={'УДОСТОВЕРЕНИЕ ЛИЧНОСТИ'}
                        title_icon={<TfiIdBadge />}
                    />
            }

            {
                passports && passports.length > 0 
                    ? (
                        <Block
                            title_text={'ПАСПОРТ'}
                            title_icon={<TfiIdBadge />}
                            data={{
                                'Орган выдачи': passports[0].issue_organization_ru_name,
                                'Срок действия': passports[0].expiry_date,
                                'Номер документа': passports[0].doc_number,
                                'Дата выдачи': passports[0].issue_date,
                            }}
                        />
                    ) :  
                    <Block
                        title_text={'ПАСПОРТ'}
                        title_icon={<TfiIdBadge />}
                    />
            }

            {addressesPerm && addressesPerm.length > 0 ?
                <Block
                    title_body={<>
                        <FaLocationDot />
                        <div className="title-text">АДРЕС ПРОПИСКИ</div>
                        <div 
                            className='text-button'
                            onClick={() => {
                                setAddressModalOpen(true);
                            }}
                        >Регистрация ФЛ на одном адресе</div>
                    </>}
                    data={{
                        'Область/Город респуб. значения': addressesPerm[0].region || "---" ,
                        'Регион/Район': addressesPerm[0].district || "---" ,
                        'Населенный пункт/Город': addressesPerm[0].city || "---" ,
                        'Дата регистрации прописки': addressesPerm[0].addressDate.split(" ")[0] || "---" ,
                        'Улица': addressesPerm[0].street || "---" ,
                        'Дом': addressesPerm[0].building || "---" ,
                        'Квартира': addressesPerm[0].apartment_number || "---" ,
                        'Дата снятия с прописки': addressesPerm[0].addressEndDate?.split(" ")[0] || "---" 
                    }}
                /> : 
                <Block
                    title_body={<>
                        <FaLocationDot />
                        <div className="title-text">АДРЕС ПРОПИСКИ</div>
                        <div className='text-button'>Регистрация ФЛ на одном адресе</div>
                    </>}
                />
            }

            {addressesTemp && addressesTemp.length > 0 ? 
                <Block
                    title_text={'АДРЕС ВРЕМЕННОЙ РЕГИСТРАЦИИ'}
                    title_icon={<RiMapPinTimeFill />}
                    data={{
                        'Область/Город респуб. значения': addressesTemp[0].region || "---" ,
                        'Регион/Район': addressesTemp[0].district || "---" ,
                        'Населенный пункт/Город': addressesTemp[0].city || "---" ,
                        'Дата регистрации прописки': addressesTemp[0].beginDate || "---" ,
                        'Улица': addressesTemp[0].street || "---" ,
                        'Дом': addressesTemp[0].building || "---" ,
                        'Этаж': addressesTemp[0].flat || "---" ,
                        'Дата снятия с прописки': addressesTemp[0].endDate || "---" 
                    }}
                /> : 
                <Block
                title_text={'АДРЕС ВРЕМЕННОЙ РЕГИСТРАЦИИ'}
                title_icon={<RiMapPinTimeFill />}
            /> 
            } 
            
        </div>
    );
}

const Block = ({ title_text, title_icon, title_body = null, data = null, body = null }) => {
    const [keys, setKeys] = useState([]);
    const [mid, setMid] = useState(0);

    useEffect(() => {
        if (data == null) {
            setMid(-2)
        } else {
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
                    : 
                    mid == -2 ? 
                    <SimpleText >
                        Нет данных
                    </SimpleText>
                    :
                    (
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

export default DocsCard;
