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
            exist={data && data.length > 0 ? true : false}
            icon={<PiGear />}
            name={'ТЕХНИКА'}
        >
            <TwoColumn>
                {
                    data && data.length > 0 ? data.map((item, index) => {
                        console.log(item);

                        return (
                            <CollapsableContainer
                                name={`${index+1}. ${item.equipment_model}, Регистрационный номер ${item.reg_series_num}, ${item.reg_date} - ${item.end_date ?? ''}`}
                            >
                                <VerticalTable 
                                    twoColumn={false}
                                    data={{
                                        'Имя владельца': item.proprietor_name || '---',
                                        'Дата регистрации по': item.end_date || '---',
                                        'Серия и регистрационный № свидетельства': item.reg_series_num || '---',
                                        'VIN/Кузов/Шасси': item.vin || '---',
                                        'Особые отметки': item.special_marks || '---',
                                        'Отметка о снятии с учета': item.end_reason || '---'
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