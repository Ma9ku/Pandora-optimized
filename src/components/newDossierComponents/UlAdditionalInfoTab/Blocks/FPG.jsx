import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { BsBuilding } from "react-icons/bs";

function FPG({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'ФПГ'}
            icon={<BsBuilding />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'БИН',
                                'ФИО',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.bin || '---',
                                    item.beneficiary || '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default FPG;