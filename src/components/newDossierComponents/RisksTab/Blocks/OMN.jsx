import { Person2Outlined } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function OMN({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Отсутствие по месту нахождения(ОМН)'}
            icon={<Person2Outlined />}
        >
            <SimpleTable 
                columns={[
                    'БИН',
                    'Наименование ЮЛ',
                    'Номер решения',
                    'Дата решения',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default OMN;