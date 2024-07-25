import React, { useState, useEffect } from 'react';

import mockPersonImage from './../../../assets/mock-person-image.png'

import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';

import { FaCheck } from "react-icons/fa6";
import { useTheme } from '../../../context/themeContext';
import IconButton from '../UI/IconButton';
import { PiFileDoc, PiFilePdf } from 'react-icons/pi';

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
    const userSession = JSON.parse(localStorage.getItem("user"))
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken

    useEffect(() => {
        if (_iin) {
            setLoading(false)
            return;
        };
        
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}ulCard`, {params: { bin: bin }})
                .then(res => {
                    console.log("cc", res.data)
                    
                    setUlName(res.data?.name);
                    setUlStatus(res.data?.status);
                    setRegDate(res.data?.regDate);
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

    const handleDownloadDoc = () => {
        axios.get(`${dossierURL}downloadUlDoc/${bin}`, { responseType: 'arraybuffer' })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                // Set the desired file name here
                link.setAttribute('download', `${bin}.docx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => {
                console.log('downloading doc fl err', err);
            });
    }
    
    const handleDownloadPdf = () => {
        axios.get(`${dossierURL}downloadUlPdf/${bin}`, { responseType: 'arraybuffer' })
        .then(res => {
            console.log('downloading', res.data);
        
            // Create a Blob from the PDF data
            const pdfData = new Blob([res.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfData);
        
            // Create a link element and click it to start the download
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${bin}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        
            // Release the object URL after the download
            URL.revokeObjectURL(pdfUrl);
            
        })
        .catch(err => {
            console.log('Error downloading the PDF', err);
        });
    }

    if (isLoading) {
        return <div className={`person-card-block loading ${secondary ? 'secondary' : ''}`}>
            ...Loading
        </div>
    }

    return ( 
        <div className={`ul-card-block ${theme} ${secondary ? 'secondary' : ''}`}>
            <div className="icon-buttons">
                <IconButton 
                    onClick={handleDownloadDoc}
                    icon={<PiFileDoc />}
                />
                <IconButton 
                    onClick={handleDownloadPdf}
                    icon={<PiFilePdf />}
                />
            </div>
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