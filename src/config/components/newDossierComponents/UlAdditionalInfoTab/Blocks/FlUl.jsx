import { FaBuildingUser } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function FlUl({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Сведения об участниках ЮЛ'}
            icon={<FaBuildingUser />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'ИИН',
                                'Должность',
                                'ФИО',
                                'Дата вступления в должность',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.iin_bin || '---',
                                    item.identificator || '---',
                                    item.fioorUlName || '---',
                                    item.reg_date ? item.reg_date.substring(0, 10) : '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default FlUl;