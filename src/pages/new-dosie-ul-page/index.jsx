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
