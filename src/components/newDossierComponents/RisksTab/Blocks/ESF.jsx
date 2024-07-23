import { BsFileLock } from 'react-icons/bs';
import BigCollapsableBlock from '../../BigCollapsableBlock';
import SimpleTable from '../../SimpleTable';
import { useEffect, useState } from 'react';

function ESF({
    
}) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(prev => {

            return [
                [ 'IpName1', 'BlockDate1', 'Reason1', 'RecoverDate1'],
                [ 'IpName2', 'BlockDate2', 'Reason2', 'RecoverDate2'],
            ]
        })
    }, [])

    return ( 
        <BigCollapsableBlock
            name={'Блокировка выписки ЭСФ'}
            icon={<BsFileLock />}
        >
            <SimpleTable 
                columns={[
                    'Наименование ИП',
                    'Дата блокировки',
                    'Причина блокировки',
                    'Датаs восстановления'
                ]}
                rows={rows}
            />

        </BigCollapsableBlock>
    );
}

export default ESF;