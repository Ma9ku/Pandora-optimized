import { BsBuilding } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function UlInfo({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            name={'Сведения о юридическом лице'}
            icon={<BsBuilding />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default UlInfo;