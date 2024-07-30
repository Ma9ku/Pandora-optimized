import { useEffect, useState } from "react";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import { useParams } from "react-router-dom";
import axios from "axios";
import { dossierURL } from "../../../../data/dossier";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { FaTractor } from "react-icons/fa6";

function CommodityProducers({
    data
}) {
    useEffect(() => {
       
    }, [])

    if (!data || data.length === 0) {
        return <BigCollapsableBlock
            name={'Отечественные производители'}
            icon={<FaTractor />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    }

    return ( 
        <BigCollapsableBlock
            name={'Отечественные производители'}
            icon={<FaTractor />}
        >
            <SimpleTable 
                columns={[
                    'sspName',
                    'count',
                    'Производитель',
                    'Статус'
                ]}
                rows={[
                    data.map(item => [
                        item.sspName,
                        item.count,
                        item.producer,
                        item.status
                    ])
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default CommodityProducers;