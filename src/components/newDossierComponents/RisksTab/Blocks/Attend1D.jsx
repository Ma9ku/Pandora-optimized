import { BsCalendar2 } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Attend1D({ data }) {
    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Посещения (1D)'}
            icon={<BsCalendar2 />}
        >
            <SimpleTable 
                columns={[
                    'Время прихода',
                    'Время ухода',
                    'Тип посетитель/доставленный',
                    'Статус лица',
                    'Орган',
                    'ФИО сотрудника',
                    'Должность сотрудника',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Attend1D;