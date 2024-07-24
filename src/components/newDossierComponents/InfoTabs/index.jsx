import React, { useState, useEffect } from 'react';
import RelationsTab from './../RelationsTab';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.scss';
import RisksTab from './../RisksTab';
import AdditionalInfoTab from './../AdditionalInfoTab';
import MainInfoTab from './../MainInfoTab';
import { useTheme } from '../../../context/themeContext';

const dossierURL = 'http://10.202.20.92:8081/api/pandora/dossier/';  // Replace with the actual URL

function InfoTabs() {
    const [tab, setTab] = useState(0);
    const { theme } = useTheme();
    const { iin } = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const [nonEmptyArraysCount, setNonEmptyArraysCount] = useState(0);

    useEffect(() => {
        console.log(tab);
    }, [tab]);

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}getRiskByIin`, { params: { iin: iin } })
                .then(res => {
                    console.log('risks tab data', res.data);
                    setData(res.data);

                    // Define the fields we are using
                    const fieldsToCheck = [
                        'blockEsfs', 'criminals', 'mzEntities', 
                        'drugAddicts', 'orphans', 'omns', 'dormants',
                        'beneficiariesLists', 'immoralLifestyles', 
                        'firstCreditBureauEntities', 'incapacitateds', 
                        'dismissals', 'wantedListEntities', 'adms'
                    ];

                    // Calculate non-empty arrays count
                    const count = fieldsToCheck.filter(field => 
                        Array.isArray(res.data[field]) && res.data[field].length > 0
                    ).length;
                    
                    setNonEmptyArraysCount(count);
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
        return <div>Loading...</div>;
    }

    return ( 
        <div className={`info-tabs-block ${theme}`}>
            <Tabs tab={tab} setTab={setTab} nonEmptyArraysCount={nonEmptyArraysCount} />
            <div className="tab-content">
                {
                    tab === 0
                        ? <MainInfoTab />
                    : tab === 1 
                        ? <AdditionalInfoTab />
                    : tab === 2
                        ? <RelationsTab />
                    : tab === 3
                        ? <RisksTab data={data} />
                    : <>ERROR NOT CORRECT TAB</>
                }
            </div>
        </div>
    );
}

const Tabs = ({ tab, setTab, nonEmptyArraysCount }) => {
    return (
        <div className="tabs">
            <div 
                className={tab === 0 ? 'active' : ''}
                onClick={() => setTab(0)}
            >
                Общие данные
            </div>
            <div 
                className={tab === 1 ? 'active' : ''}
                onClick={() => setTab(1)}
            >
                Дополнительная информация
            </div>
            <div 
                className={tab === 2 ? 'active' : ''}
                onClick={() => setTab(2)}
            >
                Связи
            </div>
            <div 
                className={tab === 3 ? 'active' : ''}
                onClick={() => setTab(3)}
            >
                Риски {nonEmptyArraysCount > 0 && `(${nonEmptyArraysCount})`}
            </div>
        </div>
    );
}

export default InfoTabs;
