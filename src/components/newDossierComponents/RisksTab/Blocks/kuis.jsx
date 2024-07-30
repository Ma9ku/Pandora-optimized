import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { LiaUserTieSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';

function Kuis({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setRows(data.filter(item => item != null).map(item => [
                item.institution || '---',
                item.region || '---',
                item.bin || '---',
                item.period_start || '---',
                item.period_end || '---',
                item.conviction_article || '---',
                item.editorial_code || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'KUIS'}
            icon={<LiaUserTieSolid />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'Институт',
                        'Регион',
                        'БИН',
                        'Начало',
                        'Конец',
                        'Статья',
                        'Статья',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default Kuis;
