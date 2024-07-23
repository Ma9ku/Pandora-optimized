import { MdMonetizationOn } from "react-icons/md";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function NDS({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Снятые с учета по НДС'}
            icon={<MdMonetizationOn />}
        >
            <SimpleTable 
                columns={[
                    'Наименование ИП',
                    'Дата постановки на учет',
                    'Дата снятия с учета',
                    'Причина снятия с учета по НДС',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default NDS;