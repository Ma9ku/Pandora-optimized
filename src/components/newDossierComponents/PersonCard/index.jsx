import React, { useState, useEffect } from 'react';

import mockPersonImage from './../../../assets/mock-person-image.png'

import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';

import { FaCheck } from "react-icons/fa6";

function PersonCard({
    _iin,
    secondary = false
}) {
    // const { pIIN } = useData();
    // const { iin } = useParams();
    const iin = _iin ? _iin : "";

    const [ isLoading, setLoading ] = useState(true);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [nationality, setNationality] = useState('');

    const [riskPercentage, setriskPercentage] = useState(0);

    useEffect(() => {
        if (_iin) {
            setLoading(false)
            return;
        };
        
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}getFirstRowByIin`, {params: { iin: iin }})
                .then(res => {
                    console.log(res.data)

                    const { mvFls, riskPercentage } = res.data;
                    setFirstName(mvFls[0].first_name);
                    setLastName(mvFls[0].last_name);
                    setPatronymic(mvFls[0].patronymic);
                    setNationality(mvFls[0].nationality_ru_name);
                    setriskPercentage(riskPercentage);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                })
        }

        if (iin) {
            fetchData();
        }
    }, [iin])

    if (isLoading) {
        return <div className={`person-card-block loading ${secondary ? 'secondary' : ''}`}>
            ...Loading
        </div>
    }

    return ( 
        <div className={`person-card-block ${secondary ? 'secondary' : ''}`}>
            <div className="resident">
                <div className="check">
                    <FaCheck />
                </div>
                <div>Нерезидент</div>
            </div>

            <div className="person-image">
                <img 
                    src={
                        // `data:image/png;base64, ${data.photoDbf[0].photo}`
                        mockPersonImage
                    } 
                    alt="PERSON" />
            </div>

            <div className="person-info">
                <table>
                    <TableRow label={'ИИН'} value={iin}/>
                    <TableRow label={'Фамилия'} value={lastName} />
                    <TableRow label={'Имя'} value={firstName}/>
                    <TableRow label={'Отчество'} value={patronymic}/>
                    <TableRow label={'Статус'} value={'Ахмедия'}/>
                    <TableRow label={'Гражданство'} value={nationality}/>
                    <TableRow label={'Национальность'} value={nationality}/>
                    <TableRow label={'Место рождения'} value={'Ахмедия'}/>
                    <TableRow label={'Дата рождения'} value={'Ахмедия'}/>
                </table>
            </div>

            <div className="person-stats">
                <StatCircle 
                    label={'Сведения'} 
                    value={75} 
                    color={'#3E5CBD'}
                    secondaryColor={'#CAD0E2'}
                />
                <StatCircle 
                    label={'Риски'} 
                    value={65} 
                    color={'#CC4A4A'}
                    secondaryColor={'#DD9C9C'}
                />
            </div>
        </div>
    );
}

const TableRow = ({
    label, value
}) => {

    return <tr>
        <td>{label}</td>
        <td>{value}</td>
    </tr>
}

const StatCircle = ({
    label, value, color, secondaryColor
}) => {

    return (
        <div style={{ '--border-width-percentage': `${value}%`, '--border-color': color, '--secondary-color': secondaryColor }}>
            <div className="value-wrapper">
                <div className={`value ${value > 80 ? 'danger' : ''}`} >{value}%</div>
            </div>
            <div className="value-wrapper-back">
            </div>
            <div className="label">{label}</div>
        </div>
    )
}

export default PersonCard;