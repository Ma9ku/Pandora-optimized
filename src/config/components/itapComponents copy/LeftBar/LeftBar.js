import React, {useState, Component, useEffect} from "react";
import ReactDOM, { render } from "react-dom";
import './LeftBar.css'
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import ButtonGroup from '@mui/material/ButtonGroup';
import RelationBlock from "../Relation/RelationBlock";
import RelationBlockZags from "../Relation/RelationBlockZags";
import ApprovementModalWindow from "../ApprovementModal/ApprovementModalWindow";
import LayoutController from "../LayoutController/LayoutController";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import axios from 'axios'
const LeftBar = (props) => {
    const navigate = useNavigate()
    const reader = new FileReader()

    const [type, setType] = useState(props.type != '' ? props.type : '')

    const [newReq, setNewReq] = useState(true)
    const [iin1, setIIN1] = useState(props.object != '' ? props.object : '')
    const [iin2, setIIN2] = useState(props.object2 != '' ? props.object2 : '')

    const [searchOption, setSearchOption] = useState("iinOption")

    const [checks1, setChecks1] = useState(false)
    const [checks2, setChecks2] = useState(false)

    const [fname1, setFName1] = useState("")
    const [fname2, setFName2] = useState("")
    const [lname1, setLName1] = useState("")
    const [lname2, setLName2] = useState("")
    const [name1, setName1] = useState("")
    const [name2, setName2] = useState("")

    const [limit, setLimit] = useState(20)
    const [depth, setDepth] = useState(1)
    const [approvementObj, setApprovementObj] = useState({})

    const [modal, setModal] = useState(false)

    const getConnectionType = () => {
        if (type=="fl") {
            return "con1"
        } else if (type=="ul") {
            return "con4"
        } else if (type=="flfl") {
            return "con2"
        } else if (type=="flul") {
            return "con3"
        } else if (type=="ulul") {
            return "con5"
        } else {
            return "con1"
        }
    };

    const [mode, setMode] = useState(getConnectionType || "con1")
    const [relString, setRelString] = useState("")
    const [tab, setTab] = useState("search")

    useEffect(() => {
        props.setLeftTabs(tab)

        if (tab == "search" || tab == "zags") {
            var button = document.getElementById("initButton")
            let formSearchOptions = document.querySelector("#formSearchOptions");

            let iin1 = document.querySelector("#formIIN1");
            let iin2 = document.querySelector("#formIIN2");

            let formFio1 = document.querySelector("#formFio1")
            let formFio2 = document.querySelector("#formFio2")

            let formLimit = document.querySelector("#formLimit")
            let formDepth = document.querySelector("#formDepth")

            let formRels  = document.querySelector("#formRels")

            if (iin1 != '' && type == "fl") {
                let value = document.getElementById("connections").value;
                document.querySelector("#connections").value = "con1"

                iin1.style.display = 'flex';
                iin2.style.display = 'none';

                formFio1.style.display = 'none';
                formFio2.style.display = 'none';

                // setMode(value)

            iin1.childNodes[0].innerHTML = "Введите ИИН"

            formSearchOptions.style.display = 'flex';


            formLimit.style.display = 'flex';
            formDepth.style.display = 'flex';
            formRels.style.display = 'flex';
            props.update()
            setMode("con1")
            setTimeout(() => {
                var button = document.getElementById("initButton")
                button.click() }, 2000)
            } else if (iin1 != '' && type == "ul") {
                setMode("con4")
                iin1.childNodes[0].innerHTML = "Введите БИН"

                formSearchOptions.style.display = 'none';

                iin1.style.display = 'flex';
                iin2.style.display = 'none';

                formFio1.style.display = 'none';
                formFio2.style.display = 'none';

                formLimit.style.display = 'flex';
                formDepth.style.display = 'flex';

                formRels.style.display = 'flex';
                props.update()
                setTimeout(() => {
                    var button = document.getElementById("initButton")
                    button.click() }, 2000)
            } else if (iin1 != '' && iin2 != '' && type=='flfl') {
                setMode("con2")
                iin1.childNodes[0].innerHTML = "Введите ИИН"
                iin2.childNodes[0].innerHTML = "Введите второй ИИН"

                formSearchOptions.style.display = 'flex';

                iin1.style.display = 'flex';
                iin2.style.display = 'flex';

                formFio1.style.display = 'none';
                formFio2.style.display = 'none';

                formLimit.style.display = 'none';
                formDepth.style.display = 'none';

                formRels.style.display = 'flex';
                props.update()
                setTimeout(() => {
                    var button = document.getElementById("initButton")
                    button.click() }, 2000)
            } else if (iin1 != '' && iin2 != '' && type=='ulul') {
                setMode("con5")
                iin1.childNodes[0].innerHTML = "Введите БИН"
                iin2.childNodes[0].innerHTML = "Введите второй БИН"

                formSearchOptions.style.display = 'none';

                iin1.style.display = 'flex';
                iin2.style.display = 'flex';

                formFio1.style.display = 'none';
                formFio2.style.display = 'none';

                formLimit.style.display = 'none';
                formDepth.style.display = 'none';

                formRels.style.display = 'flex';
                props.update()
                setTimeout(() => {
                    var button = document.getElementById("initButton")
                    button.click() }, 2000)
            } else if (iin1 != '' && iin2 != '' && type=='flul') {
                setMode("con3")
                iin1.childNodes[0].innerHTML = "Введите ИИН"
                iin2.childNodes[0].innerHTML = "Введите БИН"

                formSearchOptions.style.display = 'flex';

                iin1.style.display = 'flex';
                iin2.style.display = 'flex';

                formFio1.style.display = 'none';
                formFio2.style.display = 'none';

                formLimit.style.display = 'none';
                formDepth.style.display = 'none';

                formRels.style.display = 'flex';
                props.update()
                setTimeout(() => {
                    var button = document.getElementById("initButton")
                    button.click() }, 2000)
            }
            else {
                let value = document.getElementById("connections").value;
                document.querySelector("#connections").value = "con1"

                iin1.style.display = 'flex';
                iin2.style.display = 'none';
                
                formFio1.style.display = 'none';
                formFio2.style.display = 'none';
                
                // setMode(value)
                
                iin1.childNodes[0].innerHTML = "Введите ИИН"
                
                formSearchOptions.style.display = 'flex';
                
                
                formLimit.style.display = 'flex';
                formDepth.style.display = 'flex';
                formRels.style.display = 'flex';
                props.update()
                setMode("con1")
            }
        }
    }, [tab])
    
    const [firstFamilia, setFirstFamilia] = useState('starts')
    const [firstName, setFirstName] =  useState('starts')
    const [firstFatherName, setFirstFatherName] = useState('starts')
    const [secondFamilia, setSecondFamilia] =  useState('starts')
    const [secondName, setSecondName] =  useState('starts')
    const [secondFatherName, setSecondFatherName] = useState('starts')

    const filter = (approvementObject) => {
        console.log("approvement", approvementObject)
        // const firstFamilia = document.getElementById('firstFamilia').value
        // const firstName = document.getElementById('firstName').value
        // const firstFatherName = document.getElementById('firstFatherName').value
        // const secondFamilia = document.getElementById('secondFamilia').value
        // const secondName = document.getElementById('secondName').value
        // const secondFatherName = document.getElementById('secondFatherName').value
        
        let fam1 = ""
        let nam1 = ""
        let fath1 = ""
        let fam2 = ""
        let nam2 = ""
        let fath2 = ""

        if (!checks1) {
            if (firstFamilia == "starts") {
                fam1 = lname1 + '.*'
            } else if (firstFamilia == "include") {
                fam1 = ('.*' + lname1 + '.*')
            } else {
                fam1 = ('.*' + lname1)
            }
            if (firstName == "starts") {
                nam1 = (name1 + '.*')
            } else if (firstName == "include") {
                nam1 = ('.*' + name1 + '.*')
            } else {
                nam1 = ('.*' + name1)
            }
            if (firstFatherName == "starts") {
                fath1 = (fname1 + '.*')
            } else if (firstFatherName == "include") {
                fath1 = ('.*' + fname1 + '.*')
            } else {
                fath1 = ('.*' + fname1)
            }

        } else {
            fam1 = lname1
            nam1 = name1
            fath1 = fname1
        }

        if (!checks2) {
            if (secondFamilia == "starts") {
                fam2 = (lname2 + '.*')
            } else if (secondFamilia == "include") {
                fam2 = ('.*' + lname2 + '.*')
            } else {
                fam2 = ('.*' + lname2)
            }
            if (secondName == "starts") {
                nam2 = (name2 + '.*')
            } else if (secondName == "include") {
                nam2 = ('.*' + name2 + '.*')
            } else {
                nam2 = ('.*' + name2)
            }
            if (secondFatherName == "starts") {
                fath2 = (fname2 + '.*')
            } else if (secondFatherName == "include") {
                fath2 = ('.*' + fname2 + '.*')
            } else {
                fath2 = ('.*' + fname2)
            }

        } else {
            fam2 = lname2
            nam2 = name2
            fath2 = fname2
        }

        let options = {
            iin1, iin2, limit, depth, mode, relString, approvementObject, searchOption, checks1, checks2, fam1, nam1, fath1, fam2, nam2, fath2
        }

        console.log(options)

        setModal(false)
        setNewReq(false)        
        props.handleSubmit(options, tab)
    }

    const clearOptions = () => {
        setIIN1("")
        setIIN2("")
        setLimit(20)
        setMode("")

        document.getElementById("input_IIN").value = "";
        document.getElementById("input_IIN2").value = "";

        // document.getElementById("input_date").value = "";
        // document.getElementById("input_date2").value = "";

        // document.querySelector("#file-upload").value = "";
    }

    const exportBt = () => {
        props.exportBt()
    }

    const downloadScheme = () => {
        props.downloadScheme()
    }

    const importBt = () => {
        const fileInput = document.getElementById('file-upload')
        const file = fileInput.files[0]
        let graJSON = {}
        reader.onload = event => {
            const fileContent = event.target.result
            props.update()
            graJSON = props.importBt(fileContent)

            console.log(graJSON)

            if (graJSON.typeOfSearch=="con1") {
                document.getElementById("connections").value = "con1"
            } else if (graJSON.typeOfSearch=="con2") {
                document.getElementById("connections").value = "con2"
            } else if (graJSON.typeOfSearch=="con3") {
                document.getElementById("connections").value = "con3"
            } else if (graJSON.typeOfSearch=="con4") {
                document.getElementById("connections").value = "con4"
            } else if (graJSON.typeOfSearch=="con5") {
                document.getElementById("connections").value = "con5"
            }

            let formSearchOptions = document.querySelector("#formSearchOptions");
            let iin1 = document.querySelector("#formIIN1");
            let iin2 = document.querySelector("#formIIN2");

            let formFio1 = document.querySelector("#formFio1")
            let formFio2 = document.querySelector("#formFio2")

            let formLimit = document.querySelector("#formLimit")
            let formDepth = document.querySelector("#formDepth")
            let formRels  = document.querySelector("#formRels")

            formSearchOptions.style.display = 'none'
            iin1.style.display = 'none'
            iin2.style.display = 'none'
            formFio1.style.display = 'none'
            formFio2.style.display = 'none'
            formLimit.style.display = 'none'
            formDepth.style.display = 'none'
            formRels.style.display = 'none'

        }

        reader.readAsText(file)
    }

    const checkAuth = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (!userSession) return false;
        return true;
    }

    const checkAdmin = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('ADMIN')) {
            return true;
        }
        return false;
    }
    const checkVip = () => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        if (userSession && userSession.roles.includes('VIP')) {
            return true;
        }
        return false;
    }

    const checkState = () => {
        if (newReq) {
            return true
        } 
        return false
    }
    

    const handleLayout = (layout) => {
        props.handleLayout(layout)
    }

    return (
        <div 
            className={`kendrick ${props.openLeft?'leftBar20':'leftBar0'}`}
            style={{
                overflowX: modal ? 'unset' : 'hidden'
            }}
        >
            {modal ?
                <ApprovementModalWindow send={filter} setModal={setModal} setApprovementObj={setApprovementObj}></ApprovementModalWindow>
                : ("")}
            <ButtonGroup variant="outlined" aria-label="outlined button group" style={{paddingBottom: '20px', width: '70%', display: 'flex', flexDirection: 'column', }}>
                <ButtonGroup variant="outlined" aria-label="outlined button group" style={{}}>
                    <Button endIcon={<SearchIcon/>} onClick={e => {setTab("search")}} style={{color: '#1b376f', borderColor: '#1b376f', fontSize: '0.6rem', width: '50%'}}>Общий</Button>
                    <Button endIcon={<SearchIcon/>} onClick={e => {setTab("zags")}} style={{color: '#1b376f', borderColor: '#1b376f', fontSize: '0.6rem', width: '50%'}}>Загс</Button>
                </ButtonGroup>
                <Button endIcon={<HistoryIcon/>} onClick={e => {setTab("history")}} style={{color: '#1b376f', borderColor: '#1b376f', fontSize: '0.6rem', width: '100%'}}>История</Button>
            </ButtonGroup> 

            <div className="leftBarClose">
                <IconButton aria-label="expand row" size="small" onClick={() => props.handleLeftOpen(false)}>
                    <KeyboardArrowLeftIcon style={{ fill: '#000000' }}/>
                </IconButton>
            </div>
            {tab == "search" ? 
            <div className="leftBar">
                <form >
                    <div className="formBlock">
                        <label htmlFor="connections">Найти связи между</label>
                        <div className="select" style={{width: '100%'}}>
                            <Select  value={mode} sx={{width: '100%', color: '#1b376f'}} name="connections" id='connections'
                                onChange={event => {
                                    setNewReq(true)
                                    let value = document.getElementById("connections").value;

                                    let formSearchOptions = document.querySelector("#formSearchOptions");

                                    let iin1 = document.querySelector("#formIIN1");
                                    let iin2 = document.querySelector("#formIIN2");

                                    let formFio1 = document.querySelector("#formFio1")
                                    let formFio2 = document.querySelector("#formFio2")

                                    let formLimit = document.querySelector("#formLimit")
                                    let formDepth = document.querySelector("#formDepth")
                                    let formRels  = document.querySelector("#formRels")

                                    setMode(event.target.value)

                                    if (event.target.value === "con1") {
                                        setNewReq(true)
                                        iin1.childNodes[0].innerHTML = "Введите ИИН"

                                        formSearchOptions.style.display = 'flex';

                                        if (searchOption == "iinOption") {
                                            iin1.style.display = 'flex';
                                            iin2.style.display = 'none';

                                            formFio1.style.display = 'none';
                                            formFio2.style.display = 'none';

                                        } else if (searchOption == "fioOption") {
                                            iin1.style.display = 'none';
                                            iin2.style.display = 'none';

                                            formFio1.style.display = 'flex';
                                            formFio2.style.display = 'none';
                                        }


                                        formLimit.style.display = 'flex';
                                        formDepth.style.display = 'flex';
                                        formRels.style.display = 'flex';
                                        props.update()
                                    }
                                    else if (event.target.value ==="con2") {
                                        setNewReq(true)
                                        iin1.childNodes[0].innerHTML = "Введите ИИН"
                                        iin2.childNodes[0].innerHTML = "Введите второй ИИН"

                                        formSearchOptions.style.display = 'flex';

                                        if (searchOption == "iinOption") {
                                            iin1.style.display = 'flex';
                                            iin2.style.display = 'flex';

                                            formFio1.style.display = 'none';
                                            formFio2.style.display = 'none';

                                        } else if (searchOption == "fioOption") {
                                            iin1.style.display = 'none';
                                            iin2.style.display = 'none';

                                            formFio1.style.display = 'flex';
                                            formFio2.style.display = 'flex';
                                        }

                                        formLimit.style.display = 'none';
                                        formDepth.style.display = 'none';

                                        formRels.style.display = 'flex';
                                        props.update()
                                    }
                                    else if (event.target.value ==="con3") {
                                        setNewReq(true)
                                        iin1.childNodes[0].innerHTML = "Введите ИИН"
                                        iin2.childNodes[0].innerHTML = "Введите БИН"

                                        formSearchOptions.style.display = 'flex';

                                        if (searchOption == "iinOption") {
                                            iin1.style.display = 'flex';
                                            iin2.style.display = 'flex';

                                            formFio1.style.display = 'none';
                                            formFio2.style.display = 'none';

                                        } else if (searchOption == "fioOption") {
                                            iin1.style.display = 'none';
                                            iin2.style.display = 'flex';

                                            formFio1.style.display = 'flex';
                                            formFio2.style.display = 'none';
                                        }

                                        formLimit.style.display = 'none';
                                        formDepth.style.display = 'none';

                                        formRels.style.display = 'flex';
                                        props.update()
                                    }
                                    else if (event.target.value === "con4") {
                                        setNewReq(true)
                                        iin1.childNodes[0].innerHTML = "Введите БИН"

                                        formSearchOptions.style.display = 'none';

                                        iin1.style.display = 'flex';
                                        iin2.style.display = 'none';

                                        formFio1.style.display = 'none';
                                        formFio2.style.display = 'none';

                                        formLimit.style.display = 'flex';
                                        formDepth.style.display = 'flex';

                                        formRels.style.display = 'flex';
                                        props.update()
                                    }
                                    else if (event.target.value === "con5") {
                                        setNewReq(true)
                                        iin1.childNodes[0].innerHTML = "Введите БИН"
                                        iin2.childNodes[0].innerHTML = "Введите второй БИН"

                                        formSearchOptions.style.display = 'none';

                                        iin1.style.display = 'flex';
                                        iin2.style.display = 'flex';

                                        formFio1.style.display = 'none';
                                        formFio2.style.display = 'none';

                                        formLimit.style.display = 'none';
                                        formDepth.style.display = 'none';

                                        formRels.style.display = 'flex';
                                        props.update()
                                    }
                                }}>
                                <MenuItem value="con1">Фл</MenuItem>
                                <MenuItem value="con4">Юл</MenuItem>
                                <MenuItem value="con2">Фл - Фл</MenuItem>
                                <MenuItem value="con3">Фл - Юл</MenuItem>
                                <MenuItem value="con5">Юл - Юл</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="formBlock" id="formSearchOptions" style={{display: "none"}}>
                        <label htmlFor="searchOptions">Поиск по</label>
                        <div className="select">
                            <Select sx={{width: '340px', color: '#1b376f'}} name="searchOptions" id='searchOptions' value={searchOption}
                            onChange={event => {
                                setNewReq(true)
                                let optionValue = document.getElementById("searchOptions").value;
                                let iin1 = document.querySelector("#formIIN1");
                                let iin2 = document.querySelector("#formIIN2");

                                let formFio1 = document.querySelector("#formFio1")
                                let formFio2 = document.querySelector("#formFio2")

                                setSearchOption(event.target.value)

                                if (event.target.value == "fioOption") {
                                    iin1.style.display = "none";
                                    formFio1.style.display = "flex";

                                    if (mode == "con5" || mode == "con2") {
                                        iin2.style.display = "none";
                                        formFio2.style.display = "flex";
                                    }

                                } else if (event.target.value == "iinOption") {
                                    iin1.style.display = "flex";
                                    formFio1.style.display = "none";

                                    if (mode == "con5" || mode == "con3" || mode == "con2") {
                                        iin2.style.display = "flex";
                                        formFio2.style.display = "none";
                                    }
                                }
                            }}>
                                <MenuItem value="iinOption">ИИН</MenuItem>
                                <MenuItem value="fioOption">ФИО</MenuItem>
                            </Select>
                        </div>
                    </div>

                    <div className="formBlock" id="formIIN1" style={{display: "none"}}>
                        <label>Введите ИИН</label>
                        <TextField
                            value={iin1}
                            onChange={event => {
                                setNewReq(true)
                                setIIN1(event.target.value) }}
                                id="input_IIN"
                                // className="input_IIN"
                                name="iin1"
                                placeholder="ИИН/БИН"
                                sx={{color: '#1b376f !important'}}
                                />
                    </div>

                    <div id="formFio1" style={{display: "none"}}>
                        <div>
                            <input id="accurateCheckbox1" className="accurateCheckbox" type={"checkbox"} onChange={(event) => {
                                setNewReq(true)
                                setChecks1(event.target.checked)
                            }}/>
                            <label htmlFor="accurateCheckbox1">Точный поиск</label>
                        </div>
                        <div className="formBlock">
                            <label>Введите Фамилию первого объекта </label>
                            {!checks1 ?
                            <Select sx={{ width: '100%'}} value={firstFamilia} onChange={e => {
                                setNewReq(true)
                                setFirstFamilia(e.target.value)
                                }}>
                                <MenuItem value="starts">Начинается с</MenuItem>
                                <MenuItem value="include">Включает</MenuItem>
                                <MenuItem value="ends">Заканчивается</MenuItem>
                                <MenuItem value="exact">Точное</MenuItem>
                            </Select> : ""
                            }
                            <TextField type="text"
                                value={lname1}
                                       sx={{color: '#1b376f'}}
                                onChange={event => {
                                    setNewReq(true)
                                    setLName1(event.target.value) }}
                                    id="input_FIO1_1"
                                    // className="input_IIN"
                                    name="Fam1"
                                    placeholder=""
                                    />
                        </div>

                        <div className="formBlock">
                            <label>Введите Имя первого объекта </label>
                            {!checks1 ?
                            <Select sx={{ width: '100%'}} value={firstName} onChange={e => {
                                setNewReq(true)
                                setFirstName(e.target.value)}}>
                                <MenuItem value="starts">Начинается с</MenuItem>
                                <MenuItem value="include">Включает</MenuItem>
                                <MenuItem value="ends">Заканчивается</MenuItem>
                                <MenuItem value="exact">Точное</MenuItem>
                            </Select> : ""
                            }
                            <TextField type="text"
                                value={name1}
                                       sx={{color: '#1b376f'}}
                                onChange={event => {
                                    setNewReq(true)
                                    setName1(event.target.value) }}
                                    id="input_FIO1_2"
                                    // className="input_IIN"
                                    name="name1"
                                    placeholder=""
                                    />
                        </div>

                        <div className="formBlock">
                            <label>Введите Отчество первого объекта </label>
                            {!checks1 ?
                            <Select sx={{width: "100%"}} value= {firstFatherName} onChange={e => {
                                setNewReq(true)
                                setFirstFatherName(e.target.value)
                                }}>
                                <MenuItem value="starts">Начинается с</MenuItem>
                                <MenuItem value="include">Включает</MenuItem>
                                <MenuItem value="ends">Заканчивается</MenuItem>
                                <MenuItem value="exact">Точное</MenuItem>
                            </Select> : ""
                            }
                            <TextField type="text"
                                value={fname1}
                                       sx={{color: '#1b376f'}}
                                onChange={event => {
                                    setNewReq(true)
                                    setFName1(event.target.value) }}
                                    id="input_FIO1_3"
                                    // className="input_IIN"
                                    name="lname1"
                                    placeholder=""
                                    />
                        </div>
                    </div>

                    <div className="formBlock" id="formIIN2" style={{display: "none"}}>
                        <label>Второй второй ИИН</label>
                        <TextField type="text"
                            value={iin2}
                            sx={{color: '#1b376f'}}
                            onChange={event => { 
                                setNewReq(true)
                                setIIN2(event.target.value) }}
                            id="input_IIN2"
                            // className="input_IIN"
                            name="iin2"
                            placeholder="ИИН/БИН"
                            />
                    </div>

                    <div id="formFio2" style={{display: "none"}}>
                        <div>
                            <input id="accurateCheckbox2" className="accurateCheckbox" type={"checkbox"} onChange={(event) => {
                                setNewReq(true)
                                setChecks2(event.target.checked)
                            }}/>
                            <label htmlFor="accurateCheckbox1">Точный поиск</label>
                        </div>
                        <div className="formBlock">
                            <label>Введите Фамилию второго объекта </label>
                            {!checks2 ?
                            <Select sx={{width: "100%"}} value= {secondFamilia} onChange={e => {
                                setNewReq(true)
                                setSecondFamilia(e.target.value)}}>
                                <MenuItem value="starts">Начинается с</MenuItem>
                                <MenuItem value="include">Включает</MenuItem>
                                <MenuItem value="ends">Заканчивается</MenuItem>
                                <MenuItem value="exact">Точное</MenuItem>
                            </Select> : ""
                            }
                            <TextField type="text"
                                value={lname2}
                                sx={{color: '#1b376f'}}
                                onChange={event => { 
                                    setNewReq(true)
                                    setLName2(event.target.value) }}
                                id="input_FIO2_1"
                                // className="input_IIN"
                                name="Fam2"
                                placeholder=""
                                />
                        </div>

                        <div className="formBlock">
                            <label>Введите Имя второго объекта </label>
                            {!checks2 ?
                            <Select sx={{width: "100%"}} value= {secondName} onChange={e => {
                                setNewReq(true)
                                setSecondName(e.target.value)}}>
                                <MenuItem value="starts">Начинается с</MenuItem>
                                <MenuItem value="include">Включает</MenuItem>
                                <MenuItem value="ends">Заканчивается</MenuItem>
                                <MenuItem value="exact">Точное</MenuItem>
                            </Select> : ""
                            }
                            <TextField type="text"
                                value={name2}
                                sx={{color: '#1b376f'}}
                                onChange={event => { 
                                    setNewReq(true)
                                    setName2(event.target.value) }}
                                id="input_FIO2_2"
                                // className="input_IIN"
                                name="fname2"
                                placeholder=""
                                />
                        </div>

                        <div className="formBlock">
                            <label>Введите Отчество второго объекта </label>
                            {!checks2 ?
                            <Select sx={{width: "100%"}} value= {secondFatherName} onChange={e => {
                                setNewReq(true)
                                setSecondFatherName(e.target.value)}}>
                                <MenuItem value="starts">Начинается с</MenuItem>
                                <MenuItem value="include">Включает</MenuItem>
                                <MenuItem value="ends">Заканчивается</MenuItem>
                                <MenuItem value="exact">Точное</MenuItem>
                            </Select> : ""
                            }
                            <TextField type="text"
                                value={fname2}
                                sx={{color: '#1b376f'}}
                                onChange={event => { 
                                    setNewReq(true)
                                    setFName2(event.target.value) }}
                                id="input_FIO2_3"
                                // className="input_IIN"
                                name="lname2"
                                placeholder=""
                                />
                        </div>
                    </div>

                    <div className="formBlock" id="formLimit" style={{display: "none"}}>
                        <label>Введите лимит</label>
                        <TextField type="number"
                            value={limit}
                            sx={{color: '#1b376f'}}
                            onChange={event => { 
                                setNewReq(true)
                                console.log(event.target.value)
                                if (event.target.value < 0) return;
                                setLimit(event.target.value)
                            }}
                            // id="input_IIN2"
                            // className="input_IIN"
                            name="limit"
                            placeholder="Введите лимит объектов"

                            />
                    </div>

                    <div className="formBlock" id="formDepth" style={{display: "none"}}>
                        <label>Введите уровень</label>
                        <TextField type="number"
                            value={depth}
                            sx={{color: '#1b376f'}}
                            onChange={event => {
                                setNewReq(true)
                                if (event.target.value < 0) return;
                                setDepth(event.target.value)
                            }}
                            name="depth"
                            placeholder="Введите глубину поиска"
                            />
                    </div>

                    <div className="formBlock" id="formRels" style={{display: "none"}}>
                        <label>По каким связям хотите?</label>
                        <RelationBlock setRels={setRelString}></RelationBlock>
                    </div>


                    <div className="formBlock layoutControl">
                        <LayoutController handleLayout={handleLayout}></LayoutController>
                    </div>
                </form>
                <div className="btn-block formBlock">
                        <div className="formActionBtnBlock" style={{ display: "flex", justifyContent: "space-between", width: '92%' }}>
                            <Button variant="outlined" onClick={event => clearOptions()} style={{ flex: 1, marginRight: "5px" }} sx={{color: '#1b376f', borderColor: '#1b376f'}} >
                                Очистить
                            </Button>

                            <Button id="initButton" variant="contained" onClick={event => {
                                if (!checkAdmin() && !checkVip() && newReq)
                                    setModal(true)
                                else
                                    filter()
                            }} style={{ flex: 1, marginLeft: "5px" }} sx={{color: '#fff', backgroundColor: '#1b376f'}} >
                                Запустить
                            </Button>
                        </div>

    {/*
                        <div className="exportImportBtnBlock">
                            <div id="importBlock" >
                                <input type="file" id="file-upload"
                                    onChange={event => importBt()}
                                    />
                            </div>

                            <Button variant="outlined" disabled={props.downloadScheme ? false: true} value="Экспортировать данные"
                                onClick={event => exportBt()}
                                >Экспортировать данные</Button>
                            <Button variant="outlined" disabled={props.downloadScheme ? false: true} value="Скачать схему"
                                onClick={event => downloadScheme()}
                                >Скачать схему</Button>

                        </div> */}


                </div>

            </div> :

            tab == "zags" ?
                <div className="leftBar">
                    <form >
                        <div className="formBlock">
                            <label htmlFor="connections">Найти связи между</label>
                            <div className="select">
                                <Select  value={mode} sx={{width: '100%'}} name="connections" id='connections'
                                         onChange={event => {
                                            setNewReq(true)
                                            let value = document.getElementById("connections").value;

                                            let formSearchOptions = document.querySelector("#formSearchOptions");

                                            let iin1 = document.querySelector("#formIIN1");
                                            let iin2 = document.querySelector("#formIIN2");

                                            let formFio1 = document.querySelector("#formFio1")
                                            let formFio2 = document.querySelector("#formFio2")

                                            let formLimit = document.querySelector("#formLimit")
                                            let formDepth = document.querySelector("#formDepth")
                                            let formRels  = document.querySelector("#formRels")

                                            setMode(event.target.value)

                                            if (event.target.value === "con1") {
                                                iin1.childNodes[0].innerHTML = "Введите ИИН"

                                                formSearchOptions.style.display = 'flex';

                                                if (searchOption == "iinOption") {
                                                    iin1.style.display = 'flex';
                                                    iin2.style.display = 'none';

                                                    formFio1.style.display = 'none';
                                                    formFio2.style.display = 'none';

                                                } else if (searchOption == "fioOption") {
                                                    iin1.style.display = 'none';
                                                    iin2.style.display = 'none';

                                                    formFio1.style.display = 'flex';
                                                    formFio2.style.display = 'none';
                                                }


                                                formLimit.style.display = 'flex';
                                                formDepth.style.display = 'flex';
                                                formRels.style.display = 'flex';
                                                props.update()
                                            }
                                            else if (event.target.value ==="con2") {
                                                iin1.childNodes[0].innerHTML = "Введите ИИН"
                                                iin2.childNodes[0].innerHTML = "Введите второй ИИН"

                                                formSearchOptions.style.display = 'flex';

                                                if (searchOption == "iinOption") {
                                                    iin1.style.display = 'flex';
                                                    iin2.style.display = 'flex';

                                                    formFio1.style.display = 'none';
                                                    formFio2.style.display = 'none';

                                                } else if (searchOption == "fioOption") {
                                                    iin1.style.display = 'none';
                                                    iin2.style.display = 'none';

                                                    formFio1.style.display = 'flex';
                                                    formFio2.style.display = 'flex';
                                                }

                                                formLimit.style.display = 'none';
                                                formDepth.style.display = 'none';

                                                formRels.style.display = 'flex';
                                                props.update()
                                            }
                                            else if (event.target.value ==="con3") {
                                                iin1.childNodes[0].innerHTML = "Введите ИИН"
                                                iin2.childNodes[0].innerHTML = "Введите БИН"

                                                formSearchOptions.style.display = 'flex';

                                                if (searchOption == "iinOption") {
                                                    iin1.style.display = 'flex';
                                                    iin2.style.display = 'flex';

                                                    formFio1.style.display = 'none';
                                                    formFio2.style.display = 'none';

                                                } else if (searchOption == "fioOption") {
                                                    iin1.style.display = 'none';
                                                    iin2.style.display = 'flex';

                                                    formFio1.style.display = 'flex';
                                                    formFio2.style.display = 'none';
                                                }

                                                formLimit.style.display = 'none';
                                                formDepth.style.display = 'none';

                                                formRels.style.display = 'flex';
                                                props.update()
                                            }
                                            else if (event.target.value === "con4") {
                                                iin1.childNodes[0].innerHTML = "Введите БИН"

                                                formSearchOptions.style.display = 'none';

                                                iin1.style.display = 'flex';
                                                iin2.style.display = 'none';

                                                formFio1.style.display = 'none';
                                                formFio2.style.display = 'none';

                                                formLimit.style.display = 'flex';
                                                formDepth.style.display = 'flex';

                                                formRels.style.display = 'flex';
                                                props.update()
                                            }
                                            else if (event.target.value === "con5") {
                                                iin1.childNodes[0].innerHTML = "Введите БИН"
                                                iin2.childNodes[0].innerHTML = "Введите второй БИН"

                                                formSearchOptions.style.display = 'none';

                                                iin1.style.display = 'flex';
                                                iin2.style.display = 'flex';

                                                formFio1.style.display = 'none';
                                                formFio2.style.display = 'none';

                                                formLimit.style.display = 'none';
                                                formDepth.style.display = 'none';

                                                formRels.style.display = 'flex';
                                                props.update()
                                            }
                                         }}>
                                    <MenuItem value="con1">Фл</MenuItem>
                                    <MenuItem value="con2">Фл - Фл</MenuItem>
                                </Select>
                            </div>
                        </div>

                        <div className="formBlock" id="formSearchOptions" style={{display: "none"}}>
                            <label htmlFor="searchOptions">Поиск по</label>
                            <div className="select">
                                <Select sx={{width: '100%'}} name="searchOptions" id='searchOptions' value={searchOption}
                                        onChange={event => {
                                            setNewReq(true)
                                            let optionValue = document.getElementById("searchOptions").value;
                                            let iin1 = document.querySelector("#formIIN1");
                                            let iin2 = document.querySelector("#formIIN2");

                                            let formFio1 = document.querySelector("#formFio1")
                                            let formFio2 = document.querySelector("#formFio2")

                                            setSearchOption(event.target.value)

                                            if (event.target.value == "fioOption") {
                                                iin1.style.display = "none";
                                                formFio1.style.display = "flex";

                                                if (mode == "con5" || mode == "con2") {
                                                    iin2.style.display = "none";
                                                    formFio2.style.display = "flex";
                                                }

                                            } else if (event.target.value == "iinOption") {
                                                iin1.style.display = "flex";
                                                formFio1.style.display = "none";

                                                if (mode == "con5" || mode == "con3" || mode == "con2") {
                                                    iin2.style.display = "flex";
                                                    formFio2.style.display = "none";
                                                }
                                            }
                                        }}>
                                    <MenuItem value="iinOption">ИИН</MenuItem>
                                    <MenuItem value="fioOption">ФИО</MenuItem>
                                </Select>
                            </div>
                        </div>

                        <div className="formBlock" id="formIIN1" style={{display: "none"}}>
                            <label>Введите ИИН</label>
                            <TextField
                                value={iin1}
                                sx={{color: '#1b376f'}}
                                onChange={event => {
                                    setNewReq(true)
                                    setIIN1(event.target.value) }}
                                id="input_IIN"
                                // className="input_IIN"
                                name="iin1"
                                placeholder="ИИН/БИН"
                            />
                        </div>

                        <div id="formFio1" style={{display: "none"}}>
                            <div>
                                <input id="accurateCheckbox1" className="accurateCheckbox" type={"checkbox"} onChange={(event) => {
                                    setChecks1(event.target.checked)
                                }}/>
                                <label htmlFor="accurateCheckbox1">Точный поиск</label>
                            </div>
                            <div className="formBlock">
                                <label>Введите Фамилию первого объекта </label>
                                {!checks1 ?
                                    <Select sx={{ width: '100%'}} value={firstFamilia} onChange={e => {setFirstFamilia(e.target.value)}}>
                                        <MenuItem value="starts">Начинается с</MenuItem>
                                        <MenuItem value="include">Включает</MenuItem>
                                        <MenuItem value="ends">Заканчивается</MenuItem>
                                        <MenuItem value="exact">Точное</MenuItem>
                                    </Select> : ""
                                }
                                <TextField type="text"
                                           value={lname1}
                                           sx={{color: '#1b376f'}}
                                           onChange={event => {
                                               setNewReq(true)
                                               setLName1(event.target.value) }}
                                           id="input_FIO1_1"
                                    // className="input_IIN"
                                           name="Fam1"
                                           placeholder=""
                                />
                            </div>

                            <div className="formBlock">
                                <label>Введите Имя первого объекта </label>
                                {!checks1 ?
                                    <Select sx={{ width: '100%'}} value={firstName} onChange={e => {setFirstName(e.target.value)}}>
                                        <MenuItem value="starts">Начинается с</MenuItem>
                                        <MenuItem value="include">Включает</MenuItem>
                                        <MenuItem value="ends">Заканчивается</MenuItem>
                                        <MenuItem value="exact">Точное</MenuItem>
                                    </Select> : ""
                                }
                                <TextField type="text"
                                           value={name1}
                                           sx={{color: '#1b376f'}}
                                           onChange={event => {
                                               setNewReq(true)
                                               setName1(event.target.value) }}
                                           id="input_FIO1_2"
                                    // className="input_IIN"
                                           name="name1"
                                           placeholder=""
                                />
                            </div>

                            <div className="formBlock">
                                <label>Введите Отчество первого объекта </label>
                                {!checks1 ?
                                    <Select sx={{width: "100%"}} value= {firstFatherName} onChange={e => {setFirstFatherName(e.target.value)}}>
                                        <MenuItem value="starts">Начинается с</MenuItem>
                                        <MenuItem value="include">Включает</MenuItem>
                                        <MenuItem value="ends">Заканчивается</MenuItem>
                                        <MenuItem value="exact">Точное</MenuItem>
                                    </Select> : ""
                                }
                                <TextField type="text"
                                           value={fname1}
                                           sx={{color: '#1b376f'}}
                                           onChange={event => {
                                               setNewReq(true)
                                               setFName1(event.target.value) }}
                                           id="input_FIO1_3"
                                    // className="input_IIN"
                                           name="lname1"
                                           placeholder=""
                                />
                            </div>
                        </div>

                        <div className="formBlock" id="formIIN2" style={{display: "none"}}>
                            <label>Второй второй ИИН</label>
                            <TextField type="text"
                                       value={iin2}
                                       onChange={event => { 
                                        setNewReq(true)
                                        setIIN2(event.target.value) 
                                        }}
                                       id="input_IIN2"
                                       sx={{color: '#1b376f'}}
                                // className="input_IIN"
                                       name="iin2"
                                       placeholder="ИИН/БИН"
                            />
                        </div>

                        <div id="formFio2" style={{display: "none"}}>
                            <div>
                                <input id="accurateCheckbox2" className="accurateCheckbox" type={"checkbox"} onChange={(event) => {
                                    setChecks2(event.target.checked)
                                }}/>
                                <label htmlFor="accurateCheckbox1">Точный поиск</label>
                            </div>
                            <div className="formBlock">
                                <label>Введите Фамилию второго объекта </label>
                                {!checks2 ?
                                    <Select sx={{width: "100%"}} value= {secondFamilia} onChange={e => {setSecondFamilia(e.target.value)}}>
                                        <MenuItem value="starts">Начинается с</MenuItem>
                                        <MenuItem value="include">Включает</MenuItem>
                                        <MenuItem value="ends">Заканчивается</MenuItem>
                                        <MenuItem value="exact">Точное</MenuItem>
                                    </Select> : ""
                                }
                                <TextField type="text"
                                           value={lname2}
                                           onChange={event => { setLName2(event.target.value) }}
                                           id="input_FIO2_1"
                                           sx={{color: '#1b376f'}}
                                    // className="input_IIN"
                                           name="Fam2"
                                           placeholder=""
                                />
                            </div>

                            <div className="formBlock">
                                <label>Введите Имя второго объекта </label>
                                {!checks2 ?
                                    <Select sx={{width: "100%"}} value= {secondName} onChange={e => {setSecondName(e.target.value)}}>
                                        <MenuItem value="starts">Начинается с</MenuItem>
                                        <MenuItem value="include">Включает</MenuItem>
                                        <MenuItem value="ends">Заканчивается</MenuItem>
                                        <MenuItem value="exact">Точное</MenuItem>
                                    </Select> : ""
                                }
                                <TextField type="text"
                                           value={name2}
                                           onChange={event => { setName2(event.target.value) }}
                                           id="input_FIO2_2"
                                           sx={{color: '#1b376f'}}
                                    // className="input_IIN"
                                           name="fname2"
                                           placeholder=""
                                />
                            </div>

                            <div className="formBlock">
                                <label>Введите Отчество второго объекта </label>
                                {!checks2 ?
                                    <Select sx={{width: "100%"}} value= {secondFatherName} onChange={e => {setSecondFatherName(e.target.value)}}>
                                        <MenuItem value="starts">Начинается с</MenuItem>
                                        <MenuItem value="include">Включает</MenuItem>
                                        <MenuItem value="ends">Заканчивается</MenuItem>
                                        <MenuItem value="exact">Точное</MenuItem>
                                    </Select> : ""
                                }
                                <TextField type="text"
                                           value={fname2}
                                           onChange={event => { setFName2(event.target.value) }}
                                           id="input_FIO2_3"
                                           sx={{color: '#1b376f'}}
                                    // className="input_IIN"
                                           name="lname2"
                                           placeholder=""
                                />
                            </div>
                        </div>

                        <div className="formBlock" id="formLimit" style={{display: "none"}}>
                            <label>Введите лимит</label>
                            <TextField type="number"
                                value={limit}
                                onChange={event => { 
                                    console.log(event.target.value)
                                    if (event.target.value < 0) return;
                                    setLimit(event.target.value)
                                }}
                                // id="input_IIN2"
                                // className="input_IIN"
                                sx={{color: '#1b376f'}}
                                name="limit"
                                placeholder="Введите лимит объектов"

                            />
                        </div>

                        <div className="formBlock" id="formDepth" style={{display: "none"}}>
                            <label>Введите уровень</label>
                            <TextField type="number"
                                value={depth}
                                onChange={event => {
                                    console.log(event.target.value)
                                    if (event.target.value < 0) return;
                                    setDepth(event.target.value)
                                }}
                                name="depth"
                                sx={{color: '#1b376f'}}
                                placeholder="Введите глубину поиска"
                            />
                        </div>

                        <div className="formBlock" id="formRels" style={{display: "none"}}>
                            <label>По каким связям хотите?</label>
                            <RelationBlockZags setRels={setRelString}></RelationBlockZags>
                        </div>


                        <div className="formBlock layoutControl">
                            <LayoutController handleLayout={handleLayout}></LayoutController>
                        </div>
                    </form>
                    <div className="btn-block formBlock">
                        <div className="formActionBtnBlock" style={{ display: "flex", justifyContent: "space-between", width: '92%' }}>
                            <Button variant="outlined" onClick={event => clearOptions()} style={{ flex: 1, marginRight: "5px" }} sx={{color: '#1b376f', borderColor: '#1b376f'}} >
                                Очистить
                            </Button>

                            <Button id="initButton" variant="contained" onClick={event => {
                                if (!checkAdmin() && !checkVip() && newReq)
                                    setModal(true)
                                else
                                    filter()
                            }} style={{ flex: 1, marginLeft: "5px" }} sx={{color: '#fff', backgroundColor: '#1b376f'}} >
                                Запустить
                            </Button>
                        </div>

                    </div>
                    {modal ?
                        <ApprovementModalWindow send={filter} setModal={setModal} setApprovementObj={setApprovementObj}></ApprovementModalWindow> : ("")}
                </div>

                : <div className="leftBar" style={{paddingTop: '20px', height: 'calc(100vh - 198px)'}}>
                    <HistoryBlock/>
                </div>
            }
        </div>
    )
}

const columns = [
    { id: 'requestData', label: 'Объект', maxWidth: 40 },
    { id: 'date', label: 'Дата', minWidth: 40 },
  ];


const HistoryBlock = (props) => {
    const [page, setPage] = React.useState(0);
    const [rows, setRows] = React.useState([])
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const userSession = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get("http://10.202.20.92:9091/api/pandora/main/getCurrUserDetails").then(res=> {
            console.log(res.data.logs)
            const array = res.data.logs.map(x => {
                return {
                    requestData: x.request_body.join(","),
                    date: x.date.slice(0, 10)
                }
            })
            setRows(array)
        })
    }, [])
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', margin: '0 auto', overflow: 'hidden', backgroundColor: '#F2F0EE', boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{backgroundColor: '#F2F0EE'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell>
                            {row.requestData}
                        </TableCell>
                        <TableCell>
                            {row.date}
                        </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
}

export default LeftBar;