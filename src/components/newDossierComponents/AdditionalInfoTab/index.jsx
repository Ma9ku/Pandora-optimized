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

function AdditionalInfoTab() {

    let { iin } = useParams()

    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState(null);

    useEffect(() => {

        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}additionalInfo`, { params: { iin: iin } })
                .then(res => {
                    console.log('additional tab', res.data);
                    setData(res.data);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }

        if (iin) {
            fetchData();
        }
    }, [iin]);

    if (isLoading) {
        return (
            <a>...Loading</a>
        )
        ;
    }
    
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
            <Transport data={data.mvAutoFls}/>

            <OtherTransport />

            <Equipment data={data.equipment}/>

            <Military data={data.militaryAccounting2Entities}/>

            <FlUl data={data.mvUlFounderFls}/>

            <Pension data={data.pensions}/>

            <Ipkh data={data}/>
        </>
    );
}

export default AdditionalInfoTab;