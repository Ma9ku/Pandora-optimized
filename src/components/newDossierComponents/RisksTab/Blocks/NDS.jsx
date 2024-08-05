import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { LiaUserTieSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';

function NDS({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setRows(data.filter(item => item != null).map(item => [
                item.iinBin || '---',
                item.startDt ? item.startDt.substring(0, 10) : '---',
                item.endDt ? item.endDt.substring(0, 10) : '---',
                item.reason || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Снятые с учета по НДС'}
            icon={<LiaUserTieSolid />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'ИИН/БИН',
                        'Дата постановки на учет',
                        'Дата снятия с учета',
                        'Причина снятия с учета по НДС',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default NDS;
