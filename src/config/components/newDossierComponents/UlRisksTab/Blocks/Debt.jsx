import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

function Debt({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Должники ЮЛ (Должники судебных приставов)'}
            icon={<FaBuildingCircleExclamation />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Debt;