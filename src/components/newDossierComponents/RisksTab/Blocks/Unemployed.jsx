import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { LiaUserTieSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';

function Unemployed({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setRows(data.filter(item => item != null).map(item => [
                item.iinBin || '---',
                item.startDt || '---',
                item.endDt || '---',
                item.reason || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Реестр безработных'}
            icon={<LiaUserTieSolid />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'Дата регистрации',
                        'БИН предприятия',
                        'Профессия',
                        'Уровень зп.',
                        'Источник финансирования',
                        'Источник направления (КЦ/ЭБТ)',
                        'Дата трудоустройства',
                        'Дата завершения меры',
                        'Причина завершения',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default Unemployed;
