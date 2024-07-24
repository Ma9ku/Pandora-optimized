import { LuSailboat } from "react-icons/lu";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function OtherTransport({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            icon={<LuSailboat />}
            name={'ДРУГИЕ ВИДЫ ТРАНСПОРТА'}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default OtherTransport;