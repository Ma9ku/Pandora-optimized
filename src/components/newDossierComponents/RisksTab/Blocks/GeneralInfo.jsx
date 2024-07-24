import BigCollapsableBlock from '../../BigCollapsableBlock';
import { useEffect, useState } from 'react';
import { FaFile } from 'react-icons/fa6';

function GeneralInfo({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.map(item => [
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
        icon={<FaFile />}
        name={'Общие сведения'}
    >

    </BigCollapsableBlock>
    );
}

export default GeneralInfo;
