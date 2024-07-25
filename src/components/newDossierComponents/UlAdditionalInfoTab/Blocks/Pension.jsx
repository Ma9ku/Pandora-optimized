import { FaPersonCane } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Pension({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Пенсионные отчисления'}
            icon={<FaPersonCane />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Pension;