import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsCash } from "react-icons/bs";

function SamrukZakup({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Самрук-Казына закупки'}
            icon={<BsCash />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default SamrukZakup;