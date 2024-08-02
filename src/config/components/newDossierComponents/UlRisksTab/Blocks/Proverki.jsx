import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

function Proverki({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Проверки'}
            icon={<FaBuildingCircleExclamation />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Proverki;