import React, { useState, useEffect } from 'react';
import RelationsTab from './../RelationsTab';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.scss';
import RisksTab from './../RisksTab';
import AdditionalInfoTab from './../AdditionalInfoTab';
import MainInfoTab from './../MainInfoTab';
import { useTheme } from '../../../context/themeContext';

const dossierURL = 'http://localhost:8081/api/pandora/dossier/';  // Replace with the actual URL

function InfoTabs() {
    const [tab, setTab] = useState(0);
    const { theme } = useTheme();
    const { iin } = useParams();
    const [nonEmptyArraysCount, setNonEmptyArraysCount] = useState(0);

    const [loading, setLoading] = useState(true)

    const [generalInfo, setGeneralInfo] = useState({})
    const [additionalInfo, setAdditionalInfo] = useState({})
    const [relativesInfo, setRelativesInfo] = useState([])
    const [risksInfo, setRisksInfo] = useState({})

    useEffect(() => {
        console.log(tab);
    }, [tab]);

    useEffect(() => {
        const fetchData = () => {

            axios.get(`${dossierURL}getRiskByIin`, { params: { iin: iin } })
                .then(res => {
                    console.log('risks tab data', res.data);

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
                });
        }

        if (iin) {
            fetchData();
        }
    }, [iin]);

    useEffect(() => {
        const fetchGeneralInfo = () => {
            setLoading(true);

            axios.get(`${dossierURL}generalInfo`, { params: { iin: iin } })
                .then(res => {
                    console.log('generalInfo data', res.data);
                    setGeneralInfo(res.data);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }
        const fetchAdditionalInfo = () => {
            setLoading(true);

            axios.get(`${dossierURL}additionalInfo`, { params: { iin: iin } })
                .then(res => {
                    console.log('additional tab', res.data);
                    setAdditionalInfo(res.data);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }
        const fetchRelatives = () => {
            setLoading(true);

            axios.get(`${dossierURL}getRelativesInfo`, { params: { iin: iin } })
                .then(res => {
                    console.log('relatives', res.data);
                    const rows = res.data.map((item) => [

                        item.relative_type,
                      
                        item.parent_fio,
                      
                        item.marriage_reg_date || '',
                      
                        item.marriage_divorce_date || '',
                      
                        item.parent_iin
                      
                    ]);
                    setRelativesInfo(rows);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }
        const fetchRisks = () => {
            setLoading(true);

            axios.get(`${dossierURL}getRiskByIin`, { params: { iin: iin } })
                .then(res => {
                    console.log('risks tab data', res.data);
                    setRisksInfo(res.data);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }

        if (tab == 0) {
            fetchGeneralInfo()
        } else if (tab == 1) {
            fetchAdditionalInfo()
        } else if (tab == 2) {
            fetchRelatives()
        }else if (tab == 3) {
            fetchRisks()
        }
    }, [tab]);

    return ( 
        <div className={`info-tabs-block ${theme}`}>
            <Tabs tab={tab} setTab={setTab} nonEmptyArraysCount={nonEmptyArraysCount} />
            <div className="tab-content">
                {loading == true ?
                    <div>...Loading</div>
                    : tab === 0
                    ? <MainInfoTab data={generalInfo}/>
                    : tab === 1 
                        ? <AdditionalInfoTab data={additionalInfo}/>
                    : tab === 2
                        ? <RelationsTab data={relativesInfo} iin={iin}/>
                    : tab === 3
                        ? <RisksTab data={risksInfo}/>
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
