import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

function PKB({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Первое Кредитное Бюро(ПКБ)'}
            icon={<FaBuildingCircleExclamation />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default PKB;