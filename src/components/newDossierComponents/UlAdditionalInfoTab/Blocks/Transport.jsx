import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { BsCarFront } from "react-icons/bs";

function Transport({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Сведения по транспорту'}
            icon={<BsCarFront />}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Transport;