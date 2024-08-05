import BigCollapsableBlock from '../../BigCollapsableBlock';
import { useEffect, useState } from 'react';
import { FaFile } from 'react-icons/fa6';
import SimpleText from '../../UI/Text';
import SimpleTable from '../../SimpleTable';

function ContactInfo({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.phone || '---',
                item.email || '---',
                item.source || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock 
            exist={data && data.length > 0 ? true : false}
            icon={<FaFile />}
            name={'Контактные данные'}
        >
            {data && data.length > 0 ? (
                <SimpleTable
                    columns={[
                        'Номер',
                        'Почта',
                        'Источник',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
    </BigCollapsableBlock>
    );
}

export default ContactInfo;
