import BigCollapsableBlock from '../../BigCollapsableBlock';
import { useEffect, useState } from 'react';
import { FaFile } from 'react-icons/fa6';
import SimpleText from '../../UI/Text';
import SimpleTable from '../../SimpleTable';
import { dossierURL } from '../../../../data/dossier';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SameAddress({data, defaultOpen = false }) {
    const {iin} = useParams()
    const [rows, setRows] = useState([]);
    useEffect(() => {
        // axios.get(`${dossierURL}sameAddressFl`, {}
<<<<<<< HEAD
        if (data && data.length != 0) {
=======
        if (data.length != 0) {
>>>>>>> 4c331df3535cd582753eef8ef3e18f6fb7f0452b
            setRows(data.filter(item => item != null).map(item => [
                item.first_name || '---',
                item.last_name || '---',
                item.patronymic || '---',
                item.iin || '---',
            ]));
        } else {
            const userSession = JSON.parse(localStorage.getItem("user"))
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
            console.log("iin", iin)
            axios.get(`${dossierURL}sameAddressFl`, { params: { iin: iin } })
            .then(res => {
                setRows(res.data.filter(item => item != null).map(item => [
                    item.first_name || '---',
                    item.last_name || '---',
                    item.patronymic || '---',
                    item.iin || '---',
                ]));
            })
            .catch(err => console.log(err))
            .finally(() => {
                // setLoading(false);
            });
        }
    }, [data]);

    return (
        <BigCollapsableBlock 
        icon={<FaFile />}
        name={'Регистрация ФЛ на одном адресе'}
        defaultOpen={defaultOpen}
    >
            {rows && rows.length > 0 ? (
                <SimpleTable
                    columns={[
                        'Имя',
                        'Фамилия',
                        'Отчество',
                        'ИИН',
                    ]}
                    rows={rows}
                />
            ) : (
                <SimpleText>Нет данных</SimpleText>
            )}
    </BigCollapsableBlock>
    );
}

export default SameAddress;
