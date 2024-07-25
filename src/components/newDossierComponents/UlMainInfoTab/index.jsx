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
            <UlInfo data={[]}/>
            <OKED data={[]}/>
            <RegUl1Address data={[]}/>
            <Contacts data={[]}/>
            <Buhgalter data={[]} />
            <DL data={[]} />
        </>
    );
}

export default UlMainInfoTabs;