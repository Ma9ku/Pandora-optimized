import { useEffect, useState } from "react";
import { MedicationLiquid } from "@mui/icons-material";
import SimpleText from "../../UI/Text";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";

function Drugs({ data }) {
    const [rows, setRows] = useState();
    useEffect (() => {
        if(data){
            setRows(data.filter(item => item != null).map(item => [
                item.fio || '---',
                item.source || '---',
            ]))
        }
    },[data])
    return ( 
        <BigCollapsableBlock
            name={'Сведения по наркотическим веществам'}
            icon={<MedicationLiquid />}
        >
            <SimpleTable 
                columns={[ 'ФИО', 'Источник' ]}
                rows={rows}
            />
        </BigCollapsableBlock>
    );
}

export default Drugs;