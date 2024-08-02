import { IoCardSharp } from "react-icons/io5";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Sudispol({ data }) {
    return ( 
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'Судиспол'}
            icon={<IoCardSharp />}
        >
            {
                data && data.length > 0
                ? (
                    <SimpleTable 
                        columns={[
                            'Категория',
                            'Размер суммы',
                            'Орган',
                            'ФИО адвоката',
                        ]}
                        rows={
                            data && data.length > 0
                            ? data.map(item => [
                                item.addition_category || '---',
                                item.amount || '---',
                                item.name_of_organ || '---',
                                item.name_of_layer || '---',
                            ]) : []
                        }
                    />
                ) : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default Sudispol;