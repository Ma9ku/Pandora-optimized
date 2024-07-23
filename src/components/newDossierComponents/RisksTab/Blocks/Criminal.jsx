import { RiCriminalFill } from "react-icons/ri";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import { useEffect, useState } from "react";
import SimpleTable from "../../SimpleTable";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";

function Criminal({ data }) {

    useEffect(() => {
        
    }, [])

    return ( 
        <BigCollapsableBlock 
            name={'Сведения о судимости'}
            icon={<RiCriminalFill />}
        >
            <SmallCollapsableBlock
                name={'Осужденные'}
                count={1}
            >
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные прекращено судом'}
                count={1}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Сведения о судимости'}
                count={1}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные/Оправданные/прекращено органом'}
                count={1}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Осужденные за рубежом'}
                count={1}
            >
                
            </SmallCollapsableBlock>

            <SmallCollapsableBlock
                name={'Заключенные'}
                count={1}
            >
                
            </SmallCollapsableBlock>
        </BigCollapsableBlock>
    );
}

export default Criminal;