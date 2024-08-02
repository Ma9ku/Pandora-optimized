import { BsFileLock } from 'react-icons/bs';
import BigCollapsableBlock from '../../BigCollapsableBlock';
import SimpleTable from '../../SimpleTable';
import { useEffect, useState } from 'react';
import SimpleText from '../../UI/Text';

function ESF({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.ip_name || '---',
                item.start_dt || '---',
                item.reason || '---',
                item.end_dt || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Блокировка выписки ЭСФ'}
            icon={<BsFileLock />}
        >
            {data && data.length > 0 ? (
                <SimpleTable
                    columns={[
                        'Наименование ИП',
                        'Дата блокировки',
                        'Причина блокировки',
                        'Дата восстановления'
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default ESF;
