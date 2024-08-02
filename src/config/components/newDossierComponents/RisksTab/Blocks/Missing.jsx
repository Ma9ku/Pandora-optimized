import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { PiUserFocusThin } from "react-icons/pi";
import { useEffect, useState } from 'react';

function Missing({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.search_type || '---',
                item.number || '---',
                item.organ || '---',
                item.information || '---',
                item.additional_info || '---',
                item.relevanceDate || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Пропавшие без вести'}
            icon={<PiUserFocusThin />}
        >
            {data && data.length > 0 ? (
                <SimpleTable
                    columns={[
                        'Тип поиска',
                        'Номер',
                        'Орган',
                        'Информация',
                        'Доп.информация',
                        'Дата пропажи',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default Missing;
