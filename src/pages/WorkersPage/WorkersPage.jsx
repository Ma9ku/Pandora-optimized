import { Component } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios';
import { TableRow } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import {useState } from "react";
import { useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect } from "react";
import './WorkersPage.scss'
import SideBar from "../../components/side-bar";
import Avatar from '@mui/material/Avatar';

const afm_rk_head = [
    {
        picture: '',
        fio: 'СМАИЛОВ УСЕН',
        email: 'usen_smile@gmail.com',
        phone: '+ 7 - 7172 - 708391 - (21005)',
        date: '16 августа',
        position: 'Председатель'
    },
    {
        picture: '',
        fio: 'БИТИМБАЕВА МИДИНА',
        email: 'bit_midina@afmrk.gov.kz',
        phone: '+ 7 - 7172 - (21011)',
        date: '3 июня',
        position: 'Первый заместитель Председателя'
    },
]
const afm_rk_secret_pred = [
    {
        picture: '',
        fio: 'АКСЕННИКОВ АЛЕКСАНДР НИКОЛАЕВИЧ',
        email: 'alexander@gmail.com',
        phone: '+ 7 - 1233 - 1415',
        date: '19 августа',
        position: 'Помощник Председателя'
    },
    {
        picture: '',
        fio: 'КОРОЛЕВА ГАЛИНА ЕВГЕНЬЕВНА',
        email: 'galineusdt@bitcoin.com',
        phone: '+ 7 - 1415 - 9265',
        date: '19 июня',
        position: 'Помощник Председателя по режиму'
    },
]
const astana_der_head = [
    {
        picture: '',
        fio: 'СЫЗДЫГАЛИНА АКЕРКЕ БОЛЫСПЕКОВНА',
        email: 'akerke@gmail.com',
        phone: '+ 7 - 5567 - 2344',
        date: '9 августа',
        position: 'Руководитель'
    },
    {
        picture: '',
        fio: 'КИМ НАЗГУЛЬ МАКСУТОВНА',
        email: 'kimjandi@kimkim.jan',
        phone: '+ 7 - 9999 - 1231',
        date: '5 июня',
        position: 'Заместитель руководителя'
    },
]
const astana_der_1_oper_control = [
    {
        picture: '',
        fio: 'КАРАЕВ КУЙЛИ',
        email: 'kuily@gmail.com',
        phone: '+ 7 - 7712 - 3323',
        date: '15 марта',
        position: 'Руководитель управления'
    },
    {
        picture: '',
        fio: 'ЕСЕТОВ АЛМАТ УРЫНБАСАРОВИЧ',
        email: 'eset_al@es.al',
        phone: '+ 7 - 3321 - 9878',
        date: '5 июня',
        position: 'Заместитель руководителя управления'
    },
]
const astana_der_1_sled_control = [
    {
        picture: '',
        fio: 'УРУСТЕМБАЕВ БЕКЗАДА ШЫНЫБЕКОВИЧ',
        email: 'beksada@gmail.com',
        phone: '+ 7 - 7764 - 3478',
        date: '15 марта',
        position: 'Руководитель управления'
    },
    {
        picture: '',
        fio: 'ХОНОГБАЙ АМАНБЕК',
        email: 'honogbay@mail.ru',
        phone: '+ 7 - 2232 - 4345',
        date: '5 июня',
        position: 'Заместитель руководителя управления'
    },
]

const workers = {
    "head_office-head": afm_rk_head,
    "head_office-secret_pred": afm_rk_secret_pred,
    "1_filial-head": astana_der_head,
    "1_filial-secret_pred": astana_der_1_oper_control,
    "1_filial-sled_dep": astana_der_1_sled_control
}

