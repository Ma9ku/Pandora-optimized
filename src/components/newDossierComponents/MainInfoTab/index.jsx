import React, { useState, useEffect } from 'react';
import BigCollapsableBlock from '../BigCollapsableBlock';
import { FaFile } from 'react-icons/fa6';

function MainInfoTab({

}) {
    return ( 
        <>
            <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Общие сведения'}
            >

            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<FaFile />}
                name={'Сведения о физическом лице'}
            >
                
            </BigCollapsableBlock>

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