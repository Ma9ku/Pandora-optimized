import { BsCashStack } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Buhgalter({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Бухгалтеры'}
            icon={<BsCashStack />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Buhgalter;