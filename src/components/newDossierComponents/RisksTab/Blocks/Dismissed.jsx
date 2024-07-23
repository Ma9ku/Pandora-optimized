import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { FiUserMinus } from "react-icons/fi";

function Dismissed({ data }) {
    return ( 
        <BigCollapsableBlock
            name={'Уволенные по отрицательным мотивам'}
            icon={<FiUserMinus />}
        >
            <SimpleTable 
                columns={[
                    'Орган',
                    'Место работы'
                ]}
            />
        </BigCollapsableBlock>
    );
}

export default Dismissed;