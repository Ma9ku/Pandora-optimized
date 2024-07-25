import BigCollapsableBlock from "../../BigCollapsableBlock";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsGear } from "react-icons/bs";
import VerticalTable from "../../VerticalTable";

function Equipment({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Техника'}
            icon={<BsGear />}
        >
            {
                data && data.length > 0
                    ? data
                        .filter(item => item !== undefined && item !== null)
                        .map((item, index) => {

                            return (
                                <SmallCollapsableBlock
                                    key={index}
                                    name={`Тип оборудования: ${item.equipment_type}. Государственный номер - ${item.gov_number}`}
                                >
                                    <VerticalTable 
                                        // twoColumn={false}
                                        data={{
                                            'Форма техники': item.equipment_form || '---',
                                            'Модель техники': item.equipment_model || '---',
                                            'Дата регистрации техники': item.reg_date || '---',
                                            'ВИН номер': item.vin || '---',
                                            'Дата приобретения': item.reg_date,
                                            
                                        }}
                                    />
                                </SmallCollapsableBlock>
                            )
                        })
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default Equipment;