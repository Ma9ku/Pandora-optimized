import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BigCollapsableBlock from '../BigCollapsableBlock';
import { FaFile } from 'react-icons/fa6';
import GeneralInfo from '../RisksTab/Blocks/GeneralInfo';
import FlInfo from '../RisksTab/Blocks/FlInfo'
import ContactInfo from '../RisksTab/Blocks/ContactInfo';
import SameAddress from '../RisksTab/Blocks/SameAddress';
import SimpleText from '../UI/Text';
import SimpleTable from '../SimpleTable';

function MainInfoTab({data}) {
    const { iin } = useParams();
    const [isLoading, setLoading] = useState(true);
  
    return ( 
        <>
            <SameAddress data={data ? data.sameAddressFls : []}/>

            <ContactInfo data={data ? data.contacts : []} />

            <BigCollapsableBlock 
                exist={data.changeFio && data.changeFio.length > 0 ? true : false}
                icon={<FaFile />}
                name={'Смена ФИО'}
            >
                {
                    data.changeFio && data.changeFio.length > 0
                    ? (
                        <SimpleTable
                            columns={[
                                'ФИО старое',
                                'Дата смены ФИО',
                                'Причина смены'
                            ]}
                            rows={data.changeFio && Array.isArray(data.changeFio)
                                ? data.changeFio.map(item => [
                                    `${item.surname_before || ''} ${item.name_before || ''} ${item.secondname_before || ''}`,
                                    item.to_date,
                                    item.remarks
                                ])                                    
                                : []}
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
                }
            </BigCollapsableBlock>
        </>
    );
}

export default MainInfoTab;