import BigCollapsableBlock from "../BigCollapsableBlock";

import { MdFamilyRestroom } from "react-icons/md";
import SimpleTable from "../SimpleTable";
import TwoColumn from "../TwoColumn";
import PersonCard from "../PersonCard";
import DocsCard from "../DocsCard";
import { useState } from "react";

const RelationsTab = (() => {
    const [relIIN, setRelIIN] = useState('');

    return (
        <>
            <BigCollapsableBlock
                icon={<MdFamilyRestroom />}
                name={'СВЕДЕНИЯ О РОДСТВЕННИКАХ ФЛ'}
            >
                <SimpleTable 
                    columns={[
                        { value: 'Родство', align: 'left' },
                        { value: 'ФИО', align: 'left' },
                        { value: 'Дата регистрации брака', align: 'center' },
                        { value: 'Дата расторжения брака', align: 'center' },
                        { value: 'ИИН', align: 'left' },
                    ]}
                    rows={[
                        [
                            'ОТЕЦ', 'Ахмедия Еркебулан Серикович', '', '', '710234551504'
                        ],
                        [
                            'МАТЬ', 'Ахмедия Еркебулан Серикович', '', '', '710234551504'
                        ],
                    ]}
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
               
            </BigCollapsableBlock>
        </>
    )
})

export default RelationsTab;