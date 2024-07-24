import BigCollapsableBlock from '../../BigCollapsableBlock';
import { useEffect, useState } from 'react';
import { FaFile } from 'react-icons/fa6';
import SimpleText from '../../UI/Text';
import SimpleTable from '../../SimpleTable';

function SameAddress({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.first_name || '---',
                item.last_name || '---',
                item.patronymic || '---',
                item.iin || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock 
        icon={<FaFile />}
        name={'Регистрация ФЛ на одном адресе'}
    >
            {data && data.length > 0 ? (
                <SimpleTable
                    columns={[
                        'Имя',
                        'Фамилия',
                        'Отчество',
                        'ИИН',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
    </BigCollapsableBlock>
    );
}

export default SameAddress;
