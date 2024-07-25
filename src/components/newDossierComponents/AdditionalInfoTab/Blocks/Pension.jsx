import { BsCashStack } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
function Pension({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            icon={<BsCashStack />}
            name={'Пенсионные отчисления'}
        >
            {
                data && data.length > 0 
                    ? (
                        <SimpleTable 
                            columns={[
                                'БИН',
                                'Наименование ЮЛ',
                                'Период',
                                'Сумма (010)',
                                'Сумма (012)',
                            ]}
                            rows={
                                data 
                                    ? data.map(item => {
                                        console.log("flul", item)

                                        return [
                                            item.bin || '---',
                                            item.name || '---',
                                            item.period || '---',
                                            item.sum010 ? item.sum010.toLocaleString('ru-RU') : '---',

                                            item.sum012 ? item.sum012.toLocaleString('ru-RU') : '---',
                                            // <button>Перейти</button>,
                                        ]
                                    })
                                    : [] 
                            }
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
            }

            {/* <SimpleText>Нет данных</SimpleText> */}
        </BigCollapsableBlock>
    );
}

export default Pension;