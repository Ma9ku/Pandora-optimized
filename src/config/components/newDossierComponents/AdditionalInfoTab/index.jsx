import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import '../spinner.scss'
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';
import Education from './Blocks/Education';
import Buildings from './Blocks/Buildings';
import Transport from './Blocks/Transport';
import Equipment from './Blocks/Equipment';
import OtherTransport from './Blocks/OtherTransport';
import Military from './Blocks/Military';
import FlUl from './Blocks/FlUL';
import Ipkh from './Blocks/Ipkh';
import Pension from './Blocks/Pension';
import CommodityProducers from './Blocks/CommodityProducers';

function AdditionalInfoTab({data}) {

    let { iin } = useParams()
    
    return ( 
        <>
            <Education 
                data={{
                    schools: data ? data.schools : [],
                    universities: data ? data.universities : []
                }}
            />

            <Buildings 
                data={data ? data.mvRnOlds : []}
            />

            {/* mvAutoFls */}
            <Transport data={data.autoTransports || []}/>

            <OtherTransport 
                trains={data ? data.trains : []}
                aviaTransport={data ? data.aviaTransport : []}
                waterTransports={data ? data.waterTransports : []}
            />

            <Equipment data={data.equipment || []}/>

            <Military data={data.militaryAccounting2Entities || []}/>

            <FlUl data={data.mvUlFounderFls || []}/>

            <Pension data={data.pensionsGrouped || []} iin={iin}/>

            <Ipkh 
                dataIp={data.individualEntrepreneurs || []}
                dataKh={data.kxes || []}
            />

            <CommodityProducers data={data.commodityProducers || []}/>
        </>
    );
}

export default AdditionalInfoTab;