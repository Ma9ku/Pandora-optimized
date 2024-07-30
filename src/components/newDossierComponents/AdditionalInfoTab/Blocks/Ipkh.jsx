import { BsPerson } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { useEffect, useState } from "react";

function Ipkh({
    dataIp,
    dataKh
}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        setData(prev => {
            let res = [];

            console.log(dataIp, dataKh);

            dataIp = dataIp ? dataIp.map(data => {
                return {
                    ...data,
                    'type': 'ИП'
                }
            }) : [];

            dataKh = dataKh ? dataKh.map(data => {
                return {
                    ...data,
                    'type': 'КХ'
                }
            }) : [];

            if (dataIp !== null && dataIp !== undefined) res = [...res, ...dataIp];
            if (dataKh !== null && dataKh !== undefined) res = [...res, ...dataKh];

            return res;
        })
    }, [dataIp, dataKh])

    if (data.length <= 0) return (
        <BigCollapsableBlock 
            icon={<BsPerson />}
            name={'ИП/КХ'}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    )

    return ( 
        <BigCollapsableBlock 
            icon={<BsPerson />}
            name={'ИП/КХ'}
        >
            <SimpleTable 
                columns={[
                    'Тип',
                    'Наименование',
                    'ИИН',
                    'РНН'
                ]}
                rows={
                    data.map(item => [
                        item.type,
                        item.name_rus || '---',
                        item.iin || '---',
                        item.rnn || '---'
                    ])
                }
            />
        </BigCollapsableBlock>
    );  
}

export default Ipkh;