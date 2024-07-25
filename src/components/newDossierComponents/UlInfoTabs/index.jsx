import React, { useState, useEffect } from 'react';

import './style.scss';
import { useTheme } from '../../../context/themeContext';
import UlMainInfoTabs from '../UlMainInfoTab';
import UlAdditionalInfoTab from '../UlAdditionalInfoTab';
import UlInfoTab from '../UlInfoTab';
import UlRisksTab from '../UlRisksTab';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { dossierURL } from '../../../data/dossier';

function UlInfoTabs() {
    const [tab, setTab] = useState(0);
    const { bin } = useParams();

    const { theme } = useTheme();
    const [loading, setLoading] = useState(true)

    const [generalInfo, setGeneralInfo] = useState({})
    const [additionalInfo, setAdditionalInfo] = useState({})
    const [svedInfo, setSvedInfo] = useState([])
    const [risksInfo, setRisksInfo] = useState({})
    const [ulData, setUlData] = useState({})

    useEffect(() => {
        const fetchData = () => {
            setLoading(true);

            axios.get(`${dossierURL}cc`, { params: { bin: bin } })
                .then(res => {
                    console.log('ul info data', res.data);
                    setUlData(res.data);
                })
                .catch(err => console.log(err))
                .finally(() => {
                    setLoading(false);
                });
        }

        if (bin) {
            fetchData();
        }
    }, [bin]);

    // useEffect(() => {
    //     const fetchGeneralInfo = () => {
    //         setLoading(true);

    //         axios.get(`${dossierURL}cc`, { params: { bin: bin } })
    //             .then(res => {
    //                 console.log('generalInfo data', res.data);
    //                 setGeneralInfo(res.data);
    //             })
    //             .catch(err => console.log(err))
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }
    //     const fetchAdditionalInfo = () => {
    //         setLoading(true);

    //         axios.get(`${dossierURL}cc`, { params: { bin: bin } })
    //             .then(res => {
    //                 console.log('additional tab', res.data);
    //                 setAdditionalInfo(res.data);
    //             })
    //             .catch(err => console.log(err))
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }
    //     const fetchSvedInfo = () => {
    //         setLoading(true);

    //         axios.get(`${dossierURL}cc`, { params: { bin: bin } })
    //             .then(res => {
    //                 console.log('relatives', res.data);
                    
    //                 setSvedInfo([]);
    //             })
    //             .catch(err => console.log(err))
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }
    //     const fetchRisks = () => {
    //         setLoading(true);

    //         axios.get(`${dossierURL}cc`, { params: { bin: bin } })
    //             .then(res => {
    //                 console.log('risks tab data', res.data);
    //                 setRisksInfo(res.data);
    //             })
    //             .catch(err => console.log(err))
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }

    //     if (tab == 0) {
    //         fetchGeneralInfo()
    //     } else if (tab == 1) {
    //         fetchAdditionalInfo()
    //     } else if (tab == 2) {
    //         fetchSvedInfo()
    //     }else if (tab == 3) {
    //         fetchRisks()
    //     }
    // }, [tab]);

    return ( 
        <div className={`info-tabs-block ${theme}`}>

            <Tabs tab={tab} setTab={setTab}/>

            <div className="tab-content">
                {
                    loading ?
                        <div>...Loading</div>
                    : tab === 0
                        ? <UlMainInfoTabs data={ulData} />
                    : tab === 1 
                        ? <UlAdditionalInfoTab data={ulData} />
                    : tab === 2
                        ? <UlInfoTab data={ulData} />
                    : tab === 3
                        ? <UlRisksTab data={ulData} />
                    : <>ERROR NOT CORRECT TAB</>
                }
            </div>

        </div>
    );
}


const Tabs = ({
    tab,
    setTab
}) => {

    return (
        <div className="tabs">
            <div 
                className={tab === 0 ? `active` : ''}
                onClick={() => setTab(0)}
            >
                Общие данные
            </div>
            <div 
                className={tab === 1 ? `active` : ''}
                onClick={() => setTab(1)}
            >
                Дополнительная информация
            </div>
            <div 
                className={tab === 2 ? `active` : ''}
                onClick={() => setTab(2)}
            >
                Сведения
            </div>
            <div 
                className={tab === 3 ? `active` : ''}
                onClick={() => setTab(3)}
            >
                Риски
            </div>
        </div>
    )
}

export default UlInfoTabs;