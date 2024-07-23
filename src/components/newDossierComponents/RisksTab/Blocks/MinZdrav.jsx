import { FaHospitalUser } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function MinZdrav({ data }) {
    return ( 
        <BigCollapsableBlock 
            name={'Сведения Минздрава'}
            icon={<FaHospitalUser />}
        >
            <SimpleTable 
                columns={[
                    'Статус',
                    'Медорганизация',
                    'Категория риска',
                    'Комментарий',
                    'Дата назначения'
                ]}
                rows={[
                    ['1', '1', '1', '1', '1']
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default MinZdrav;