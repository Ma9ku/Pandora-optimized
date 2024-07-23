import { Person4 } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Beneficiary({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Льготники'}
            icon={<Person4 />}
        >
            <SimpleText>No data</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Beneficiary;