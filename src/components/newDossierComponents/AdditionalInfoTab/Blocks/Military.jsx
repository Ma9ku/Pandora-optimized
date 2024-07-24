import { PiMedalMilitary } from "react-icons/pi";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";

function Military({
    data
}) {
    return ( 
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
                rows={
                    data 
                        ? data.map((item) => {
                            return [
                                item.bin || '---',
                                item.name || '---',
                                `${item.dateStart.substring(0, 10)} - ${item.dateEnd.substring(0, 10)}`
                            ]
                        }) 
                        : []
                }
            />
        </BigCollapsableBlock>
     );
}

export default Military;