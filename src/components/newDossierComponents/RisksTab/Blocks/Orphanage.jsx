import { FaChildren } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Orphanage({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Воспитанники детского дома'}
            icon={<FaChildren />}
        >
            <SimpleTable 
                columns={[
                    'ИИН', 
                    'Дата рождения', 
                    'Регион',
                    'Область',
                    'Наименование учреждения',
                    'Год выпуска'
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Orphanage;