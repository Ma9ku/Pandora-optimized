import { useEffect, useState } from "react";
import BigCollapsableBlock from "../../BigCollapsableBlock";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import SmallCollapsableBlock from "../../SmallCollapsableBlock";
import SimpleTable from "../../SimpleTable";

function Education({
    data
}) {

    const [ schools, setSchools ] = useState([]);
    const [ universities, setUniversities ] = useState([]);

    useEffect(() => {

        console.log(data);

        setSchools(prev => {
            if (data.schools === null || data.schools === undefined || data.schools.length === 0) return []

            return data.schools.map(school => {
                return [
                    school.school_code,
                    school.school_name,
                    school.school_type,
                    school.start_date,
                    school.end_date,
                    school.breast_plate,
                    school.grade
                ]
            })
        });

        setUniversities(prev => {
            if (data.universities === null || data.universities === undefined || data.universities.length === 0) return []

            return data.universities.map(university => {
                return [
                    university.study_code,
                    university.study_name,
                    university.study_type,
                    university.start_date,
                    university.end_date,
                    university.spec_name,
                ]
            })
        })

    }, []);

    return ( 
        <BigCollapsableBlock 
            icon={<HiOutlineAcademicCap />}
            name={'СВЕДЕНИЯ ПО ОБРАЗОВАНИЮ'}
        >
            <SmallCollapsableBlock 
                name={`Среднее образование (${schools.length})`}
                // count={data.schools.length}
            >
                <SimpleTable 
                    columns={[
                        'БИН',
                        'Название',
                        'Тип школы',
                        'Год поступления',
                        'Год окончания',
                        'Нагрудный знак',
                        'Класс'
                    ]}
                    rows={schools}
                />
            </SmallCollapsableBlock>

            <SmallCollapsableBlock 
                name={`Высшее образование (${universities.length})`}
            >
                <SimpleTable 
                    columns={[
                        'БИН ВУЗА',
                        'Название',
                        'Тип ВУЗ',
                        'Год поступления',
                        'Год окончания',
                        'Специальность',
                    ]}
                    rows={universities}
                />
            </SmallCollapsableBlock>
        </BigCollapsableBlock>
    );
}

export default Education;