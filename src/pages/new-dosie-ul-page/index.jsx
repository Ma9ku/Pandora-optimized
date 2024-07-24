import React, { useState, useEffect } from 'react';
import './style.scss';
import { useParams } from 'react-router-dom';
import DataProvider, { useData } from '../../context/dosieDataContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import { useTheme } from '../../context/themeContext';
import { PiFileDoc, PiFilePdf, PiFileXls } from 'react-icons/pi';
import IconButton from '../../components/newDossierComponents/UI/IconButton';
import axios from 'axios';
import { dossierURL } from '../../data/dossier';
import UlCard from '../../components/newDossierComponents/UlCard';
import UlDocsCard from '../../components/newDossierComponents/UlDocsCard';
import UlInfoTabs from '../../components/newDossierComponents/UlInfoTabs';

function UlDosiePage() {
    const { bin } = useParams();
    const { theme, setTheme } = useTheme();

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
        axios.get(`${dossierURL}downloadUlPdf/${bin}`)
            .then(res => {
                const pdfData = new Blob([res.data], { type: 'application/pdf' });
                const pdfUrl = URL.createObjectURL(pdfData);

                // Create a link element and click it to start the download
                const link = document.createElement('a');
                link.href = pdfUrl;
                link.download = `${bin}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(err => {
                console.log('downloading doc ul err', err)
            })
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <div className={`new-dosie-page ${theme}`}>
            <div className="change-theme-btn">
                {theme === 'dark' ? (
                    <FaSun onClick={() => setTheme('light')} />
                ) : (
                    <FaMoon onClick={() => setTheme('dark')} />
                )}
            </div>
            <div className="row-info">
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
                <UlCard />
                <UlDocsCard />
            </div>
            <div className="row-info">
                <UlInfoTabs />
            </div>
        </div>
    );
}

export default UlDosiePage;