const places = {
    "head_office": {
        name: "Головной офис",
        ranks: {
            "head": "Руководство",
            "secret_pred": "Отдел",
            "sled_dep": "Отдел",
            "oper_dep": "Отдел",
            "analytic_dep": "Отдел",
            "finance_monitor_dep": "Отдел",
            "antikor_dep": "Отдел",
            "finance_terrorism_dep": "Отдел",
            "oper_analysis_dep": "Отдел",
            "work_subj": "Отдел",
        }
    },
    "1_filial": {
        name: "Филиал 1",
        ranks: {
            "head": "Руководство",
            "secret_pred": "Отдел",
            "sled_dep": "Отдел",
            "oper_dep": "Отдел",
            "analytic_dep": "Отдел",
            "finance_monitor_dep": "Отдел",
        }
    },
    "2_filial": {
        name: "Филиал 2",
        ranks: {
        }
    },
    "3_filial": {
        name: "Филиал 3",
        ranks: {
            "head": "Руководство",
            "secret_pred": "Отдел",
            "sled_dep": "Отдел",
            "oper_dep": "Отдел",
            "finance_monitor_dep": "Отдел",
            "antikor_dep": "Отдел",
        }
    },
    "4_filial": {
        name: "Филиал 4",
        ranks: {
            "head": "Руководство",
            "secret_pred": "Отдел",
            "sled_dep": "Отдел",
            "oper_dep": "Отдел",
            "analytic_dep": "Отдел",
        }
    },
    "5_filial": {
        name: "Филиал 5",
        ranks: {
            "head": "Руководство",
            "oper_dep": "Отдел",
            "analytic_dep": "Отдел",
            "finance_monitor_dep": "Отдел",
            "antikor_dep": "Отдел",
        }
    },
    // "afm_rk": "Агентство Республики Казахстан по финансовому мониторингу",
    // "astana_der":"РГУ ДЭР по городу Астана",
    // "almaty_der":"Департамент экономических расследований по г. Алматы",
    // "akmola_der":"ДЭР по Акмолинской области",
    // "aktobe_oblast_der":"ДЭР по Актюбинской области",
    // "almaty_oblast_der":"ДЭР по Алматинской области",
    // "atyrau_oblast_der":"ДЭР по Атырауской области",
    // "zk_oblast_der":"ДЭР по Заподно-Казахстанской области",
    // "zhambyl_oblast_der":"ДЭР по Жамбылской области",
    // "karaganda_oblast_der":"ДЭР по Карагандиснкой области",
    // "kostanay_oblast_der":"ДЭР по Костанайской области",
    // "kyzylorda_oblast_der": "ДЭР по Кызылординской области",
    // "mangistau_oblast_der": "ДЭР по Мангистауской области",
    // "shymkent_oblast_der": "ДЭР по по городу Шымкент",
    // "pavlodar_oblast_der": "ДЭР по Павлодарской области",
    // "sk_oblast_der": "ДЭР по Северо-Казахстанской области",
    // "vk_oblast_der": "ДЭР по Восточно-Казахстанской области",
    // "turkestan_oblast_der": "ДЭР по Туркенстанской области",
    // "kinolog_centre_der": "Кинологический центр",
    // "abay_oblast_der": "ДЭР по области Абай",
    // "zhtisu_oblast_der": "ДЭР по области Жетісу",
    // "ulytau_oblast_der": "ДЭР по области Ұлытау",
}
const ranksAfm = {
    "head": "Руководство",
    "secret_pred": "Секретариат Председателя",
    "sled_dep": "Следственный департамент",
    "oper_dep": "Оперативный департамент",
    "analytic_dep": "Департамент превенции и аналитических разработок",
    "finance_monitor_dep": "Департамент финансового мониторинга в сфере отмывания доходов, поиска и возврата преступных активов",
    "antikor_dep": "Департамент антикоррупционного финансового мониторинга",
    "finance_terrorism_dep": "Департамент финансового мониторинга в сфере финансирования терроризма, наркобизнеса и распростронения орудия массового уничтожения",
    "oper_analysis_dep": "Деапртамент оперативного анализа",
    "work_subj": "Департамент по работе с субъектами финансового мониторинга",
    "self_secuity_dep": "Департамент собственной безопасноси",
    "kadr_work_dep": "Департамент кадровой работы",
    "startegy_oper_mon_dep": "Департамент стратегии и опертивного мониторинга",
    "right_provide_dep": "Департамент правового обеспечения",
    "cypher_dep": "Департамент цифровизации",
    "admin_dep": "Административный департамент",
    "criminal_dep": "Криминалистическое управление",
    "mass_info_control": "Управление по работе со средствами массовой информации",
    "inside_audit_service": "Служба внутреннего аудита",
    "outside_workers": "Внештатные сотрудники"
}
const ranksDef = {
    "head": "Руководство",
    "1_oper_control": "1 Оперативное управление",
    "1_sled_control": "1 Следственное управление",
    "2_oper_control": "2 Оперативное управление",
    "2_sled_control": "2 Следственное управление",
    "3_oper_control": "3 Оперативное управление",
    "admin_control": "Административное упраление",
    "outside_workers": "Внештатные сотрудники",
    "in_have": "В распоряжении",
    "dejur_service": "Дежурная служба",
    "stab": "Организационно-контрольное управление (штаб)",
    "anaytic_work_sub": "Отдел аналитических разработок",
    "government_secret_serurity_sub": "Отдел по защите государстванных секретов"
}
function getRanks(props) {
    if (props == 'afm_rk') {
        return ranksAfm
    } else {
        return ranksDef
    }
}

