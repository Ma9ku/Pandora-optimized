import { FaHospitalUser } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { useEffect, useState } from "react";
import { useEdges } from "reactflow";

function MinZdrav({ data }) {
    const [rows, setRows] = useState();
    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.statusMz || '---',
                item.medicalOrg || '---',
                item.diseaseCode || '---',
                item.comments || '---',
                item.appointments_dt || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);
    return ( 
        <BigCollapsableBlock 
            exist={data && data.length > 0 ? true : false}
            name={'Сведения Минздрава'}
            icon={<FaHospitalUser />}
        >
            <SimpleTable 
                columns={[
                    'Статус',
                    'Медорганизация',
                    'Категория риска',
                    'Комментарий',
                    'Дата назначения'
                ]}
                rows={rows}
            />
        </BigCollapsableBlock>
    );
}

export default MinZdrav;