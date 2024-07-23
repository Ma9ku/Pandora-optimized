import { IoCardSharp } from "react-icons/io5";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Kartochki({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Карточки'}
            icon={<IoCardSharp />}
        >
            <SimpleTable 
                columns={[
                    'Номер ЕРДР/УД',
                    'Дата ЕРДР/УД',
                    'Квалификация УР РК',
                    'Статус УД'
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Kartochki;