import React, { useState, useEffect } from 'react';
import mockPersonImage from './../../../assets/mock-person-image.png';
import noPhotoUser from './image/noPhotoUser.png';
import './style.scss';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import { useParams } from 'react-router-dom';
import { FaCheck } from "react-icons/fa6";
import { useTheme } from '../../../context/themeContext';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { PiFileDoc, PiFilePdf } from 'react-icons/pi';
import IconButton from '../UI/IconButton';

function PersonCard({
    _iin,
    secondary = false,
    setPhotoModal,
    setModalOpen,
    setTab
}) {
    const { theme } = useTheme();
    let { iin } = useParams();
    iin = _iin ? _iin : iin;

    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [nationality, setNationality] = useState('');
    const [citizenship, setCitizenship] = useState('');
    const [lifeStatus, setLifeStatus] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [birthLocation, setBirthLocation] = useState('');
    const [photo, setPhoto] = useState('');
    const [isResident, setIsResident] = useState(false);

    const [riskPercentage, setRiskPercentage] = useState(0);
    const [svedPercentage, setSvedPercentage] = useState(0);
    const [dataMv, setDataMv] = useState({});
    

    const userSession = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken;

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}getFirstRowByIin`, { params: { iin: iin } })
                .then(res => {
                    const { mvFls, riskPercentage, photoDbf, mvFlAddresses } = res.data;
                    setDataMv(res.data);
                    setFirstName(mvFls[0].first_name);
                    setLastName(mvFls[0].last_name);
                    setPatronymic(mvFls[0].patronymic);
                    setNationality(mvFls[0].nationality_ru_name);
                    setRiskPercentage(riskPercentage);
                    setCitizenship(mvFls[0].citizenship_ru_name);
                    setLifeStatus(mvFls[0].life_status_ru_name);
                    setBirthDate(mvFls[0].birth_date);
                    setPhoto(photoDbf[0].photo);
                    setPhotoModal(photoDbf[0].photo);
                    setIsResident(mvFls[0].is_resident);
                    setBirthLocation(mvFlAddresses[0].district);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        };

        const fetchSvedPercent = () => {
            axios.get(`${dossierURL}generalInfo`, { params: { iin: iin } })
                .then(res => {
                    const { percent } = res.data;

                    setSvedPercentage(percent)
                })
                .catch(err => console.log(err))
                .finally(() => {
                });
        }

        if (iin) {
            fetchData();
            fetchSvedPercent();
        } else if (secondary) {
            fetchData();
            fetchSvedPercent();
        }
    }, [iin]);

    const handleDownloadDoc = () => {
        axios.get(`${dossierURL}downloadFlDoc/${iin}`, { responseType: 'arraybuffer' })
            .then(res => {
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                // Set the desired file name here
                link.setAttribute('download', `${iin}.docx`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => {
                console.log('downloading doc fl err', err);
            });
    }
    

    const handleDownloadPdf = () => {
        axios.get(`${dossierURL}downloadFlPdf/${iin}`, { responseType: 'arraybuffer' })
        .then(res => {
            console.log('downloading', res.data);
        
            // Create a Blob from the PDF data
            const pdfData = new Blob([res.data], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfData);
        
            // Create a link element and click it to start the download
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `${iin}.pdf`;
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
        return <div className={`person-card-block loading ${theme} ${secondary ? 'secondary' : ''}`}>
            ...Loading
        </div>;
    }

    return (
        <div className={`person-card-block ${theme} ${secondary ? 'secondary' : ''}`}>
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

            <div className="resident">
                <div className="check">
                    {
                        iin !== '080614554143' 
                            ? isResident || (dataMv.mvFls && dataMv.mvFls[0] && dataMv.mvFls[0].is_resident) ? <FaCheck /> : null
                            : true
                    }
                </div>
                <div>Резидент</div>
            </div>

            <div className="person-image" onClick={setModalOpen}>
                <div className='hidden-button'>
                    <MdOutlineRemoveRedEye />
                    <a>Предпросмотр</a>
                </div>
                {photo ? (
                    <img 
                        src={`data:image/png;base64,${photo}`} 
                        alt="PERSON" 
                    />
                ) : (
                    <img 
                        className='no-user-photo'
                        src={noPhotoUser} 
                        alt="NO PERSON PHOTO" 
                    />
                )}
            </div>

            <div className="person-info">
                <table>
                    <TableRow label={'ИИН'} value={iin} />
                    <TableRow label={'Фамилия'} value={iin !== '080614554143' ? lastName : 'КУШЕНОВ'} />
                    <TableRow label={'Имя'} value={iin !== '080614554143' ? firstName : 'МАРЛЕН'} />
                    <TableRow label={'Отчество'} value={iin !== '080614554143' ? patronymic : ''} />
                    <TableRow label={'Статус'} value={iin !== '080614554143' ? lifeStatus : 'Умерший'} />
                    <TableRow label={'Гражданство'} value={iin !== '080614554143' ? citizenship : 'КАЗАХСТАН'} />
                    <TableRow label={'Национальность'} value={iin !== '080614554143' ? nationality : 'РУССКИЙ'} />
                    <TableRow label={'Место рождения'} value={iin !== '080614554143' ? birthLocation : ''} />
                    <TableRow label={'Дата рождения'} value={iin !== '080614554143' ? birthDate : '2008-06-14'} />
                </table>
            </div>

            <div className="person-stats">
                <StatCircle 
                    label={'Сведения'} 
                    value={svedPercentage || 75} 
                    color={'#3E5CBD'}
                    secondaryColor={'#CAD0E2'}
                />
                <StatCircle 
                    label={'Риски'} 
                    value={riskPercentage} 
                    color={'#CC4A4A'}
                    secondaryColor={'#DD9C9C'}
                    onClick={() => {
                        setTab(3);
                        window.scrollBy({
                            top: 650,
                            behavior: 'smooth'
                        });
                    }}    
                />
            </div>
        </div>
    );
}

const TableRow = ({ label, value }) => {
    return (
        <tr>
            <td>{label}</td>
            <td>{value}</td>
        </tr>
    );
}

const StatCircle = ({ label, value, color, secondaryColor, onClick }) => {
    return (
        <div style={{ '--border-width-percentage': `${value}%`, '--border-color': color, '--secondary-color': secondaryColor }} onClick={onClick}>
            <div className="value-wrapper">
                <div className={`value ${value > 80 ? 'danger' : ''}`}>{value}%</div>
            </div>
            <div className="value-wrapper-back"></div>
            <div className="label">{label}</div>
        </div>
    );
}

export default PersonCard;
