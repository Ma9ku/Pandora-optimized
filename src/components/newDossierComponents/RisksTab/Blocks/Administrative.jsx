import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { LiaUserTieSolid } from "react-icons/lia";

function Administrative({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Административные правонарушения'}
            icon={<LiaUserTieSolid />}
        >
            <SimpleTable 
                columns={[
                    'Орган выявивший правонарушение',
                    'Дата заведения',
                    'Номер протокола',
                    'Место работы',
                    'Квалификация',
                    'Принудительное исполнение',
                    'На срок до',
                    'Размер наложенного штрафа',
                    'Основания прекращения',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Administrative;