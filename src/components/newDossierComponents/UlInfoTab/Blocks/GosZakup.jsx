import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsCash } from "react-icons/bs";

function GosZakup({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Государственные закупки'}
            icon={<BsCash />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default GosZakup;