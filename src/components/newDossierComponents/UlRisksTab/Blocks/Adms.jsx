import BigCollapsableBlock from "../../BigCollapsableBlock";
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
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Adms;