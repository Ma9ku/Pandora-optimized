import { RiCriminalFill } from "react-icons/ri";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { useEffect, useState } from "react";
import SimpleTable from "../../SimpleTable";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";

function Criminal({ data }) {
    const [rows, setRows] = useState([]);


    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.court_name || '---',
                item.court_dt || '---',
                item.iin_bin || '---',
                item.decision || '---',
                item.crime_name || '---',
                item.add_info || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return ( 
        <BigCollapsableBlock 
            name={'Сведения о судимости'}
            icon={<RiCriminalFill />}
        >
            <SmallCollapsableBlock
                name={'Осужденные'}
                count={data ? data.length : 0}
            >
                {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'Название судебного участка',
                        'Дата суда',
                        'ИИН/БИН',
                        'Решение суда',
                        'Приговор',
                        'Доп. Информация',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные прекращено судом'}
                count={0}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Сведения о судимости'}
                count={0}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные/Оправданные/прекращено органом'}
                count={0}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные за рубежом'}
                count={0}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Заключенные'}
                count={0}
            >
                
            </SmallCollapsableBlock>
        </BigCollapsableBlock>
    );
}

export default Criminal;