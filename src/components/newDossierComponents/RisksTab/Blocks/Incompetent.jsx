import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { FaPersonCircleQuestion } from "react-icons/fa6";

function Incompetent({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Недееспособные'}
            icon={<FaPersonCircleQuestion />}
        >
            <SimpleTable 
                columns={[
                    'Суд',
                    'Дата решения',
                    'Статус',
                    'Причина',
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Incompetent;