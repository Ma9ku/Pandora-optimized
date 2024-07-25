import { FaPerson } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function DL({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'ДЛ (должностные лица)'}
            icon={<FaPerson />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default DL;