import { BsHospital } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import { useEffect, useState } from "react";
import SimpleTable from "../../SimpleTable";

function ForcedTreatment({
    data
}) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(prev => {

            return [
                [ 'IpName1', 'BlockDate1', 'Reason1'],
                [ 'IpName2', 'BlockDate2', 'Reason2'],
            ]
        })
    }, [])

    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Принудительное лечение'}
            icon={<BsHospital />}
        >
            <SimpleTable 
                columns={[
                    'Категория риска',
                    'Комментарий',
                    'Дата назначения',
                ]}
                rows={rows}
            />
        </BigCollapsableBlock>
    );
}

export default ForcedTreatment;