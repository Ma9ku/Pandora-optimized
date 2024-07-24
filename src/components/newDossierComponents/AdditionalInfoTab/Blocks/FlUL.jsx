import { FaBuildingUser } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";

function FlUl({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            icon={<FaBuildingUser />}
            name={'Сведения об участии в ЮЛ'}
        >
            {
                data && data.length > 0 
                    ? (
                        <SimpleTable 
                            columns={[
                                'БИН',
                                'Депозит',
                                'Доля',
                                'Дата регистрации'
                            ]}
                            rows={
                                data 
                                    ? data.map(item => {
                                        return [
                                            item.bin_org || '---',
                                            item.deposit || '---',
                                            item.share || '---',
                                            item.reg_date || '---'
                                        ]
                                    })
                                    : [] 
                            }
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default FlUl;