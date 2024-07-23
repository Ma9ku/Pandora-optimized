import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { LiaUserTieSolid } from "react-icons/lia";

function Unemployed({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Реестр безработных'}
            icon={<LiaUserTieSolid />}
        >
            <SimpleTable 
                columns={[
                    'Дата регистрации',
                    'БИН предприятия',
                    'Профессия',
                    'Уровень зп.',
                    'Источник финансирования',
                    'Источник направления (КЦ/ЭБТ)',
                    'Дата трудоустройства',
                    'Дата завершения меры',
                    'Причина завершения',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Unemployed;