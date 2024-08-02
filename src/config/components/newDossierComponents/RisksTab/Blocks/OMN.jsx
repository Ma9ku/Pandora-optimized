import { Person2Outlined } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { useEffect, useState } from 'react';

function OMN({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.iin_bin || '---',
                item.taxpayer_name || '---',
                item.decision_number || '---',
                item.decision_date || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Отсутствие по месту нахождения(ОМН)'}
            icon={<Person2Outlined />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'БИН',
                        'Наименование ЮЛ',
                        'Номер решения',
                        'Дата решения',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default OMN;
