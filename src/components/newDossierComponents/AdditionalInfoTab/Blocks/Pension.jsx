import { BsCashStack } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";
import ModalWindow from "../../modalWindow";
import { useState } from "react";
import axios from "axios";
import { dossierURL } from "../../../../data/dossier";
function Pension({
    data, iin
}) {
    const [modalOpen, setModalOpen] = useState(false)
    const [list, setList] = useState([])
    const userSession = JSON.parse(localStorage.getItem("user"))
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
  
    const fetchData = (bin, year) => {
        axios.get(`${dossierURL}pensionDetails`, { params: { iin: iin, bin: bin, year: year } })
            .then(res => {
                // setRisksInfo(res.data);
                setModalOpen(true)
                setList(res.data)
                console.log("sd", res.data)
            })
            .catch(err => console.log(err))
            .finally(() => {
                // setLoading(false);
            });
    }
    return ( 
        <>
            <BigCollapsableBlock 
                icon={<BsCashStack />}
                name={'Пенсионные отчисления'}
                >
                {
                    data && data.length > 0 
                    ? (
                        <SimpleTable
                            withSorting={true}
                            columns={[
                                {
                                    value: 'БИН',
                                    align: 'left',
                                    sorting: false,
                                },
                                {
                                    value: 'Наименование ЮЛ',
                                    align: 'left',
                                    sorting: false,
                                },
                                {
                                    value: 'Период',
                                    align: 'center',
                                    sorting: true,
                                },
                                {
                                    value: 'Сумма (010)',
                                    align: 'center',
                                    sorting: true,
                                },
                                {
                                    value: 'Сумма (012)',
                                    align: 'center',
                                    sorting: true,
                                },
                            ]}
                            rows={
                                data 
                                ? data.map(item => {
                                    return [
                                        item.bin || '---',
                                        item.name || '---',
                                        item.period || '---',
                                        item.sum010 ? item.sum010.toLocaleString('ru-RU') : '---',
                                        item.sum012 ? item.sum012.toLocaleString('ru-RU') : '---',
                                    ]
                                })
                                : [] 
                            }
                            onRowClick={(e) => {
                                fetchData( e.row_data[0], e.row_data[2])
                            }}
                        />
                        ) : <SimpleText>Нет данных</SimpleText>
                    }

                {/* <SimpleText>Нет данных</SimpleText> */}
            </BigCollapsableBlock>
            { modalOpen ? 
                <ModalWindow closer={setModalOpen}>
                     <SimpleTable 
                            columns={[
                                'БИН',
                                'Наименование ЮЛ',
                                'Период',
                                'Общая сумма',
                            ]}
                            rows={
                                list 
                                ? list.map(item => {
                                    // console.log("flul", item)
                                    
                                    return [
                                        item.bin || '---',
                                        item.name || '---',
                                        item.period || '---',
                                        item.sum010 ? item.sum010.toLocaleString('ru-RU') : '---',
                                        // <button>Перейти</button>,
                                    ]
                                })
                                : [] 
                            }
                        />
                </ModalWindow>
                : null
            }
        </>
    );
}

export default Pension;