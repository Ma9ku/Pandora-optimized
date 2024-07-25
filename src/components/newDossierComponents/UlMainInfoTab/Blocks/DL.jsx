import { FaPerson } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function DL({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'ДЛ (должностные лица)'}
            icon={<FaPerson />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'ИИН',
                                'Должность',
                                'ФИО',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.iin ? item.iin.substring(0, 12) : '---',
                                    item.position || '---',
                                    item.organization_fullname || '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default DL;