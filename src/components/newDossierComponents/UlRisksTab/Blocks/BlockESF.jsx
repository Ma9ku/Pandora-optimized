import { MdBlock } from "react-icons/md";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function BlockESF({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Блокировака выписки ЭСФ'}
            icon={<MdBlock />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default BlockESF;