import { PiGear } from "react-icons/pi";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import TwoColumn from "../../TwoColumn";
import CollapsableContainer from "../../CollapsableContainer";
import VerticalTable from "../../VerticalTable";
import SimpleText from "../../UI/Text";

function Equipment({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            icon={<PiGear />}
            name={'ТЕХНИКА'}
        >
            <TwoColumn>
                {
                    data && data.length > 0 ? data.map((item, index) => {
                        console.log(item);

                        return (
                            <CollapsableContainer
                                name={`${index+1}. ${item.brand_model}, Регистрационный номер ${item.reg_number}, Статус: ${item.status}, ${item.reg_date} - ${item.end_date ?? ''}`}
                            >
                                <VerticalTable 
                                    twoColumn={false}
                                    data={{
                                        'Имя владельца': item.owner_name || '',
                                        'Дата регистрации по': item.end_date || '---',
                                        'Категория': item.owner_category || '',
                                        'Дата выдачи свидетельства': item.date_certificate || '---',
                                        'Серия и регистрационный № свидетельства': item.series_reg_number || '',
                                        'VIN/Кузов/Шасси': item.vin_kuzov_shassi || '',
                                        'Год выпуска ТС': item.release_year_tc || '',
                                        'Объем двигателя см.куб': item.engine_volume || '',
                                        'Цвет': item.color || '',
                                        'Масса без нагрузки': item.weight || '',
                                        'Разрешенная max масса': item.max_weight || '',
                                        'Особые отметки': item.special_marks || '',
                                        'Отметка о снятии с учета': 'NETU' || ''
                                    }}
                                />

                            </CollapsableContainer>
                        )
                    }) : <SimpleText>Нет данных</SimpleText>
                }
            </TwoColumn>
        </BigCollapsableBlock>
    );
}

export default Equipment;