import { IoBoatSharp } from "react-icons/io5";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function OtherTransport({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Другие виды транспорта'}
            icon={<IoBoatSharp />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default OtherTransport;