import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { PiUserFocusThin } from "react-icons/pi";

function Missing({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Пропавшие без вести'}
            icon={<PiUserFocusThin />}
        >
            <SimpleTable
                columns={[
                    'Тип поиска',
                    'Номер',
                    'Орган',
                    'Информация',
                    'Доп.информация',
                    'Дата пропажи',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Missing;