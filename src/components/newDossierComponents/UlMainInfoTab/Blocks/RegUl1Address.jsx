import { BsBuilding } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function RegUl1Address({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Регистрация ЮЛ на одном адресе'}
            icon={<BsBuilding />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default RegUl1Address;