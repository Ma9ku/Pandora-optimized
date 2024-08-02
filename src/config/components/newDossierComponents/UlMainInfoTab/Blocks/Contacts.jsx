import { BsPhone } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Contacts({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Контактные данные'}
            icon={<BsPhone />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'Номер телефона',
                                'Почта',
                                'Источник',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.phone || '---',
                                    item.email || '---',
                                    item.source || '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default Contacts;