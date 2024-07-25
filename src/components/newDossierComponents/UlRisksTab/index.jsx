import BlockESF from "./Blocks/BlockESF";
import Inactive from "./Blocks/Inactive";
import Kartochki from "./Blocks/Kartochki";
import NDS_Uchet from "./Blocks/NDS_Uchet";
import OMN from "./Blocks/OMN";
import OPG from "./Blocks/OPG";
import OPG_Acts from "./Blocks/OPG_Acts";
import PKB from "./Blocks/PKB";
import RiskFls from "./Blocks/RiskFls";
import Debt from "./Blocks/Debt";
import Proverki from "./Blocks/Proverki";
import Adms from "./Blocks/Adms";

function UlRisksTab({
    data
}) {
    return ( 
        <>
            <Adms data={data ? data.adms : []}/>
            <BlockESF data={[]}/>
            <OPG data={[]}/>
            <OPG_Acts data={[]}/>
            <NDS_Uchet data={[]}/>
            <RiskFls data={[]}/>
            <Kartochki data={[]}/>
            <OMN data={[]}/>
            <Inactive data={[]}/>
            <PKB data={[]}/>
            <Debt data={[]}/>
            <Proverki data={[]}/>
        </>
    );
}

export default UlRisksTab;