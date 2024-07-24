import { BsPerson } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Ipkh({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            icon={<BsPerson />}
            name={'ИП/КХ'}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );  
}

export default Ipkh;