import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { useEffect, useState } from 'react';

function Incompetent({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.court || '---',
                item.date_decision || '---',
                item.soct || '---',
                item.cause || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            name={'Недееспособные'}
            icon={<FaPersonCircleQuestion />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'Суд',
                        'Дата решения',
                        'Статус',
                        'Причина',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default Incompetent;
