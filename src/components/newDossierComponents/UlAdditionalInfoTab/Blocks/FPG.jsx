import BigCollapsableBlock from "../../BigCollapsableBlock";
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
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default FPG;