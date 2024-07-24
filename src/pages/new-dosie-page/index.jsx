import React, { useState, useEffect } from 'react';
import './style.scss';
import PersonCard from './../../components/newDossierComponents/PersonCard';
import DocsCard from './../../components/newDossierComponents/DocsCard';
import InfoTabs from './../../components/newDossierComponents/InfoTabs';
import { useParams } from 'react-router-dom';
import DataProvider, { useData } from '../../context/dosieDataContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import { useTheme } from '../../context/themeContext';

function DosiePage() {
    const { iin } = useParams();
    const { theme, setTheme } = useTheme();
    const { pIIN, pSetIIN } = useData();
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        pSetIIN(iin);
    }, [iin]);

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
                <PersonCard />
                <DocsCard />
            </div>
            <div className="row-info">
                <InfoTabs />
            </div>
        </div>
    );
}

export default DosiePage;
