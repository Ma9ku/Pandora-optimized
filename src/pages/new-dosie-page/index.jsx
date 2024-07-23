import React, { useState, useEffect } from 'react';

import './style.scss';
import PersonCard from './../../components/newDossierComponents/PersonCard';
import DocsCard from './../../components/newDossierComponents/DocsCard';
import InfoTabs from './../../components/newDossierComponents/InfoTabs';
import { useParams } from 'react-router-dom';
import DataProvider, { useData } from '../../context/dosieDataContext';
import axios from 'axios';
import { dossierURL } from '../../data/dossier';
import { FaSun } from 'react-icons/fa6';

function DosiePage({

}) {
    const { iin } = useParams();
    const { pIIN, pSetIIN } = useData();
    const [loading, isLoading] = useState(true);

    const [theme, setTheme] = useState('dark')

    useEffect(() => {
        pSetIIN(iin);
    }, [iin])

    return ( 
        <div className={`new-dosie-page ${theme}`}>
            <div className="change-theme-btn">
                <FaSun onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}/>
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