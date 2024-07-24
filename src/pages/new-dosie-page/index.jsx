import React, { useState, useEffect } from 'react';
import './style.scss';
import PersonCard from './../../components/newDossierComponents/PersonCard';
import DocsCard from './../../components/newDossierComponents/DocsCard';
import InfoTabs from './../../components/newDossierComponents/InfoTabs';
import { useParams } from 'react-router-dom';
import DataProvider, { useData } from '../../context/dosieDataContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import { useTheme } from '../../context/themeContext';
import { PiFilePdf, PiFileXls } from 'react-icons/pi';
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
    const [photo, setPhoto] = useState("")
    
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
        axios.get(`${dossierURL}downloadFlPdf/${iin}`)
            .then(res => {
                const pdfData = new Blob([res.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfData);

                // Create a link element and click it to start the download
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = `${iin}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => {
                console.log('downloading doc ul err', err)
            })
    }

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
                <div className="icon-buttons">
                    <IconButton 
                        onClick={handleDownloadDoc}
                        icon={<PiFileXls />}
                    />
                    <IconButton 
                        onClick={handleDownloadPdf}
                        icon={<PiFilePdf />}
                    />
                </div>
                <PersonCard setModalOpen={setModalOpen} setPhotoModal={setPhoto}/>
                <DocsCard />
            </div>
            <div className="row-info">
                <InfoTabs />
            </div>
        </div>
    );
}



export default DosiePage;
