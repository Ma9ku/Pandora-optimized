
import React, { useState, useEffect } from 'react'
import './leftbar.scss'
import './spinner.scss'
import axios from 'axios'


import GenericInput from '../components/GenericInput/genericInput'
import CompactLogs from './compactLogs/CompactLogs'
// import allRelations from '../../../data/Relations'
import { allRelations, relationsZags } from '../../../data/relationsData'
//icons
import regularIcon from '../images/refularIcon.svg'
import zagsIcon from '../images/zagsIcon.svg'
import historyIcon from '../images/searchIcon.svg'
import { setRef } from '@mui/material'
import LayoutController from '../../../components/itapComponents copy/LayoutController/LayoutController'


function LeftBar({initObject, initObject2, initType, handleDownload, handleLayout, graphType, dbVariant, setDbVariant, Submit}) {
    const [newRequest, setNewRequest] = useState(true)

    const [searchType, setSearchType] = useState(initType ? initType : 'fl')

    const [fl_1_searchType, setFl_1_SearchType] = useState('iin')
    const [fl_2_searchType, setFl_2_SearchType] = useState('iin')
    const [object1, setObject1] = useState(initObject ? initObject : '')
    const [object2, setObject2] = useState(initObject2 ? initObject2 : '')

    //FIO formdata
    const [check1, setCheck1] = useState(false)
    const [check2, setCheck2] = useState(false)

    const [f1SearchType, setf1SearchType] = useState('starts')
    const [s1SearchType, sets1SearchType] = useState('starts')
    const [m1SearchType, setm1SearchType] = useState('starts')
    const [f2SearchType, setf2SearchType] = useState('starts')
    const [s2SearchType, sets2SearchType] = useState('starts')
    const [m2SearchType, setm2SearchType] = useState('starts')
    const [fname1, setFname1] = useState('')
    const [sname1, setSname1] = useState('')
    const [mfname1, setMname1] = useState('')
    const [fname2, setFname2] = useState('')
    const [sname2, setSname2] = useState('')
    const [mfname2, setMname2] = useState('')

    const [relations, setRelations] = useState([])

    useEffect(() => {
        setFl_1_SearchType('iin')
        setFl_2_SearchType('iin')
    }, [graphType])

    //Graph
    const [limit, setLimit] = useState(20)
    const [depth, setDepth] = useState(1)

    const clearOptions = () => {
        setSearchType("fl")
        setFl_1_SearchType("iin")
        setFl_2_SearchType("iin")
        setObject1("")
        setObject2("")
        setf1SearchType("starts")
        sets1SearchType("starts")
        setm1SearchType("starts")
        setf2SearchType("starts")
        sets2SearchType("starts")
        setm2SearchType("starts")
        setFname1("")
        setSname1("")
        setMname1("")
        setFname2("")
        setSname2("")
        setMname2("")
        setDepth(1)
        setLimit(20)
    }

    const handleSubmit = () => {
        let endPoint = ''
        let params = {}
        let options = {}
        let keys = []
        let firstName1 = f1SearchType == 'starts' ? fname1 + '.*' : f1SearchType == 'ends' ? '.*' + fname1 : '.*' + fname1 + '.*'
        let lastName1 = s1SearchType == 'starts' ? sname1 + '.*' : s1SearchType == 'ends' ? '.*' + sname1 : '.*' + sname1 + '.*'
        let fatherName1 = m1SearchType == 'starts' ? mfname1 + '.*' : m1SearchType == 'ends' ? '.*' + mfname1 : '.*' + mfname1 + '.*'
        let firstName2 = f2SearchType == 'starts' ? fname2 + '.*' : f2SearchType == 'ends' ? '.*' + fname2 : '.*' + fname2 + '.*'
        let lastName2 = s2SearchType == 'starts' ? sname2 + '.*' : s2SearchType == 'ends' ? '.*' + sname2 : '.*' + sname2 + '.*'
        let fatherName2 = m2SearchType == 'starts' ? mfname2 + '.*' : m2SearchType == 'ends' ? '.*' + mfname2 : '.*' + mfname2 + '.*'
        if (searchType == 'fl') {
            if (fl_1_searchType == 'iin') {
                endPoint = '/fltree'
                params = {person: object1, relations: relations.join(','), depth, limit}
                options = {mode: 'fl', iin1: object1, iin2: ''}
                keys.push(object1)
            }
            else {
                endPoint = '/flFIOtree'
                if (check1) {
                    params = {
                        check1,
                        firstName1: fname1,
                        lastName1: sname1,
                        fatherName1: mfname1,
                        relations: relations.join(','), 
                        depth, 
                        limit
                    }
                } else {
                    params = {
                        check1,
                        firstName1,
                        lastName1,
                        fatherName1,
                        relations: relations.join(','), 
                        depth, 
                        limit
                    }
                }
            }
        } else if (searchType == 'flfl') {
            if (fl_1_searchType == 'iin') {
                endPoint = "/shortestpaths";
                params = {person: object1, person2: object2, relations: relations.join(',')}
                options = {mode: 'flfl', iin1: object1, iin2: object2}
                keys.push(object1)
                keys.push(object2)
            } else {
                endPoint = "/shortestpathsByFIO";
                params = {
                    check1,
                    firstName1,
                    lastName1,
                    fatherName1,
                    check2,
                    firstName2,
                    lastName2,
                    fatherName2,
                    relations: relations.join(',')
                }
            }
        } else if (searchType == 'flul') {
            if (fl_1_searchType == "iin") {
                endPoint = "/flulpath";
                params = {person: object1, ul: object2, relations: relations.join(',')}
                options = {mode: 'flul', iin1: object1, iin2: object2}
                keys.push(object1)
                keys.push(object2)
            } else {
                endPoint = "/flulpathByFIO";
                params = {
                    check1,
                    firstName1,
                    lastName1,
                    fatherName1,
                    ul: object2,
                    relations: relations.join(',')
                }
                keys.push(object2)
            }
        } else if (searchType == 'ul') {
            endPoint = "/ultree";
            params = {ul: object1, relations: relations.join(','), depth, limit }
            options = {mode: 'ul', iin1: object1, iin2: ''}
            keys.push(object1)
        } else if (searchType == 'ulul') {
            endPoint = "/ululpath";
            params = {ul1: object1, ul2: object2, relations: relations.join(',') }
            options = {mode: 'ulul', iin1: object1, iin2: object2}
            keys.push(object1)
            keys.push(object2)
        }

        Submit(params, endPoint, newRequest, keys, options)
        
        // let options = {
        //     iin1, iin2, limit, depth, mode, relString, approvementObject, searchOption, checks1, checks2, fam1, nam1, fath1, fam2, nam2, fath2
        // }
    }



    return (
        <div className="left-bar">
            <div className='state-and-inputs'>
                <div className='state-changer'>
                    <div>
                        <button onClick={() => setDbVariant('regular')} className='regular'><img src={regularIcon}/><a>ОБЫЧНЫЙ</a></button>
                        {/* <button onClick={() => setDbVariant('zags')} className='zags'><img src={zagsIcon}/><a>ЗАГС</a></button> */}
                        <button onClick={() => setDbVariant('history')} className='zags'><img src={historyIcon}/><a>ИСТОРИЯ</a></button>
                    </div>
                        {/* <button onClick={() => setDbVariant('history')}><img src={historyIcon}/><a>ИСТОРИЯ</a></button> */}
                </div>
                {['regular', 'zags'].includes(dbVariant) ? 
                <div className="inputs">
                    <div className="base-search-type">
                        <label>Вид связи</label>
                        {dbVariant == 'regular' ? 
                        <select value={searchType} onChange={(e) => {
                                setNewRequest(true)
                                setSearchType(e.target.value)
                            }}>
                            <option value={"fl"}>ФЛ</option>
                            <option value={"ul"}>ЮЛ</option>
                            <option value={"flfl"}>ФЛ-ФЛ</option>
                            <option value={"flul"}>ФЛ-ЮЛ</option>
                            <option value={"ulul"}>ЮЛ-ЮЛ</option>
                        </select>
                        : 
                        <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                            <option value={"fl"}>ФЛ</option>
                            <option value={"flfl"}>ФЛ-ФЛ</option>
                        </select>
                        }
                    </div>
                    <h2>Первый объект</h2>
                    {['fl', 'flfl', 'flul'].includes(searchType) ? 
                        (graphType == 'graph' ? 
                            <GenericInput 
                                label="Поиск по ФЛ через" 
                                type="select" 
                                options={[
                                    { label: 'ФИО', value: 'fio' },
                                    { label: 'ИИН', value: 'iin' },
                                ]}
                                value={fl_1_searchType} 
                                onChange={setFl_1_SearchType} 
                                stateWare={setNewRequest}
                            />
                            : 
                            <GenericInput 
                                label="Поиск по ФЛ через" 
                                type="select" 
                                options={[
                                    { label: 'ИИН', value: 'iin' },
                                ]}
                                value={fl_1_searchType} 
                                onChange={setFl_1_SearchType} 
                                stateWare={setNewRequest}
                            />)
                        
                        : null
                    }
                    {fl_1_searchType == 'iin' && ['fl', 'flfl', 'flul'].includes(searchType) ? 
                    <GenericInput 
                        label="Введите ИИН"
                        type="text" 
                        value={object1} 
                        onChange={setObject1} 
                        stateWare={setNewRequest}
                    />
                    : fl_1_searchType == 'fio' && ['fl', 'flfl', 'flul'].includes(searchType) ? 
                        // First object is fl and type is fio
                        <div className="fio-container">

                            <div className="concrete-fio">
                                <input type="checkbox" checked={check1} onChange={() => setCheck1(!check1)} name="" id="" />
                                <label htmlFor="">Точный поиск</label>
                            </div>

                            {check1 ? 
                                <>
                                <GenericInput 
                                    label="Фамилия"
                                    type="text" 
                                    value={sname1} 
                                    onChange={setSname1} 
                                    stateWare={setNewRequest}

                                    />
                                <GenericInput 
                                    label="Имя"
                                    type="text" 
                                    value={fname1} 
                                    onChange={setFname1} 
                                    stateWare={setNewRequest}

                                    />
                                <GenericInput 
                                    label="Отчество"
                                    type="text" 
                                    value={mfname1} 
                                    onChange={setMname1} 
                                    stateWare={setNewRequest}

                                    />
                                </>
                                :
                                <>
                                <div className='fio-wrapper'>
                                    <label>Фамилия</label>
                                        <div className="fio-type-selector">
                                            <div className="input-fixed">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="select" 
                                                    options={[
                                                        { label: 'Начинается', value: 'starts' },
                                                        { label: 'Заканчивается', value: 'ends' },
                                                        { label: 'Содержит', value: 'includes' },
                                                    ]}
                                                    value={s1SearchType}
                                                    onChange={sets1SearchType} 
                                                    stateWare={setNewRequest}

                                                    />
                                            </div>
                                            <div className="input-flexible">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="text" 
                                                    value={sname1} 
                                                    onChange={setSname1} 
                                                    stateWare={setNewRequest}

                                                    />
                                            </div>
                                        </div>
                                </div>
                                <div className='fio-wrapper'>
                                    <label>Имя</label>
                                        <div className="fio-type-selector">
                                            <div className="input-fixed">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="select" 
                                                    options={[
                                                        { label: 'Начинается', value: 'starts' },
                                                        { label: 'Заканчивается', value: 'ends' },
                                                        { label: 'Содержит', value: 'includes' },
                                                    ]}
                                                    value={f1SearchType}
                                                    onChange={setf1SearchType} 
                                                    stateWare={setNewRequest}

                                                    />
                                            </div>
                                            <div className="input-flexible">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="text" 
                                                    value={fname1} 
                                                    onChange={setFname1} 
                                                    stateWare={setNewRequest}
                                                    />
                                            </div>
                                        </div>
                                </div>
                                <div className='fio-wrapper'>
                                    <label>Отчество</label>
                                    <div className="fio-type-selector">
                                        <div className="input-fixed">
                                            <GenericInput 
                                                // label="Введите ФИО"
                                                type="select" 
                                                options={[
                                                    { label: 'Начинается', value: 'starts' },
                                                    { label: 'Заканчивается', value: 'ends' },
                                                    { label: 'Содержит', value: 'includes' },
                                                ]}
                                                value={m1SearchType}
                                                onChange={setm1SearchType} 
                                                stateWare={setNewRequest}
                                                />
                                        </div>
                                        <div className="input-flexible">
                                            <GenericInput 
                                                // label="Введите ФИО"
                                                type="text" 
                                                value={mfname1} 
                                                onChange={setMname1} 
                                                stateWare={setNewRequest}
                                                />
                                        </div>
                                    </div>
                                </div>
                                </>
                            }
                            
                        </div>
                        : 
                        <GenericInput 
                            label="Введите БИН"
                            type="text" 
                            value={object1} 
                            onChange={setObject1}
                            stateWare={setNewRequest} 
                        />
                    }
                    {['ulul', 'flfl', 'flul'].includes(searchType) &&
                        <h2>Второй объект</h2>
                    }
                    {searchType == 'flfl' ? 
                        (
                            graphType == 'graph' ?
                            <GenericInput 
                                label="Поиск по второму ФЛ через" 
                                type="select" 
                                options={[
                                    { label: 'ФИО', value: 'fio' },
                                    { label: 'ИИН', value: 'iin' },
                                ]}
                                value={fl_2_searchType} 
                                onChange={setFl_2_SearchType} 
                                stateWare={setNewRequest}
                            />
                            :
                            <GenericInput 
                                label="Поиск по второму ФЛ через" 
                                type="select" 
                                options={[
                                    { label: 'ИИН', value: 'iin' },
                                ]}
                                value={fl_2_searchType} 
                                onChange={setFl_2_SearchType} 
                                stateWare={setNewRequest}
                            />

                        )
                        : null
                    }
                    {fl_2_searchType == 'iin' && searchType == 'flfl' ? 
                        <GenericInput 
                            label="Введите ИИН"
                            type="text" 
                            value={object2} 
                            onChange={setObject2} 
                            stateWare={setNewRequest}
                        />
                        : fl_2_searchType == 'fio' &&  searchType == 'flfl' ?
                        <div className="fio-container">
                            <div className="concrete-fio">
                                <input type="checkbox" checked={check2} onChange={() => setCheck2(!check2)} name="" id="" />
                                <label htmlFor="">Точный поиск</label>
                            </div>

                            {check2 ? 
                                <>
                                <GenericInput 
                                    label="Фамилия"
                                    type="text" 
                                    value={sname2} 
                                    onChange={setSname2} 
                                    stateWare={setNewRequest}
                                    />
                                <GenericInput 
                                    label="Имя"
                                    type="text" 
                                    value={fname2} 
                                    onChange={setFname2} 
                                    stateWare={setNewRequest}
                                    />
                                <GenericInput 
                                    label="Отчество"
                                    type="text" 
                                    value={mfname2} 
                                    onChange={setMname2} 
                                    stateWare={setNewRequest}
                                    />
                                </>
                                :
                                <>
                                <div className='fio-wrapper'>
                                    <label>Фамилия</label>
                                        <div className="fio-type-selector">
                                            <div className="input-fixed">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="select" 
                                                    options={[
                                                        { label: 'Начинается', value: 'starts' },
                                                        { label: 'Заканчивается', value: 'ends' },
                                                        { label: 'Содержит', value: 'includes' },
                                                    ]}
                                                    value={s2SearchType}
                                                    onChange={sets2SearchType} 
                                                    stateWare={setNewRequest}
                                                    />
                                            </div>
                                            <div className="input-flexible">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="text" 
                                                    value={sname2} 
                                                    onChange={setSname2} 
                                                    stateWare={setNewRequest}
                                                    />
                                            </div>
                                        </div>
                                </div>
                                <div className='fio-wrapper'>
                                    <label>Имя</label>
                                        <div className="fio-type-selector">
                                            <div className="input-fixed">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="select" 
                                                    options={[
                                                        { label: 'Начинается', value: 'starts' },
                                                        { label: 'Заканчивается', value: 'ends' },
                                                        { label: 'Содержит', value: 'includes' },
                                                    ]}
                                                    value={f2SearchType}
                                                    onChange={setf2SearchType} 
                                                    stateWare={setNewRequest}
                                                    />
                                            </div>
                                            <div className="input-flexible">
                                                <GenericInput 
                                                    // label="Введите ФИО"
                                                    type="text" 
                                                    value={fname2} 
                                                    onChange={setFname2} 
                                                    stateWare={setNewRequest}
                                                    />
                                            </div>
                                        </div>
                                </div>
                                <div className='fio-wrapper'>
                                    <label>Отчество</label>
                                    <div className="fio-type-selector">
                                        <div className="input-fixed">
                                            <GenericInput 
                                                // label="Введите ФИО"
                                                type="select" 
                                                options={[
                                                    { label: 'Начинается', value: 'starts' },
                                                    { label: 'Заканчивается', value: 'ends' },
                                                    { label: 'Содержит', value: 'includes' },
                                                ]}
                                                value={m2SearchType}
                                                onChange={setm2SearchType} 
                                                stateWare={setNewRequest}
                                                />
                                        </div>
                                        <div className="input-flexible">
                                            <GenericInput 
                                                // label="Введите ФИО"
                                                type="text" 
                                                value={mfname2} 
                                                onChange={setMname2} 
                                                stateWare={setNewRequest}
                                                />
                                        </div>
                                    </div>
                                </div>
                                </>
                            }
                        </div>
                        : ['ulul', 'flul'].includes(searchType) ?
                        <GenericInput 
                            label="Введите БИН"
                            type="text" 
                            value={object2} 
                            onChange={setObject2} 
                            stateWare={setNewRequest}
                        /> : null

                    }
                        <div className='graph-settings'>
                            {['flfl', 'flul', 'ulul'].includes(searchType) ?
                                null 
                                :
                            <>
                                <GenericInput 
                                    label="Лимит" 
                                    type="number" 
                                    value={limit} 
                                    onChange={setLimit} 
                                    stateWare={setNewRequest}
                                    />
                                <GenericInput 
                                    label="Уровень" 
                                    type="number" 
                                    value={depth} 
                                    onChange={setDepth} 
                                    stateWare={setNewRequest}
                                    />
                            </>
                            }
                            {dbVariant == 'regular' ? 
                            <>
                                <GenericInput 
                                    label="Связи" 
                                    type="chip-selecter" 
                                    options={allRelations}
                                    value={relations} 
                                    onChange={setRelations}
                                    stateWare={setNewRequest} 
                                    />
                            </>
                            :
                            <GenericInput 
                                label="Связи" 
                                type="chip-selecter" 
                                options={relationsZags}
                                value={relations} 
                                onChange={setRelations} 
                                stateWare={setNewRequest}
                            />
                            }
                            <LayoutController handleLayoutGlobal={handleLayout} />
                        </div>
                </div>
                : dbVariant == 'history' ?
                <div className="inputs">
                    <CompactLogs />
                </div>
                : null
                }
            </div>
            <div className="submit-block">
                <a className='clear' onClick={handleDownload}>Скачать схему</a>

                <a className='clear' onClick={clearOptions}>Очистить</a>
                <a className='submit' onClick={handleSubmit}>Запустить</a>
            </div>
        </div>
    )
}

export default LeftBar