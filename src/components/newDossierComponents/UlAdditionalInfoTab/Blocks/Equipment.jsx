import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsGear } from "react-icons/bs";

function Equipment({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Техника'}
            icon={<BsGear />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Equipment;