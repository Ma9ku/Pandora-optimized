import OKED from "./Blocks/OKED";
import RegUl1Address from "./Blocks/RegUl1Address";
import UlInfo from "./Blocks/UlInfo";
import Contacts from "./Blocks/Contacts";
import Buhgalter from "./Blocks/Buhgalter";
import DL from "./Blocks/DL";

function UlMainInfoTabs({
    data
}) {

    if (data === undefined || data === null) {
        return null;
    }

    return ( 
        <>
            <Buhgalter data={data ? data.accountantListEntities : []} />
            <UlInfo data={[]}/>
            <OKED data={[]}/>
            <RegUl1Address data={[]}/>
            <Contacts data={data ? data.fl_contacts : []}/>
            <DL data={data ? data.pdls : []} />
        </>
    );
}

export default UlMainInfoTabs;