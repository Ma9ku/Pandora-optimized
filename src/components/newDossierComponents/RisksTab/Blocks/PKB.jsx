import { CreditCardOffSharp } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function PKB({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Первое Кредитное Бюро(ПКБ)'}
            icon={<CreditCardOffSharp />}
        >
            <SimpleTable 
                columns={[
                    'Регион',
                    'Количество займов',
                    'Сумма долга по займам',
                    'Максимальное количество дней просрочки',
                    'Актуальность',
                    'Наименование фин. институтов',
                    'Общее количество займов',
                    'Общая сумма займов',
                    'Максимальное количество дней просрочки',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default PKB;