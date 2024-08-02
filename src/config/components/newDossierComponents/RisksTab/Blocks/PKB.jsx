import { CreditCardOffSharp } from "@mui/icons-material";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import { useEffect, useState } from "react";

function PKB({ data }) {
    const [rows, setRows] = useState ();
    useEffect (() =>{
        if(data) {
            setRows(data.filter(item => item != null).map(item => [
                item.region || '---',
                item.totalCountOfCredits || '---',
                item.totalSumOfCredits || '---',
                item.maxDelayDayNum1 || '---',
                item.relevanceDate || '---',
                item.finInstitutionsName || '---',
                item.creditInFoid || '---',
            ]))
        }
    }, [data])
    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
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
                    'Общая сумма займов',
                ]}
                rows={rows}
            />
        </BigCollapsableBlock>
    );
}

export default PKB;