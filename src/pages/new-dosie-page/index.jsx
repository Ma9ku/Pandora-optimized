import React, { useState, useEffect } from 'react';
import './style.scss';
import PersonCard from './../../components/newDossierComponents/PersonCard';
import DocsCard from './../../components/newDossierComponents/DocsCard';
import InfoTabs from './../../components/newDossierComponents/InfoTabs';
import { useParams } from 'react-router-dom';
import DataProvider, { useData } from '../../context/dosieDataContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import { useTheme } from '../../context/themeContext';
import { IoCloseOutline } from 'react-icons/io5';

function DosiePage() {
    const { iin } = useParams();
    const { theme, setTheme } = useTheme();
    const { pIIN, pSetIIN } = useData();
    const [loading, isLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const [photo, setPhoto] = useState("")

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
                <PersonCard setPhotoModal={setPhoto} setModalOpen={setModalOpen}/>
                <DocsCard />
            </div>
            <div className="row-info">
                <InfoTabs />
            </div>
        </div>
    );
}



export default DosiePage;
