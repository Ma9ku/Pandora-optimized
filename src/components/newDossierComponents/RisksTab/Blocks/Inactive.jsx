import { Person2Outlined } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Inactive({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Бездействующие'}
            icon={<Person2Outlined />}
        >
            <SimpleTable 
                columns={[
                    'БИН',
                    'Наименование ЮЛ',
                    'Номер приказа',
                    'Дата приказа',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Inactive;