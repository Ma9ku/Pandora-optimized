import { MedicationLiquid } from "@mui/icons-material";
import SimpleText from "../../UI/Text";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";

function Drugs({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Сведения по наркотическим веществам'}
            icon={<MedicationLiquid />}
        >
            <SimpleTable 
                columns={[ 'ФИО', 'Источник' ]}
                rows={[
                    [ '1', '1' ]
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Drugs;