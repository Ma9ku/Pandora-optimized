import { FaUsersBetweenLines } from "react-icons/fa6";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Discipline({ data }) {
    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Учет лиц, совершивших дисциплинарные проступки'}
            icon={<FaUsersBetweenLines />}
        >
            <SimpleTable 
                columns={[
                    'Орган',
                    'Фабула',
                    'Мера наказания',
                    'Место работы',
                    'Должность',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Discipline;