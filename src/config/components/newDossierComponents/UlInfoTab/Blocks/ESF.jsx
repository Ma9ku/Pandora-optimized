import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsBuilding } from "react-icons/bs";

function ESF({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Сведения по контрагентам (ЭСФ)'}
            icon={<BsBuilding />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default ESF;