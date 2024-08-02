import { BsCashStack } from "react-icons/bs";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import SimpleText from "../../UI/Text";
import SimpleTable from "../../SimpleTable";

function Buhgalter({
    data
}) {
    return ( 
        <BigCollapsableBlock
            name={'Бухгалтеры'}
            icon={<BsCashStack />}
        >
            {
                data && data.length > 0
                    ? <SimpleTable 
                            columns={[
                                'ИИН',
                                'Фамилия',
                                'Имя',
                            ]}
                            rows={
                                data
                                .filter(item => item !== null || item !== undefined)
                                .map(item => [
                                    item.iin || '---',
                                    item.lname || '---',
                                    item.fname || '---',
                                ])
                            }   
                        />
                    : <SimpleText>Нет данных</SimpleText>
            }
        </BigCollapsableBlock>
    );
}

export default Buhgalter;