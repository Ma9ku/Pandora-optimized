import { useEffect, useState } from "react";
import VerticalTable from "../../VerticalTable";
import CollapsableContainer from "../../CollapsableContainer";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import { PiHouseLine } from "react-icons/pi";
import ActionButton from "../../UI/ActionButton";

function Buildings({
    data
}) {

    const [actuals, setActuals] = useState([]);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        console.log(data);

        setActuals(prev => {
            if (data === null || data.length === 0) return [];

            return data.filter(item => {
                if (item.register_status_rus === 'актуальная') return true;
            })
        })

        setHistory(prev => {
            if (data === null || data.length === 0) return [];

            return data.filter(item => {
                if (item.register_status_rus !== 'актуальная') return true;
            })
        })
    }, [])

    return ( 

        <BigCollapsableBlock 
            icon={<PiHouseLine />}
            name={'СВЕДЕНИЯ ПО РЕЕСТРУ НЕДВИЖИМОСТИ'}
        >
            <SmallCollapsableBlock 
                name={`Текущие (${actuals.length})`}
            >
                {console.log(actuals)}
                {
                    actuals.map((item, index) => {

                        console.log(item);

                        return (
                            <CollapsableContainer
                                key={index}
                                name={`${index+1}. ${item.intended_use_rus}, Cтатус: "${item.register_status_rus}", ${item.register_reg_date.substring(0, 10)} -`}
                            >
                                <VerticalTable 
                                    data={{
                                        'Кадастровый номер №': item.cadastral_number,
                                        'Адрес': item.address_history_rus,
                                        'Правообладатель': item.owner_full_name,
                                        'Этажность': item.floor,
                                        'Площадь общая': item.area_total,
                                        'Жилая площадь': item.area_useful,
                                        'Вид документа': item.register_emergence_rights_rus,
                                        'Номер документа': item.register_record_number,
                                        'Дата документа': 'NETU',
                                        'Дата регистрации': item.register_reg_date?.substring(0, 10),
                                        'Дата прекращения': item.register_end_date?.substring(0, 10) || '---',
                                        'ИИН/БИН продавца': item.owner_iin_bin,
                                        'ФИО/Наименование продавца': 'NETU',
                                        'Сумма сделки (стоимость)': item.register_transaction_amount,
                                    }}
                                />
                                <div className="actions">
                                    <ActionButton 
                                        onClick={() => {}}
                                        value={'Детальный просмотр (Купил-Продал)'}
                                    />
                                </div>
                            </CollapsableContainer>
                        )
                    })
                }
            </SmallCollapsableBlock>

            <SmallCollapsableBlock 
                name={`Исторические (${history.length})`}
            >
                {
                    history.map((item, index) => {

                        return (
                            <CollapsableContainer
                                key={index}
                                name={`${index+1}. ${item.intended_use_rus}, Cтатус: "${item.register_status_rus}", ${item.register_reg_date.substring(0, 10)} -`}
                            >
                                <VerticalTable 
                                    data={{
                                        'Кадастровый номер №': item.cadastral_number,
                                        'Адрес': item.address_history_rus,
                                        'Правообладатель': item.owner_full_name,
                                        'Этажность': item.floor,
                                        'Площадь общая': item.area_total,
                                        'Жилая площадь': item.area_useful,
                                        'Вид документа': item.register_emergence_rights_rus,
                                        'Номер документа': item.register_record_number,
                                        'Дата документа': 'NETU',
                                        'Дата регистрации': item.register_reg_date?.substring(0, 10),
                                        'Дата прекращения': item.register_end_date?.substring(0, 10) || '---',
                                        'ИИН/БИН продавца': item.owner_iin_bin,
                                        'ФИО/Наименование продавца': 'NETU',
                                        'Сумма сделки (стоимость)': item.register_transaction_amount,
                                    }}
                                />
                                <div className="actions">
                                    <ActionButton 
                                        onClick={() => {}}
                                        value={'Детальный просмотр (Купил-Продал)'}
                                    />
                                </div>
                            </CollapsableContainer>
                        )
                    })
                }
            </SmallCollapsableBlock>
        </BigCollapsableBlock>

    );
}

export default Buildings;