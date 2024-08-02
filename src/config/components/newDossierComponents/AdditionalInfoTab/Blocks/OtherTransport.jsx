import { LuSailboat } from "react-icons/lu";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";
import { FaPlane, FaSailboat, FaTrain } from "react-icons/fa6";
import SimpleTable from "../../SimpleTable";

function OtherTransport({
    trains, aviaTransport, waterTransports
}) {


    return ( 
        <BigCollapsableBlock 
            exist={
                (aviaTransport && aviaTransport.length > 0) 
                || (trains && trains.length > 0) 
                || (waterTransports && waterTransports.length > 0) ? true : false
            }
            icon={<LuSailboat />}
            name={'ДРУГИЕ ВИДЫ ТРАНСПОРТА'}
        >
            <SmallCollapsableBlock
                name={'Авиатранспорт'}
                icon={<FaPlane />}
                count={aviaTransport ? aviaTransport.length : 0}
            >
                {
                    aviaTransport && aviaTransport.length > 0
                    ? (
                        <SimpleTable 
                            columns={[
                                'Борт',
                                'Дата регистрации',
                                'Регистрационный номер',
                                'Эксплуатант',
                                'Марка',
                            ]}
                            rows={
                                aviaTransport.map(item => [
                                    item.bort || '---',
                                    item.date_registration || '---',
                                    item.registration_number || '---',
                                    item.ekspluatant || '---',
                                    item.marka || '---',
                                ])
                            }
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
                }
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Железнодорожный транспорт'}
                icon={<FaTrain />}
                count={trains ? trains.length : 0}
            >
                {
                    trains && trains.length > 0
                    ? (
                        <SimpleTable 
                            columns={[
                                'Категория вагона',
                                'Год производства вагона',
                                'Серия вагона',
                                'Тип вагона',
                                'Дата документа',
                            ]}
                            rows={
                                trains.map(item => [
                                    item.vagon_category || '---',
                                    item.vagon_make_year || '---',
                                    item.vagon_series || '---',
                                    item.vagon_type || '---',
                                    item.doc_date ? item.doc_date.substring(0, 10) : '---',
                                ])
                            }
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
                }
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Водный и морской транспорт'}
                icon={<FaSailboat />}
                count={waterTransports ? waterTransports.length : 0}
            >
                {
                    waterTransports && waterTransports.length > 0
                    ? (
                        <SimpleTable 
                            columns={[
                                'Регистрационный номер',
                                'ИКТ',
                                'Цель',
                                'Страна производитель',
                                'Тип лодки',
                                'Двигатель',
                            ]}
                            rows={
                                waterTransports.map(item => [
                                    item.reg_number || '---',
                                    item.ikt || '---',
                                    item.purpuse || '---',
                                    item.country_vt || '---',
                                    item.type_vt || '---',
                                    item.name_engine || '---',
                                ])
                            }
                        />
                    ) : <SimpleText>Нет данных</SimpleText>
                }
            </SmallCollapsableBlock>
        </BigCollapsableBlock>
    );
}

export default OtherTransport;