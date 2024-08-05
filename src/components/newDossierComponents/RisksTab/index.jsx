import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Import the blocks
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
import OpgEntites from './Blocks/OpgEntites';
import Kuis from './Blocks/kuis';
import Sudispol from './Blocks/Sudispol';

function RisksTab({data}) {

    return (
        <>
            <ESF 
                data={data ? data.blockEsfs : []} 
            /> {/*completed */}

            {/* <ForcedTreatment data={data ? data.forcedTreatment : []} /> 
            нету */}

            <Criminal
                criminal={data && data.criminal ? data.criminal : []}
                convictsAbroad={data && data.convictsAbroads ? data.convictsAbroads : []} 
                convictsJustified={data && data.convictsJustifieds ? data.convictsJustifieds : []} 
                convictsTerminatedByRehab={data && data.convictsTerminatedByRehabs ? data.convictsTerminatedByRehabs : []} 
            />{/*completed */}
            <MinZdrav data={data ? data.mzEntities : []} />{/*completed */}
            <Drugs data={data ? data.drugAddicts : []} />

            <NDS data={data ? data.ndsEntities : []} />
            {/* null */}
            {/* <RiskUL data={data ? data.riskUL : []} />
            нету */}

            <Orphanage data={data ? data.orphans : []} /> {/*completed */}

            {/* <Kartochki data={data ? data.kartochki : []} />
            {/* нету */}
            {/* <Attend1D data={data ? data.attend1D : []} /> */}
            {/* нету */} 

            <OMN data={data ? data.omns : []} /> {/*completed */}
            <Inactive data={data ? data.dormants : []} /> {/*completed */}
            <Beneficiary data={data ? data.beneficiariesLists : []} /> {/*completed */}
            <Amoral data={data ? data.immoralLifestyles : []} />{/*null */}
            <PKB data={data ? data.firstCreditBureauEntities : []} />{/*completed */}

            <Debt data={data ? data.debt : []} />
            {/* нету */}

            <Incompetent data={data ? data.incapacitateds : []} /> {/*completed */}

            {/* <Examination data={data ? data.examination : []} />
            нету */}

            <Dismissed data={data ? data.dismissals : []} /> {/*completed */}

            <Discipline data={data ? data.discipline : []} />
            {/* нету */}

            <Missing data={data ? data.wantedListEntities : []} /> {/*completed */}

            <Unemployed data={data ? data.unemployeds : []} />
            {/* нету */}

            <Administrative data={data ? data.adms : []} /> {/*completed */}
            {/* <OpgEntites data={data ? data.adms : []} /> completed */}
            <Kuis data={data ? data.kuis : []} /> {/*completed */}

            <Sudispol data={data && data.sudispols ? data.sudispols : []}/>
        </>
    );
}

export default RisksTab;
