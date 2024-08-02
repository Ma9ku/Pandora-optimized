import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

function Adms({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Административные правонарушения'}
            icon={<FaBuildingCircleExclamation />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'Орган выявивший правонарушение',
                                'Дата заведения',
                                'Номер протокола',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.authority_detected || '---',
                                    item.reg_date || '---',
                                    item.protocol_num || '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default Adms;