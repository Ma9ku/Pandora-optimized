import React, { useState, useEffect } from 'react';
import BigCollapsableBlock from '../BigCollapsableBlock';

import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoCarSharp } from "react-icons/io5";
import { PiHouseLine } from "react-icons/pi";
import { LuSailboat } from "react-icons/lu";
import { PiGear, PiMedalMilitary } from "react-icons/pi";

import SmallCollapsableBlock from '../SmallCollapsableBlock';
import SimpleTable from '../SimpleTable';
import { Link, useParams } from 'react-router-dom';
import CollapsableContainer from '../CollapsableContainer';
import VerticalTable from '../VerticalTable';
import ActionButton from '../UI/ActionButton';
import TwoColumn from '../TwoColumn';
import SimpleText from '../UI/Text';
import { FaBuildingUser } from 'react-icons/fa6';
import { BsCashStack, BsPerson } from 'react-icons/bs';
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

            axios.get(`${dossierURL}profile`, { params: { iin: iin } })
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
        return null;
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

            <Pension data={data.flPensionContrs}/>

            <Ipkh data={data}/>
        </>
    );
}

export default AdditionalInfoTab;