function WorkersPage(props) {
    const [p, setP] = useState('')
    const [deps, setDeps] = useState([])
    useEffect(() => {
        Object.keys(workers).map((key, index) => (
            workers[key].filter((x) => x.fio.includes(p.toUpperCase())).map((x) => {
                    let i = key.indexOf('-')
                    if (!deps.includes(key.slice(0, i)))
                        deps.push(key.slice(0, i))
                    console.log(key.slice(0, i))
                }
            ))
        )
        console.log(deps)
    })

    return ( 
        <div style={{width: '70%', margin: '0 auto', paddingTop: "5%"}}>
            <h1 style={{marginBottom: '10px'}}>Справочник</h1>
            <input value={p} onChange={(e) => (setP(e.target.value))} type="text" className="searchUsers" placeholder="Поиск"></input>
            {Object.keys(places).map((key, index) => (
                <MainRow place={key} index={index}/>
            ))}
            {/* {p == '' ? Object.keys(places).map((key, index) => (
                <MainRow place={key} index={index}/>
            )): deps.map((key, index) => (
                <MainRow place={key} index={index}/>
            ))} */}

            <div style={{height: '100px'}}/>
        </div>
    );
}

function MainRow(props) {
    const [currentOpen, setCurrentOpen] = useState(-1)
    const {place} = props
    const [open, setOpen] = useState(false)

    const handleSubRowOpen = (index) => {
        if (currentOpen === index) setCurrentOpen(-1)
        else setCurrentOpen(index)
    }

    return (
        <TableContainer>
            <Table className="uitable" style={{backgroundColor: '#222629', borderRadius: '2px', borderBottom: 'hidden', marginBottom: '10px'}}>
                <TableHead  style={{ borderBottom: 'hidden'}}>
                    <TableRow hover onClick={() => setOpen(!open)}>
                        <TableCell style={{width: '95%'}}><a style={{fontSize: '16px', fontWeight: '500', color: open ? '#AAAAAA' : 'white', transition: '0.5s all ease'}}>{places[place].name}</a></TableCell>
                        <TableCell  style={{width: '5%'}}>
                            <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                            >
                            {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ borderBottom: 'hidden'}}>
                    <TableCell style={{ borderBottom: 'hidden', paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse style={{ borderBottom: 'hidden'}} in={open} timeout="auto" unmountOnExit>
                            <Box  style={{ borderBottom: 'hidden'}} sx={{ margin: 1 }}>
                                {Object.keys(places[place].ranks).map((key, index) => (
                                    <SubRow sub={key} place={place} currentOpen={currentOpen} index={index} handleSubRowOpen={handleSubRowOpen}/>
                                ))}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
function SubRow(props) {
    const {sub, place} = props 
    let k = place + '-' + sub;
    const [people, setPeople] = useState([])
    const [open, setOpen] = useState(props.currentOpen === props.index);

    useEffect(() => {
        if (workers.hasOwnProperty(k)) {
            setPeople(workers[k])
        }

        setOpen(props.index == props.currentOpen)
    })
    // console.log(place + '_' + sub)

    // useEffect(() => {
    //     if (open) {
    //         if (sub == 'Админ') {
    //             axios.get("http://192.168.30.24:9091/api/pandora/main/3users1").then(res => {
    //                 setWorkers(res.data)
    //                 console.log(res.data)
    //             })
    //         } else {
    //             axios.get("http://192.168.30.24:9091/api/pandora/main/3users2").then(res => {
    //                 setWorkers(res.data)
    //                 console.log(res.data)
    //             })
    //         }
    //     }
    // }, [open])

    return (
        <TableContainer>
             <Table className="uitable" style={{backgroundColor: '#222629', borderBottom: 'hidden', marginBottom: '10px',  borderRadius: '3px'}}>
                <TableHead  style={{ borderBottom: 'hidden'}}>
                    <TableRow hover style={{borderRadius: '3px'}} onClick={() => props.handleSubRowOpen(props.index)}>
                        <TableCell style={{width: '95%'}}><a style={{fontSize: '15px', fontWeight: '500', color: open ? '#AAAAAA' : 'white', transition: '0.5s all ease'}}>{places[place].ranks[sub]}</a></TableCell>
                        <TableCell  style={{width: '5%'}}>
                            <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody style={{ borderBottom: ''}}>
                    <TableCell style={{ borderBottom: '', paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse style={{ borderBottom: ''}} in={open} timeout="auto" unmountOnExit>
                            <Box  style={{ borderBottom: 'hidden'}} sx={{ margin: 1 }}>
                                {people.map((worker) => (
                                    <TableRow style={{borderBottom: ''}}>
                                        <TableCell style={{width: '10%'}} align="left"><Link to={`/worker/${worker.id}`}><Avatar
                                            alt={worker.fio}
                                            src="/static/images/avatar/1.jpg"
                                            sx={{ width: 50, height: 50 }}
                                        /></Link></TableCell>
                                        <TableCell style={{ width: '30%' }} align="left"><a style={{color: 'white'}}>{worker.fio}</a></TableCell>
                                        <TableCell style={{ width: '20%' }} align="left"><a>{worker.email}</a></TableCell>
                                        <TableCell style={{ width: '20%' }} align="left"><a>{worker.phone}</a></TableCell>
                                        <TableCell style={{ width: '10%' }} align="left"><a>{worker.date}</a></TableCell>
                                        <TableCell style={{ width: '20%' }} align="left"><a>{worker.position}</a></TableCell>
                                        {/* <TableCell style={{ width: '80%' }} align="left"><a></a></TableCell> */}
                                    </TableRow>                
                                ))}
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
function Row(props) {
    const { place } = props;
    const [workers, setWorkers] = useState([])
    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (open) {
            if (place == 'Астана') {
                axios.get("http://10.202.20.92:8081/api/pandora/main/3users1").then(res => {
                    setWorkers(res.data)
                    console.log(res.data)
                })
            } else {
                axios.get("http://10.202.20.92:8081/api/pandora/main/3users2").then(res => {
                    setWorkers(res.data)
                    console.log(res.data)
                })
            }
        }
    }, [open])
    
    return (
      <>
        <TableRow hover style={{borderRadius: '3px', borderBottom: 'hidden'}} className="userDetailsRow">
            <TableCell style={{width: '95%', fontSize: '20px', fontWeight: '600'}}>{place}</TableCell>
            <TableCell  style={{width: '5%'}}>
                <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
                >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
                </IconButton>
            </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                {workers.map((worker) => (
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{ width: '100%' }} align="left"><a>{worker.email}</a></TableCell>
                      {/* <TableCell style={{ width: '80%' }} align="left"><a></a></TableCell> */}
                    </TableRow>                
                ))}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }
export default WorkersPage;