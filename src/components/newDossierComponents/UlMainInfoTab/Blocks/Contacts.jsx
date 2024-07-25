import { BsPhone } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Contacts({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Контактные данные'}
            icon={<BsPhone />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Contacts;