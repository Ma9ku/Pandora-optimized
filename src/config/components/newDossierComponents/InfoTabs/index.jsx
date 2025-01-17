import React, { useState, useEffect } from 'react';
import RelationsTab from './../RelationsTab';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.scss';
import RisksTab from './../RisksTab';
import AdditionalInfoTab from './../AdditionalInfoTab';
import MainInfoTab from './../MainInfoTab';
import { useTheme } from '../../../context/themeContext';
import { dossierURL } from '../../../data/dossier';

function InfoTabs({ tab, setTab, setSameAddressFls }) {
    const { theme } = useTheme();
    const { iin } = useParams();
    const [nonEmptyArraysCount, setNonEmptyArraysCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const [generalInfo, setGeneralInfo] = useState({});
    const [additionalInfo, setAdditionalInfo] = useState({});
    const [relativesInfo, setRelativesInfo] = useState([]);
    const [risksInfo, setRisksInfo] = useState({});

    useEffect(() => {
        const fetchData = () => {
            axios.get(`${dossierURL}getRiskByIin`, { params: { iin: iin } })
                .then(res => {

                    let count = 0;

                    Object.values(res.data).map(item => {
                        count += Array.isArray(item) && item.length > 0 ? 1 : 0
                    })

                    console.log(count);

                    setNonEmptyArraysCount(count);
                })
                .catch(err => console.log(err));
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
                    setGeneralInfo(res.data);
                    setSameAddressFls(res.data.sameAddressFls)
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
                    setRisksInfo(res.data);
                    console.log("riskssss");
                    console.log(res.data);

                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }

        if (tab === 0) {
            fetchGeneralInfo();
        } else if (tab === 1) {
            fetchAdditionalInfo();
        } else if (tab === 2) {
            fetchRelatives();
        } else if (tab === 3) {
            fetchRisks();
        }
    }, [tab]);

    return (
        <div className={`info-tabs-block ${theme}`}>
            <Tabs tab={tab} setTab={setTab} nonEmptyArraysCount={nonEmptyArraysCount} />
            <div className="tab-content">
                {loading ? (
                    <div>...Loading</div>
                ) : tab === 0 ? (
                    <MainInfoTab data={generalInfo} />
                ) : tab === 1 ? (
                    <AdditionalInfoTab data={additionalInfo} />
                ) : tab === 2 ? (
                    <RelationsTab data={relativesInfo} iin={iin} />
                ) : tab === 3 ? (
                    <RisksTab data={risksInfo} />
                ) : (
                    <>ERROR NOT CORRECT TAB</>
                )}
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
