import { FaChildren } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { useEffect, useState } from 'react';

function Orphanage({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.iin || '---',
                item.birth_date || '---',
                item.region || '---',
                item.district || '---',  // Assuming 'Область' is the same as 'Регион' since no specific field is provided
                item.orphanage_name || '---',
                item.graduation_year || '---'
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            name={'Воспитанники детского дома'}
            icon={<FaChildren />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'ИИН', 
                        'Дата рождения', 
                        'Регион',
                        'Область',
                        'Наименование учреждения',
                        'Год выпуска'
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default Orphanage;
