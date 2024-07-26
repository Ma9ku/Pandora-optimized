import { useEffect, useState } from "react";
import VerticalTable from "../../VerticalTable";
import CollapsableContainer from "../../CollapsableContainer";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import { PiHouseLine } from "react-icons/pi";
import ActionButton from "../../UI/ActionButton";
import ModalWindow from "../../modalWindow";
import axios from "axios";
import SimpleTable from "../../SimpleTable";
import { dossierURL } from "../../../../data/dossier";

function Buildings({ data }) {
    const [actuals, setActuals] = useState([]);
    const [history, setHistory] = useState([]);

    const [list, setList] = useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const userSession = JSON.parse(localStorage.getItem("user"))
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
  
    useEffect(() => {
        console.log(data);

        setActuals(() => {
            if (data === null || data === undefined || data.length === 0) return [];
            return data.filter(item => item.register_status_rus === 'актуальная');
        });

        setHistory(() => {
            if (data === null || data === undefined || data.length === 0) return [];
            return data.filter(item => item.register_status_rus !== 'актуальная');
        });
    }, [data]);

    const fetchData = (cadastral_num, address) => {
        axios.get(`${dossierURL}rnDetails`, { params: { cadastral: cadastral_num, address: address } })
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
                icon={<PiHouseLine />}
                name={'СВЕДЕНИЯ ПО РЕЕСТРУ НЕДВИЖИМОСТИ'}
            >
                <SmallCollapsableBlock 
                    name={`Текущие (${actuals.length})`}
                >
                    {console.log(actuals)}
                    {actuals.map((item, index) => {
                        console.log(item);
                        return (
                            <CollapsableContainer
                                key={index}
                                name={`${index + 1}. ${item.intended_use_rus}, Cтатус: "${item.register_status_rus}", ${item.register_reg_date.substring(0, 10)} - ${item.register_end_date ? item.register_end_date.substring(0, 10) : ' '}`}
                            >
                                <VerticalTable 
                                    data={{
                                        'Кадастровый номер №': item.cadastral_number,
                                        'Адрес': item.address_history_rus,
                                        'Правообладатель': item.owner_full_name,
                                        'Этажность': item.floor,
                                        'Площадь общая': item.area_total,
                                        'Жилая площадь': item.area_useful,
                                        'Вид документа': item.register_emergence_rights_rus,
                                        'Номер документа': item.register_record_number,
                                        'Дата документа': 'NETU',
                                        'Дата регистрации': item.register_reg_date?.substring(0, 10),
                                        'Дата прекращения': item.register_end_date?.substring(0, 10) || '---',
                                        'ИИН/БИН продавца': item.owner_iin_bin,
                                        'ФИО/Наименование продавца': item.owner_full_name ? item.owner_full_name : "---",
                                        'Сумма сделки (стоимость)': item.register_transaction_amount ? new Intl.NumberFormat('ru-RU', { useGrouping: true }).format(item.register_transaction_amount) : "---",
                                    }}
                                />
                                <div className="actions">
                                    <ActionButton 
                                        onClick={() => {
                                            fetchData(item.cadastral_number, item.address_history_rus);
                                        }}
                                        value={'Детальный просмотр (Купил-Продал)'}
                                    />
                                </div>
                            </CollapsableContainer>
                        );
                    })}
                </SmallCollapsableBlock>

                <SmallCollapsableBlock 
                    name={`Исторические (${history.length})`}
                >
                    {history.map((item, index) => {
                        return (
                            <CollapsableContainer
                                key={index}
                                name={`${index + 1}. ${item.intended_use_rus}, Cтатус: "${item.register_status_rus}", ${item.register_reg_date.substring(0, 10)} - ${item.register_end_date ? item.register_end_date.substring(0, 10) : ' '}`}
                            >
                                <VerticalTable 
                                    data={{
                                        'Кадастровый номер №': item.cadastral_number,
                                        'Адрес': item.address_history_rus,
                                        'Правообладатель': item.owner_full_name,
                                        'Этажность': item.floor,
                                        'Площадь общая': item.area_total,
                                        'Жилая площадь': item.area_useful,
                                        'Вид документа': item.register_emergence_rights_rus,
                                        'Номер документа': item.register_record_number,
                                        'Дата документа': 'NETU',
                                        'Дата регистрации': item.register_reg_date?.substring(0, 10),
                                        'Дата прекращения': item.register_end_date?.substring(0, 10) || '---',
                                        'ИИН/БИН продавца': item.owner_iin_bin,
                                        'ФИО/Наименование продавца': 'NETU',
                                        'Сумма сделки (стоимость)': item.register_transaction_amount,
                                    }}
                                />
                                <div className="actions">
                                    <ActionButton 
                                        onClick={() => {
                                            setModalOpen(true);
                                        }}
                                        value={'Детальный просмотр (Купил-Продал)'}
                                    />
                                </div>
                            </CollapsableContainer>
                        );
                    })}
                </SmallCollapsableBlock>
            </BigCollapsableBlock>
            
            {
                modalOpen 
                ? (
                    <ModalWindow
                        closer={(open) => setModalOpen(open)}
                    >
                        <SimpleTable 
                          columns={[
                            "Название вида",
                            "Кадастровый номер",
                            "Владелец права",
                            "Адрес",
                            "Этажность",
                            "Сумма сделки",
                            "Жилая площадь",
                            "Общая площадь",
                            "Тип документа",
                            "Номер документа",
                            "Дата",
                            "Статус РН",
                            "ИН владельца",
                            "Имя владельца",
                            "Дата регистрации"
                          ]}
                          rows={
                            list 
                            ? list.map(item => {
                                // console.log("flul", item)
                                return [
                                    item.nameOfKind,
                                    item.cadastrialNumber,
                                    item.rightOwner,
                                    item.address,
                                    item.floorness,
                                    item.sumOfDeal,
                                    item.livingArea,
                                    item.allArea,
                                    item.typeOfDoc,
                                    item.documentNumber,
                                    item.date,
                                    item.statusRn,
                                    item.inOfOwner,
                                    item.ownerName,
                                    item.dateOfRegistration
                                ]
                            })
                            : [] 
                        }
                        />
                    </ModalWindow>
                ) : null
            }
        </>
    );
}

export default Buildings;
