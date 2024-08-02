import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { FaBuildingCircleExclamation } from "react-icons/fa6";

function OMN({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Отсутствие по месту нахождения(ОМН)'}
            icon={<FaBuildingCircleExclamation />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default OMN;