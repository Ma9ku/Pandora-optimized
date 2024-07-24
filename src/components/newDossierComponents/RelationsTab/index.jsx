import BigCollapsableBlock from "../BigCollapsableBlock";

import { MdFamilyRestroom } from "react-icons/md";
import SimpleTable from "../SimpleTable";
import TwoColumn from "../TwoColumn";
import PersonCard from "../PersonCard";
import DocsCard from "../DocsCard";
import { useState } from "react";
import ActionButton from "../UI/ActionButton";

import HierarchyChart from "../../../pages/dosPage/Hierarchy";

function RelationsTab({data, hierarchy, iin}) {
    const [relIIN, setRelIIN] = useState('');
    const [hierarchyMode, setHierarchyMode] = useState(false)
   

    const setMode = () => {
        setHierarchyMode(!hierarchyMode)
    }

    if (hierarchyMode) {
        return (
            <>
            <BigCollapsableBlock
                icon={<MdFamilyRestroom />}
                name={'ВИЗУАЛИЗАЦИЯ СВЕДЕНИИ О РОДСТВЕННИКАХ ФЛ'}
                switcher={setMode}
                switcherText={"Таблица"}
                defaultOpen={true}
            >
                <HierarchyChart iin={iin} />

            </BigCollapsableBlock>
            </>
        )
    }

    return (
        <>
            <BigCollapsableBlock
                icon={<MdFamilyRestroom />}
                name={'СВЕДЕНИЯ О РОДСТВЕННИКАХ ФЛ'}
                switcher={setMode}
                switcherText={"Визуализировать"}
                defaultOpen={true}
            >
                <SimpleTable 
                    columns={[
                        { value: 'Статус по отношению к родственнику', align: 'left' },
                        { value: 'ФИО', align: 'left' },
                        { value: 'Дата регистрации брака', align: 'center' },
                        { value: 'Дата расторжения брака', align: 'center' },
                        { value: 'ИИН', align: 'left' },
                    ]}
                    rows={data}
                    onRowClick={(e) => {
                        console.log(e)
                        setRelIIN(e.row_data[4] || '')
                    }}
                />

                {
                    relIIN && relIIN.length > 0
                    ? (
                        <div className="row-info">
                            <PersonCard _iin={relIIN} secondary={true} />
                            <DocsCard _iin={relIIN} secondary={true} />
                        </div>
                    ) : null
                }
               
                {
                    relIIN && relIIN.length > 0
                    ? (
                        <div className="actions">
                            <ActionButton 
                                value={'Перейти'}
                                onClick={() => {
                                    const url = `/profiler/person/` + relIIN
                                    window.open(url, '_blank', 'noopener,noreferrer')
                                  }}
                            />
                        </div>
                    ) : null
                }
            </BigCollapsableBlock>
        </>
    )
}

export default RelationsTab;