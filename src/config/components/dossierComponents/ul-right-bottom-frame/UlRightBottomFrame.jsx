import React, { useState, useEffect } from 'react';
import './rightBottomFrame.scss'
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {Link, useParams} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

function UlRightBottomFrame(props) {
    const [opg, setOpg] = useState(props.opg ? props.opg : [])
    const [esf, setEsf] = useState(props.esf ? props.esf : [])
    const [nds, setNds] = useState(props.nds ? props.nds : [])
    const [bankrot, setBankrot] = useState(props.bankrot ? props.bankrot : [])
    const [omn, setOMN] = useState(props.omn ? props.omn : [])
    const [count, setCount] = useState(opg?.length + esf?.length + nds?.length + bankrot?.length + omn?.length)

    return (

        <div className="right-bottom-section">
            <h3>Риски - {count}</h3>
            <div className="other-line">
                <OPGTable array={opg} />
                <BlockEsfBlock array={esf} />
                <NdsTable array={nds} />
                <BankrotTable array={bankrot} />
                <OmnTable array={omn} />
            </div>
        </div>

    );
}

const OmnTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(array?.length > 0)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>Отсутствие по месту нахождения(ОМН) - {array?.length}</a></TableCell>
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
                            {/* <TableCell sx={{padding: 1}} style={{ width: '30%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Наименование ИП</a></TableCell> */}
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>ИИН идентификатора ЮЛ</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>ФИО идентификатора ЮЛ</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Номер решения</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата решения</a></TableCell>
                            {/* <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"></TableCell> */}
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length > 0 ? array.map((row, index) => (
                        <OmnRow row={row} />
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

const OmnRow = (props) => {
    const {row} = props


    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.leader_iin || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.leader_fio || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.decision_number || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.decision_date || "---"}</a></TableCell>
        </TableRow>
        </>
    )
}

const BankrotTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(array?.length > 0)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>Банкроты - {array?.length}</a></TableCell>
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
                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Документ</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата обновления</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Причина</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length > 0 ? array.map((row, index) => (
                        <BankrotRow row={row} />
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

const BankrotRow = (props) => {
    const {row} = props


    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.document || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.update_dt != null ? row.update_dt.substring(0, 10) : "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.reason || "---"}</a></TableCell>
            {/* <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.reason || "---"}</a></TableCell> */}
        </TableRow>
        </>
    )
}
const NdsTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(array?.length > 0)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>Снятые с учета по НДС - {array?.length}</a></TableCell>
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
                            {/* <TableCell sx={{padding: 1}} style={{ width: '30%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Наименование ИП</a></TableCell> */}
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата постановки на учет</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата обновления</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата снятия с учета</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Причина снятия с учета по НДС</a></TableCell>
                            {/* <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"></TableCell> */}
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length > 0 ? array.map((row, index) => (
                        <NdsRow row={row} />
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

const NdsRow = (props) => {
    const {row} = props


    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.startDt != null ? row.startDt.substring(0, 10) : "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.updateDt != null ? row.updateDt.substring(0, 10) : "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.endDt != null ? row.endDt.substring(0, 10) : "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.reason || "---"}</a></TableCell>
        </TableRow>
        </>
    )
}

const OPGTable = (props) => {
    const {array} = props
    const [open, setOpen] = useState(array?.length > 0)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>ОПГ - {array?.length}</a></TableCell>
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
                            <TableCell sx={{padding: 1}} style={{ width: '30%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Регион</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>ОПГ</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Наименование</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Год</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length > 0 ? array.map((row, index) => (
                        <OPGRow row={row} />
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
const OPGRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)


    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.region || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.groupe || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.name || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.year || "---"}</a></TableCell>
        </TableRow>
        </>
    )
}

const BlockEsfBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(array?.length > 0)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>Блок ЕСФ - {array?.length}</a></TableCell>
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
                            <TableCell sx={{padding: 1}} style={{ width: '40%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Дата начала</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата обновления</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата окончания</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length > 0 ? array.map((row, index) => (
                        <BlockEsfRow row={row} />
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

const BlockEsfRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)

    let ipName = row.esfName

    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.start_dt  || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.update_dt || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.end_dt || "---"}</a></TableCell>
            {/* <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.end_dt || "---"}</a></TableCell> */}
        </TableRow>
        </>
    )
}

function withParams(Component) {
    return props =>
        <Component {...props} username={useParams()} />;
}

export default withParams(UlRightBottomFrame);