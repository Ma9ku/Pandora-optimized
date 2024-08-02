import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";
import { LiaUserTieSolid } from "react-icons/lia";
import { useEffect, useState } from 'react';

function OpgEntites({ data }) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data)
            setRows(data.filter(item => item != null).map(item => [
                item.authority_detected || '---',
                item.reg_date || '---',
                item.protocol_num || '---',
                item.work_place || '---',
                item.qualification || '---',
                item.enforcement || '---',
                item.end_date || '---',
                item.fine_amount || '---',
                item.teminate_reason || '---',
            ]));
        } else {
            setRows([]);
        }
    }, [data]);

    return (
        <BigCollapsableBlock
            exist={data && data.length > 0 ? true : false}
            name={'ОПГ'}
            icon={<LiaUserTieSolid />}
        >
            {data && data.length > 0 ? (
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
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
        </BigCollapsableBlock>
    );
}

export default OpgEntites;
