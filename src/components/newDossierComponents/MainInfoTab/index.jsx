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
                icon={<FaFile />}
                name={'Смена ФИО'}
            >
                {
                    data.changeFio 
                    ? (
                        <SimpleTable
                            columns={[
                                'ФИО старое',
                                'Дата смены ФИО',
                                'Номер Акта'
                            ]}
                            rows={data.changeFio 
                                ? [[
                                    `${data.changeFio.surname_before || ''} ${data.changeFio.name_before || ''} ${data.changeFio.secondname_before || ''}`,
                                    data.changeFio.to_date,
                                    data.changeFio.number_akt
                                ]]
                                : []}
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
                }
            </BigCollapsableBlock>
        </>
    );
}

export default MainInfoTab;