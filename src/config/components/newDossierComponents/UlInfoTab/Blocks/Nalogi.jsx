import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsCash } from "react-icons/bs";

function Nalogi({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Налоги'}
            icon={<BsCash />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Nalogi;