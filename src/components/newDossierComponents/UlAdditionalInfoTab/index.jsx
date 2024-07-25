import NedvReestr from "./Blocks/NedvReestr";
import Transport from "./Blocks/Transport";
import OtherTransport from "./Blocks/OtherTransport";
import Equipment from "./Blocks/Equipment";
import FlUl from "./Blocks/FlUl";
import Pension from "./Blocks/Pension";
import FPG from "./Blocks/FPG";
import { useEffect } from "react";

function UlAdditionalInfoTab({
    data
}) {

    useEffect(() => {
        if (data === null || data === undefined) return;
        
        
    }, [data])

    return ( 
        <>
            <FlUl data={data ? data.svedenyaObUchastnikovUlEntities : []}/>
            <NedvReestr data={data ? data.mvRnOlds : []}/>
            <Transport data={[]}/>
            <OtherTransport data={[]}/>
            <Equipment data={[]}/>
            <Pension data={[]}/>
            <FPG data={[]}/>
        </>
    );
}

export default UlAdditionalInfoTab;