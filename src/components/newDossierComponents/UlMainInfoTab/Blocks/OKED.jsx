import { BsBuilding } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function OKED({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'ОКЭД'}
            icon={<BsBuilding />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default OKED;