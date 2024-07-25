import React, { useState, useEffect } from 'react';
import './style.scss';
import PersonCard from './../../components/newDossierComponents/PersonCard';
import DocsCard from './../../components/newDossierComponents/DocsCard';
import InfoTabs from './../../components/newDossierComponents/InfoTabs';
import { useParams } from 'react-router-dom';
import DataProvider, { useData } from '../../context/dosieDataContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import { useTheme } from '../../context/themeContext';
import { PiFileDoc, PiFilePdf, PiFileXls } from 'react-icons/pi';
import IconButton from '../../components/newDossierComponents/UI/IconButton';
import axios from 'axios';
import { dossierURL } from '../../data/dossier';
import { IoCloseOutline } from 'react-icons/io5';

function DosiePage() {
    const { iin } = useParams();
    const { theme, setTheme } = useTheme();
    const { pIIN, pSetIIN } = useData();
    const [loading, isLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [tab, setTab] = useState(0);
    const [sameAddressFls, setSameAddressFls] = useState([])
    const [photo, setPhoto] = useState("")
    const userSession = JSON.parse(localStorage.getItem("user"))
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken

    useEffect(() => {
        pSetIIN(iin);
    }, [iin]);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        if (modalOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [modalOpen]);

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={`new-dosie-page ${theme}`}>
            <div className="change-theme-btn">
                {theme === 'dark' ? (
                    <FaSun onClick={() => setTheme('light')} />
                ) : (
                    <FaMoon onClick={() => setTheme('dark')} />
                )}
            </div>
            {modalOpen && (
                <div className="modal-overlay" onClick={handleModalClose}>
                
                    <div className="modal-photo-preview">
                        <div className='close-button'>
                            <a>X</a>
                        </div>
                        <img
                            id='myimage'
                            src={`data:image/png;base64, ${photo}`}
                            alt="PERSON"
                        />
                    </div>
                </div>
                )}
            <div className="row-info">
                <PersonCard setModalOpen={setModalOpen} setPhotoModal={setPhoto} setTab={setTab}/>
                <DocsCard />
            </div>
            <div className="row-info">
            <InfoTabs tab={tab} setTab={setTab} setSameAddressFls={setSameAddressFls}/>
            </div>
        </div>
    );
}



export default DosiePage;
