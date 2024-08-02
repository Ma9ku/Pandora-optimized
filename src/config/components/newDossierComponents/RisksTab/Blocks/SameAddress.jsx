import BigCollapsableBlock from '../../BigCollapsableBlock';
import { useEffect, useState } from 'react';
import { FaFile } from 'react-icons/fa6';
import SimpleText from '../../UI/Text';
import SimpleTable from '../../SimpleTable';
import { dossierURL } from '../../../../data/dossier';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ActionButton from '../../UI/ActionButton';

function SameAddress({data, defaultOpen = false }) {
    const {iin} = useParams()
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeRow, setActiveRow] = useState({});

    useEffect(() => {
        // axios.get(`${dossierURL}sameAddressFl`, {}
        if (data && data.length != 0) {
            setRows(data.filter(item => item != null).map(item => [
                item.first_name || '---',
                item.last_name || '---',
                item.patronymic || '---',
                item.iin || '---',
            ]));
        } else {
            setLoading(true);
            const userSession = JSON.parse(localStorage.getItem("user"))
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
            console.log("iin", iin)
            axios.get(`${dossierURL}sameAddressFl`, { params: { iin: iin } })
            .then(res => {
                setRows(res.data.filter(item => item != null).map(item => [
                    item.last_name || '---',
                    item.iin || '---',
                ]));
            })
            .catch(err => console.log(err))
            .finally(() => {
                setLoading(false);
            });
        }
    }, [data]);

    if (loading) (
        <BigCollapsableBlock 
            exist={false}
            icon={<FaFile />}
            name={'Регистрация ФЛ на одном адресе'}
            defaultOpen={defaultOpen}
        >
            ...Загрузка
        </BigCollapsableBlock>
    )

    return (
        <BigCollapsableBlock 
            exist={rows && rows.length > 0 ? true : false}
            icon={<FaFile />}
            name={'Регистрация ФЛ на одном адресе'}
            defaultOpen={defaultOpen}
        >
            {rows && rows.length > 0 ? (
                <SimpleTable
                    columns={[
                        'ФИО',
                        'ИИН',
                    ]}
                    rows={rows}
                    onRowClick={(e) => {
                        console.log(e);
                        setActiveRow(e);
                    }}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}

            {
                activeRow.column_index
                ? (
                    <div className="actions">
                        <ActionButton 
                            value={'Перейти'}
                            onClick={() => {
                                const url = `/profiler/person/` + activeRow.row_data[3]
                                window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                        />
                    </div>
                ) : null
            }
    </BigCollapsableBlock>
    );
}

export default SameAddress;
