import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './rightBottomFrame.scss';

function RightBottomFrame(props) {
    const [count, setCount] = useState(0)

        useEffect(() => {
            console.log(props.wantedList)

            Object.keys(props).map(key => {
                if (Array.isArray(props[key])) {
                    setCount(prev => props[key].length > 0 ? prev + props[key].length : prev)
                }
            })
        }, [])
    return (

        <div className="right-bottom-section">
            <h3>Риски - {count}</h3>
            <div className="other-line">
                <CriminalsBlock array={props.criminals} />
                <ConvictsBlock array={props.convicts}/>
                <CreditBlock array={props.firstCreditBureauEntities}/>
                <BlockEsfBlock array={props.blockEsf} />
                <MzBlock array={props.mzEntities} />
                <ConvictTerminatedBlock array={props.convictsTerminatedByRehabs}/>
                <DetdomBlock array={props.detdom}/>
                <AdmsBlock array={props.adms}/>
                <AmoralTable array={props.Amoral}/>
                <ConvictsAbroadTable array={props.convictsAbroads}/>
                <BeneficiariesTable array={props.beneficiariesList}/>
                <IncapacitatedTable array={props.incapacitateds}/>
                <DrugAddictsTable array={props.drugAddicts}/>
                <KuisTable array={props.kuis}/>
                <DismissalTable array={props.dismissal}/>
                <PdlTable array={props.pdl.filter((x) => x!= null)} />
                <WantedTable array={props.wantedList} />
            </div>
        </div>

    );
}


const WantedTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>В розыске</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Орган</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Инициатор</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Статус</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Количество дней</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <WantedRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const WantedRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.organ || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.initiator || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.status || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.days || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.relevanceDate != null ? row?.relevanceDate.substring(0, 10) : "---"}</a></TableCell>
        </TableRow>
        </>
    )
}


const IncapacitatedTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Недееспособные</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Суд</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата решения</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Статус</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Причина</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <IncapacitatedRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const IncapacitatedRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.court || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.date_decision || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.soct || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.cause || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}

const BeneficiariesTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Льготники</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Статус</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <BeneficiariesRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const BeneficiariesRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.status || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}



const DrugAddictsTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Сведения по наркотическим веществам</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>№</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>ФИО</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Источник</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <DrugAddictsRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const DrugAddictsRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.id || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.fio || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.source || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}




const ConvictsAbroadTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Осужденные за рубежом</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Номер</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Страна</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Статья</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Суд Орган</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Дата Судебного Решения</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Дата вступления</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Мера наказания</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <ConvictsAbroadRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const ConvictsAbroadRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.number || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.country || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.qualification || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.sud_organ || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.court_descision_date || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.entry_date || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.measure || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}




const AmoralTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Аморальный образ жизни (ст.449)</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Орган выявивший правонарушение</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата решения</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Размер наложенного штрафа</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <AmoralRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const AmoralRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.authority_detected || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.decision_date || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.fine_amount || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}


const KuisTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Заключенные</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>№</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Учреждение</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Регион</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>БИН</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата прибытия</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Начало периода</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Окончание периода</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Личная дата закрытия</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Основание для личного закрытия</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата отправления</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Статья обвинительного приговора</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Редакционный кодекс</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <KuisRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const KuisRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.editorial_code || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.institution || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.region || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.bin || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.arrival_date || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.period_start || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.period_end || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.personal_closure_date || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.personal_closure_ground || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.departure_date || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.conviction_article || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.editorial_code || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}




const DismissalTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
            <TableContainer sx={{marginTop: 0}}>
                <Table aria-label="collapsible table" className="uitable">

                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Уволенные по отрицательным мотивам</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                                        <TableRow className="uitableHead">
                                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Орган</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Место работы</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Номер приказа</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата приказа</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody style={{borderBottom: 'hidden'}}>
                                        {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                                            <DismissalRow row={row} />
                                        )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                                    </TableBody>
                                </Box>
                            </Collapse>
                        </TableCell>
                    </TableRow>
                </Table>
            </TableContainer>
        </>
    )
}

const DismissalRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.organ || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.work_place || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.order_num || "---"}</a></TableCell>
                <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.order_date || "---"}</a></TableCell>
            </TableRow>
        </>
    )
}




const PdlTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)
  
    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">
  
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>ПДЛ (Публичные должностые лица)</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{ margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>ИИН</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>ФИО</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Должность</a></TableCell>
                            {/* <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Область</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Орган</a></TableCell> */}
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array.length != 0 ? array.map((row, index) => (
                        <PdlRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={4} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
  }
  
const PdlRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.iin}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.fio}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.position}</a></TableCell>
            {/* <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.oblast}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.organ}</a></TableCell> */}
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{ margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Область</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.oblast || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Орган</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.organ || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>ИИН супруги</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.spouse_iin || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>ФИО супруги</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.spouse_fio || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Госорган супруги</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.spouse_organ || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Должность супруги</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.spouse_position || "---"}</a></TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const AdmsBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}><a>Административные правонарушения</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '60%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Орган выявивший правонарушение</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата заведения</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Номер протокола</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 > 0 ? array?.filter((x) => x != null).map((row, index) => (
                        <AdmsRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const AdmsRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.authority_detected || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.reg_date || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.protocol_num || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Квалификация</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.qualification || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Ответственное лицо</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.fifteen || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Место работы</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.work_place || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Принудительное исполнение</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.fifty_six || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>На срок до</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.end_date || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Размер наложенного штрафа</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.fine_amount|| "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Основания прекращения</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.teminate_reason || "---"}</a></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const ConvictTerminatedBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}><a>Осужденные</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '20%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Статья для учета</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Последнее решение</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата последнего решение</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <ConvictTerminatedRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const ConvictTerminatedRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.qualification_desc || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.last_solution || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.last_solution_date || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Тяжесть преступления</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.qualification_by_11 || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Следственный орган</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.investigative_authority || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>ЕРДР номер</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.erdr_number || "---"}</a></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const DetdomBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}><a>Воспитанник детского дома</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}} style={{ width: '100%',fontSize: '12px', color: "rgb(199, 199, 199)"}} >
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Регион</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Область</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Наименование учреждения</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Год выпуска</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array !== null && array !== undefined && array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <DetdomRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const DetdomRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.region || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.distict || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.orphanage_name || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.graduation_year || "---"}</a></TableCell>
        </TableRow>
        </>
    )
}

const MzBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}><a>Минздрав</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '30%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Статья для учета</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '70%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Наименование болезни</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <MzRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const MzRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.diseaseCode || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.reg || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Статья для учета</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.statusMz || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Медицинская организация</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.medicalOrg || "---"}</a></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const CriminalsBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}><a>Преступления</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Статья для учета</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Суд 1 инстанции</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата рассмотрения в суде 1 инстанции</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <CriminalRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const CriminalRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.crime_name || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.court_name || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.court_dt || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Решение по лицу</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.decision || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Мера наказания по приговору</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.sentence || "---"}</a></TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Принудительное лечение</a></TableCell>
                            <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.treatment || "---"}</a></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const ConvictsBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Приговоры</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Статья для учета</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Суд 1 инстанции</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата рассмотрения в суде 1 инстанции</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <ConvictRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const ConvictRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

/*
        code_started_investiogation: null
        consider_date_first_instance: null
        court_of_first_instance: "суд города Сарань Карагандинской области"
        decision_on_person: "прекращено в порядке медиации ст.35 ч. 1 п. 12 УПК РК - ст. 68 ч.1 УК РК"
        investigative_authority: null
        is_rab: false
        measure_punishment: null
        qualification: "Кража"
        reg_date: "2017-04-13"
    */

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.qualification || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.court_of_first_instance || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.reg_date || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                        <TableRow style={{borderBottom: 'hidden'}}>
                            <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a>Решение по лицу</a></TableCell>
                            <TableCell style={{ width: '80%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.decision_on_person || "---"}</a></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const BlockEsfBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Блок ЕСФ</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>ИП</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата начала</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата окончания</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <BlockEsfRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const BlockEsfRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    let ipName = row?.esfName

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{ipName || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.start_dt || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.end_dt || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>дата обновления</a></TableCell>
                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.update_dt || "---"}</a></TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

const CreditBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Первое Кредитное Бюро(ПКБ)</a></TableCell>
                <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
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
                <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '25%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Регион</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '45%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Наименование фин. институтов</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Сумма долга</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Общая сумма</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Актуальность</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.filter((x) => x != null).length > 0 ? array.map((row, index) => (
                        <CreditRow row={row} />
                    )): <TableCell  className="zeroResult" align="center" colSpan={6} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                    </TableBody>
                    </Box>
                </Collapse>
                </TableCell>
            </TableRow>
            </Table>
        </TableContainer>
        </>
    )
}

const CreditRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)
    // const relevanceDate = new Date(row?.relevanceDate).getFullYear() + '-' + (new Date(row?.relevanceDate).getMonth() + 1) + '-' + new Date(row?.relevanceDate).getDate()
    let relevanceDate = new Date(row?.relevanceDate)
    relevanceDate = ('0' + relevanceDate.getDate()).slice(-2) + '-'
             + ('0' + (relevanceDate.getMonth()+1)).slice(-2) + '-'
             + relevanceDate.getFullYear();

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.region || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.finInstitutionsName || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.amountOfDebt || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.totalSumOfCredits || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{relevanceDate || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}}>
            <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
            >
                {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
            </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
                <Table size="small" aria-label="purchases">
                    <TableHead>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '60%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Максимальное количество дней просрочки</a></TableCell>
                        <TableCell style={{ width: '40%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.maxDelayDayNum1 || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '60%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Максимальное количество дней просрочки</a></TableCell>
                        <TableCell style={{ width: '40%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.maxDelayDayNum2 || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '60%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Количество займов</a></TableCell>
                        <TableCell style={{ width: '40%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.quantityFpdSpd || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '60%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Общее количество займов</a></TableCell>
                        <TableCell style={{ width: '40%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.totalCountOfCredits || "---"}</a></TableCell>
                    </TableRow>
                    </TableHead>
                </Table>
                </Box>
            </Collapse>
            </TableCell>
        </TableRow>
        </>
    )
}

function withParams(Component) {
    return props =>
        <Component {...props} username={useParams()} />;
}

export default withParams(RightBottomFrame);