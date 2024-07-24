import { NoDrinks } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { useEffect, useState } from "react";

function Amoral({ data }) {
    const [rows, setRows] = useState();
    useEffect(() => {
        if (data) {
            console.log(data);
            setRows(data.filter(item => item != null).map(item => [
                item.authority_detected || '---',
                item.decision_date || '---',
                item.fine_amount || '---',
                item.public_places || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);
    return ( 
        <BigCollapsableBlock
            name={'Аморальный образ жизни(ст.449'}
            icon={<NoDrinks />}
        >
            <SimpleTable 
                columns={[
                    'Орган выявиший правонарушение',
                    'Дата решения',
                    'Размер наложенного штрафа',
                    'Приставание в общественных местах',
                ]}
                rows={rows}
            />
        </BigCollapsableBlock>
    );
}

export default Amoral;