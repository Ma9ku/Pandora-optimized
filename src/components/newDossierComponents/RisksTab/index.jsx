import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { dossierURL } from '../../data/dossier';
import { useParams } from 'react-router-dom';

import ESF from './Blocks/ESF';
import ForcedTreatment from './Blocks/ForcedTreatment';
import Criminal from './Blocks/Criminal';
import MinZdrav from './Blocks/MinZdrav';
import Drugs from './Blocks/Drugs';
import NDS from './Blocks/NDS';
import RiskUL from './Blocks/RIskUL';
import Orphanage from './Blocks/Orphanage';
import Kartochki from './Blocks/Kartochki';
import Attend1D from './Blocks/Attend1D';
import OMN from './Blocks/OMN';
import Inactive from './Blocks/Inactive';
import Beneficiary from './Blocks/Beneficiary';
import Amoral from './Blocks/Amoral';
import PKB from './Blocks/PKB';
import Debt from './Blocks/Debt';
import Incompetent from './Blocks/Incompetent';
import Examination from './Blocks/Examination';
import Dismissed from './Blocks/Dismissed';
import Discipline from './Blocks/Discipline';
import Missing from './Blocks/Missing';
import Unemployed from './Blocks/Unemployed';
import Administrative from './Blocks/Administrative';

function RisksTab() {
    const { iin } = useParams();

    const [ isLoading, setLoading ] = useState(true);

    return ( 
        <>
            <ESF />
            <ForcedTreatment />
            <Criminal />
            <MinZdrav />
            <Drugs />
            <NDS />
            <RiskUL />
            <Orphanage />
            <Kartochki />
            <Attend1D />
            <OMN />
            <Inactive />
            <Beneficiary />
            <Amoral />
            <PKB />
            <Debt />
            <Incompetent />
            <Examination />
            <Dismissed />
            <Discipline />
            <Missing />
            <Unemployed />
            <Administrative />
        </>
    );
}

export default RisksTab;