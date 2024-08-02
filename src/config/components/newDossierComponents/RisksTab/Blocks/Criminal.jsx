import { RiCriminalFill } from "react-icons/ri";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { useEffect, useState } from "react";
import SimpleTable from "../../SimpleTable";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";

function Criminal({ 
    criminal,
    convictsAbroad,
    convictsJustified,
    convictsTerminatedByRehab,
 }) {
    // const [rows, setRows] = useState([]);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        setExist(prev => {
            if (criminal.length > 0) return true;
            if (convictsAbroad.length > 0) return true;
            if (convictsJustified.length > 0) return true;
            if (convictsTerminatedByRehab.length > 0) return true;

            return false;
        })
    }, []);

    return ( 
        <BigCollapsableBlock 
            exist={exist}
            name={'Сведения о судимости'}
            icon={<RiCriminalFill />}
        >
            {/* <SmallCollapsableBlock
                name={'Осужденные'}
                count={0}
            >
                
            </SmallCollapsableBlock> */}

            <SmallCollapsableBlock
                name={'Осужденные прекращено судом'}
                count={convictsTerminatedByRehab.length}
            >
                {convictsTerminatedByRehab.length > 0 ? (
                    <SimpleTable 
                        columns={[
                            'ЕРДР Номер',
                            'Орган',
                            'Последнее решение по делу',
                            'Дата последнего решения',
                            'Квалификация',
                        ]}
                        rows={convictsTerminatedByRehab.map(item => [
                            item.erdr_number || "---",
                            item.investigative_authority || "---",
                            item.last_solution || "---",
                            item.last_solution_date ? item.last_solution_date.substring(0, 10) : "---",
                            item.qualification_desc || "---",
                        ])}
                    />
                ) : (
                    <SimpleText>Нет данных</SimpleText>
                )}
            </SmallCollapsableBlock>
{/* 
            <SmallCollapsableBlock
                name={'Сведения о судимости'}
                count={0}
            >
                
            </SmallCollapsableBlock> */}

            <SmallCollapsableBlock
                name={'Осужденные/Оправданные/прекращено органом'}
                count={convictsJustified.length}
            >
                {convictsJustified.length > 0 ? (
                    <SimpleTable 
                        columns={[
                            'ЕРДР Номер',
                            'Суд первой инстанции',
                            'Квалификация',
                            'Решение по делу',
                            'Код решения по делу',
                            'Дата регистрации',
                        ]}
                        rows={convictsJustified.map(item => [
                            item.erdr_number || "---",
                            item.court_of_first_instance || "---",
                            item.qualification || "---",
                            item.decision_on_person || "---",
                            item.code_desicion_by_person || "---",
                            item.entry_data ? item.entry_data.substring(0, 10) : "---",
                        ])}
                    />
                ) : (
                    <SimpleText>Нет данных</SimpleText>
                )}
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные за рубежом'}
                count={convictsAbroad.length}
            >
                {convictsAbroad.length > 0 ? (
                    <SimpleTable 
                        columns={[
                            'Страна',
                            'Дата суда',
                            'Орган',
                            'Решение суда',
                            'Приговор',
                        ]}
                        rows={convictsAbroad.map(item => [
                            item.country || "---",
                            item.entry_data ? item.entry_data.substring(0, 10) : "---",
                            item.sud_organ || "---",
                            item.qualification || "---",
                            item.measure || "---",
                        ])}
                    />
                ) : (
                    <SimpleText>Нет данных</SimpleText>
                )}
            </SmallCollapsableBlock>

            {/* <SmallCollapsableBlock
                name={'Заключенные'}
                count={0}
            >
                
            </SmallCollapsableBlock> */}
        </BigCollapsableBlock>
    );
}

export default Criminal;