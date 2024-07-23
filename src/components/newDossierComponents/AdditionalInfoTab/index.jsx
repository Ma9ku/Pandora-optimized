import React, { useState, useEffect } from 'react';
import BigCollapsableBlock from '../BigCollapsableBlock';

import { HiOutlineAcademicCap } from "react-icons/hi2";
import { IoCarSharp } from "react-icons/io5";
import { PiHouseLine } from "react-icons/pi";
import { LuSailboat } from "react-icons/lu";
import { PiGear, PiMedalMilitary } from "react-icons/pi";

import SmallCollapsableBlock from '../SmallCollapsableBlock';
import SimpleTable from '../SimpleTable';
import { Link } from 'react-router-dom';
import CollapsableContainer from '../CollapsableContainer';
import VerticalTable from '../VerticalTable';
import ActionButton from '../UI/ActionButton';
import TwoColumn from '../TwoColumn';
import SimpleText from '../UI/Text';
import { FaBuildingUser } from 'react-icons/fa6';
import { BsCashStack, BsPerson } from 'react-icons/bs';

function AdditionalInfoTab() {
    return ( 
        <>
            <BigCollapsableBlock 
                icon={<HiOutlineAcademicCap />}
                name={'СВЕДЕНИЯ ПО ОБРАЗОВАНИЮ'}
            >
                <SmallCollapsableBlock 
                    name={'Среднее образование'}
                    count={2}
                >
                    <SimpleTable 
                        columns={[
                            'БИН',
                            'Название',
                            'Тип школы',
                            'Год поступления',
                            'Год окончания',
                            'Нагрудный знак',
                            'Класс'
                        ]}
                        rows={[
                            [
                                '163465765890',
                                'Школа-гимназия...',
                                'Лицей',
                                '1/09/2010',
                                '15/06/2020',
                                'Нагрудный знак',
                                '9'
                            ],
                            [
                                '163465765890',
                                'Школа-гимназия...',
                                'Лицей',
                                '1/09/2010',
                                '15/06/2020',
                                'Нагрудный знак',
                                '11'
                            ],
                        ]}
                    />
                </SmallCollapsableBlock>

                <SmallCollapsableBlock 
                    name={'Высшее образование '}
                    count={1}
                >
                    <SimpleTable 
                        columns={[
                            'БИН ВУЗА',
                            'Название',
                            'Тип ВУЗ',
                            'Год поступления',
                            'Год окончания',
                            'Специальность',
                        ]}
                        rows={[
                            [
                                '163465765890',
                                'Astana IT University',
                                'Акционерное',
                                '1/09/2010',
                                '15/06/2020',
                                'Software Engineering',
                            ],
                        ]}
                    />
                </SmallCollapsableBlock>
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<PiHouseLine />}
                name={'СВЕДЕНИЯ ПО РЕЕСТРУ НЕДВИЖИМОСТИ'}
            >
                <SmallCollapsableBlock 
                    name={'Текущие'}
                    count={1}
                >
                    <CollapsableContainer
                        name={'1. Квартира, Cтатус: "текущий", 2019-02-04 -'}
                    >
                        <VerticalTable 
                            data={{
                                'Кадастровый номер №': '123032653567',
                                'Адрес': 'Иванов Иван Иванович',
                                'Правообладатель': '141592653589',
                                'Этажность': '6/9',
                                'Площадь общая': '103',
                                'Жилая площадь': '86',
                                'Вид документа': 'ДКП',
                                'Номер документа': '№113 от 18/07/2024 ДКП',
                                'Дата документа': '10/07/2024',
                                'Дата регистрации': '12/10/2012',
                                'Дата прекращения': '---',
                                'ИИН/БИН продавца': '793238453526',
                                'ФИО/Наименование продавца': 'Bazis',
                                'Сумма сделки (стоимость)': '33 000 000',
                            }}
                        />
                        <div className="actions">
                            <ActionButton 
                                onClick={() => {}}
                                value={'Детальный просмотр (Купил-Продал)'}
                            />
                        </div>
                    </CollapsableContainer>
                </SmallCollapsableBlock>

                <SmallCollapsableBlock 
                    name={'Исторические'}
                    count={1}
                >
                    <CollapsableContainer
                        name={'1. Квартира, Cтатус: "текущий", 2019-02-04 -'}
                    >
                        <VerticalTable 
                            data={{
                                'Кадастровый номер №': '123032653567',
                                'Адрес': 'Иванов Иван Иванович',
                                'Правообладатель': '141592653589',
                                'Этажность': '6/9',
                                'Площадь общая': '103',
                                'Жилая площадь': '86',
                                'Вид документа': 'ДКП',
                                'Номер документа': '№113 от 18/07/2024 ДКП',
                                'Дата документа': '10/07/2024',
                                'Дата регистрации': '12/10/2012',
                                'Дата прекращения': '---',
                                'ИИН/БИН продавца': '793238453526',
                                'ФИО/Наименование продавца': 'Bazis',
                                'Сумма сделки (стоимость)': '33 000 000',
                            }}
                        />
                        <div className="actions">
                            <ActionButton 
                                onClick={() => {}}
                                value={'Детальный просмотр (Купил-Продал)'}
                            />
                        </div>
                    </CollapsableContainer>
                </SmallCollapsableBlock>
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<IoCarSharp />}
                name={'СВЕДЕНИЯ ПО ТРАНСПОРТУ'}
            >
                <TwoColumn>
                    <CollapsableContainer
                        name={'1. BMW M4, Регистрационный номер №A314SPY, Статус: текущий, 2021-03-12 - '}
                    >
                        <VerticalTable 
                            twoColumn={false}
                            data={{
                                'Дата регистрации с': '12/03/2021',
                                'Дата регистрации по': '---',
                                'Категория': 'B',
                                'Дата выдачи свидетельства': '12/03/2021',
                                'Серия и регистрационный № свидетельства': 'UN21313, 1290312',
                                'VIN/Кузов/Шасси': 'KZDS213',
                                'Год выпуска ТС': '2020',
                                'Объем двигателя см.куб': '5',
                                'Цвет': 'BLACK',
                                'Масса без нагрузки': '3210',
                                'Разрешенная max масса': '3700',
                                'Особые отметки': 'Договор',
                                'Отметка о снятии с учета': '12/09/2020'
                            }}
                        />
                    </CollapsableContainer>
                    <CollapsableContainer
                        name={'2. TOYOTA CAMRY, Регистрационный номер №A484DPN, Статус: исторический, 2005-09-13 - 2009-04-10'}
                    >
                    
                    </CollapsableContainer>
                </TwoColumn>

            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<LuSailboat />}
                name={'ДРУГИЕ ВИДЫ ТРАНСПОРТА'}
            >
                <SimpleText>Нет данных</SimpleText>
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<PiGear />}
                name={'ТЕХНИКА'}
            >
                <SimpleText>Нет данных</SimpleText>
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<PiMedalMilitary />}
                name={'ВОИНСКИЙ УЧЕТ'}
            >
                <SimpleTable 
                    columns={[
                        'БИН',
                        'Наименование',
                        'Дата службы'
                    ]}
                    rows={[
                        [
                            '163465765890',
                            'Войнская часть',
                            '3/09/2023 - '
                        ]
                    ]}
                />
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<FaBuildingUser />}
                name={'Сведения об участии в ЮЛ'}
            >
                <SimpleText>Нет данных</SimpleText>
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<BsCashStack />}
                name={'Пенсионные отчисления'}
            >
                <SimpleText>Нет данных</SimpleText>
            </BigCollapsableBlock>

            <BigCollapsableBlock 
                icon={<BsPerson />}
                name={'ИП/КХ'}
            >
                <SimpleText>Нет данных</SimpleText>
            </BigCollapsableBlock>
        </>
    );
}

export default AdditionalInfoTab;