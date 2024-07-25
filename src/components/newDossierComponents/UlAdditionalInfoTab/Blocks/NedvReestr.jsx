import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { BsBuilding } from "react-icons/bs";

function NedvReestr({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Сведения по реестру недвижимости'}
            icon={<BsBuilding />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'Адрес',
                                'Дата регистрации по',
                                'Кадастровый номер',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.address_rus || '---',
                                    item.register_reg_date ? `${item.register_reg_date.substring(0, 10)} - ${item.register_end_date ? item.register_end_date.substring(0, 10) : ''}` : '---',
                                    item.cadastral_number || '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default NedvReestr;