import React, { useState, useEffect } from 'react';

import mockPersonImage from './../../../assets/mock-person-image.png'

import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';

import { FaCheck } from "react-icons/fa6";
import { useTheme } from '../../../context/themeContext';

function UlCard({
    _iin,
    secondary = false
}) {
    const { theme } = useTheme();

    let { bin } = useParams();

    const [ isLoading, setLoading ] = useState(true);
    const [ error, setError ] = useState('');

    const [ulName, setUlName] = useState('');
    const [ulStatus, setUlStatus] = useState('');
    const [reg_date, setRegDate] = useState('');
    
    const [riskPercentage, setriskPercentage] = useState(0);

    useEffect(() => {
        if (_iin) {
            setLoading(false)
            return;
        };
        
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}cc`, {params: { bin: bin }})
                .then(res => {
                    console.log(res.data)

                    setUlName();
                    setUlStatus();
                    setRegDate();
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                })
        }

        if (bin) {
            fetchData();
        }
    }, [bin])

    if (isLoading) {
        return <div className={`person-card-block loading ${secondary ? 'secondary' : ''}`}>
            ...Loading
        </div>
    }

    return ( 
        <div className={`person-card-block ${theme} ${secondary ? 'secondary' : ''}`}>

            <div className="person-info">
                <table>
                    <TableRow label={'БИН'} value={bin}/>
                    <TableRow label={'Наименование'} value={ulName} />
                    <TableRow label={'Статус'} value={ulStatus}/>
                    <TableRow label={'Дата регистрации'} value={reg_date}/>
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
                    value={riskPercentage} 
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

export default UlCard;