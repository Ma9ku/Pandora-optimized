import { MoneyOff } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Debt({ data }) {
    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Должники ФЛ (Должники судебных приставов)'}
            icon={<MoneyOff />}
        >
            <SimpleText>No data</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Debt;