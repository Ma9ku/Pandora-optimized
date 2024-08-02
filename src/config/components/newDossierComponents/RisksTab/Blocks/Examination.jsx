import { Search } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Examination({ data }) {
    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Проверки'}
            icon={<Search />}
        >
            <SimpleTable 
                columns={[
                    'Рег.номер',
                    'Дата рег.проверки',
                    'Дата отказа',
                    'Номер проверки',
                    'Дата действия',
                    'Вид проверки',
                    'Основание проверки',
                    'Срок проверки',
                    'Сфера контроля и надзора',
                    'Результат проверки',
                    'Принятые меры',
                    'Объем проверки',
                    'Государственный орган назначивший проверку',
                    'Орган осуществляющий регистрационные проверки',
                    'Основание по мораторию',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Examination;