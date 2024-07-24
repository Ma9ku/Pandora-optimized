import { BsCashStack } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";

function Pension({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            icon={<BsCashStack />}
            name={'Пенсионные отчисления'}
        >
            <SimpleText>Нет данных</SimpleText>
        </BigCollapsableBlock>
    );
}

export default Pension;