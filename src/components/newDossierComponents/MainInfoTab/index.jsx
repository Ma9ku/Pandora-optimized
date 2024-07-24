import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BigCollapsableBlock from '../BigCollapsableBlock';
import { FaFile } from 'react-icons/fa6';
import GeneralInfo from '../RisksTab/Blocks/GeneralInfo';
import FlInfo from '../RisksTab/Blocks/FlInfo'

const dossierURL = 'http://10.202.20.92:8081/api/pandora/dossier/';


function MainInfoTab() {
    const { iin } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}generalInfo`, { params: { iin: iin } })
                .then(res => {
                    console.log('generalInfo data', res.data);
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
    return ( 
        <>
            <GeneralInfo />
            <FlInfo />

            {/* <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Документы'}
            >
                
            </BigCollapsableBlock> */}

            {/* <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Адрес прописки'}
            >
                
            </BigCollapsableBlock> */}

            <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Регистрация ФЛ на одном адресе'}
            >
                
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Контактные данные'}
            >
                
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Смена ФИО'}
            >
                
            </BigCollapsableBlock>
        </>
    );
}

export default MainInfoTab;