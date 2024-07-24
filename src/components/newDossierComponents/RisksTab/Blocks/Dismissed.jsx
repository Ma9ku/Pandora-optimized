import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { FiUserMinus } from "react-icons/fi";
import { useEffect, useState } from 'react';

function Dismissed({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            setRows(data.filter(item => item != null).map(item => [
                item.organ || '---',
                item.work_place || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            name={'Уволенные по отрицательным мотивам'}
            icon={<FiUserMinus />}
        >
            {data && data.length > 0 ? (
                <SimpleTable 
                    columns={[
                        'Орган',
                        'Место работы',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default Dismissed;
