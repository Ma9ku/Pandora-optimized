import { BsBuildingExclamation } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function RiskUL({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Участие в рисковых ЮЛ'}
            icon={<BsBuildingExclamation />}
        >
            <SimpleTable 
                columns={[
                    'БИН',
                    'Наименование ЮЛ',
                    'Должность',
                    'ЕРДР'
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default RiskUL;