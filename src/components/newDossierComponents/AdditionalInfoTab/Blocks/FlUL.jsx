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
                                'Идентификатор ЮЛ',
                                'Дата регистрации',
                                'БИН',
                                'Наименование ЮЛ',
                                // 'Риски',
                            ]}
                            rows={
                                data 
                                    ? data.map(item => {
                                        console.log("flul", item)

                                        return [
                                            item.idUL || '---',
                                            item.reg_date || '---',
                                            item.bin_org || '---',
                                            item.name || '---',
                                            // <button>Перейти</button>,
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