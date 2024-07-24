import React, { useState, useEffect } from 'react';

import RelationsTab from './../RelationsTab';

import './style.scss';
import RisksTab from './../RisksTab';
import AdditionalInfoTab from './../AdditionalInfoTab';
import MainInfoTab from './../MainInfoTab';
import { useTheme } from '../../../context/themeContext';

function InfoTabs() {
    const [tab, setTab] = useState(0);

    const { theme } = useTheme();

    useEffect(() => {
        console.log(tab);
    }, [tab])

    return ( 
        <div className={`info-tabs-block ${theme}`}>

            <Tabs tab={tab} setTab={setTab}/>

            <div className="tab-content">
                {
                    tab === 0
                        ? <MainInfoTab />
                    : tab === 1 
                        ? <AdditionalInfoTab/>
                    : tab === 2
                        ? <RelationsTab />
                    : tab === 3
                        ? <RisksTab />
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
                Доп. информация
            </div>
            <div 
                className={tab === 2 ? `active` : ''}
                onClick={() => setTab(2)}
            >
                Связанные лица
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

export default InfoTabs;