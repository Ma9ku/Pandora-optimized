import { NoDrinks } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Amoral({ data }) {
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
            />
        </BigCollapsableBlock>
    );
}

export default Amoral;