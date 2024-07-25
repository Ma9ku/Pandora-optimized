import ESF from "../RisksTab/Blocks/ESF";
import GosZakup from "./Blocks/GosZakup";
import Nalogi from "./Blocks/Nalogi";
import SamrukZakup from "./Blocks/SamrukZakup";

function UlInfoTab({ 
    data
}) {
    return ( 
        <>
            <ESF data={[]}/>
            <GosZakup data={[]}/>
            <SamrukZakup data={[]}/>
            <Nalogi data={[]}/>
        </>
    );
}

export default UlInfoTab;