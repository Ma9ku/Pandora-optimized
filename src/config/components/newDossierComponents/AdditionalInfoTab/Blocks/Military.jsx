import { PiMedalMilitary } from "react-icons/pi";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleTable from "../../SimpleTable";
import SimpleText from "../../UI/Text";

function Military({
    data
}) {
    return ( 
        <BigCollapsableBlock 
            exist={data && data.length ? true : false}
            icon={<PiMedalMilitary />}
            name={'ВОИНСКИЙ УЧЕТ'}
        >
            {
                data && Array.isArray(data) && data.length > 0 
                ? (
                    <SimpleTable 
                        columns={[
                            'БИН',
                            'Наименование',
                            'Дата службы'
                        ]}
                        rows={
                            data && data.length > 0
                                ? data.map((item) => {
                                    return [
                                        item.bin || '---',
                                        item.binName || '---',
                                        `${item.dateStart.substring(0, 10)} - ${item.dateEnd.substring(0, 10)}`
                                    ]
                                }) 
                                : []
                        }
                    />
                ) : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
     );
}

export default Military;