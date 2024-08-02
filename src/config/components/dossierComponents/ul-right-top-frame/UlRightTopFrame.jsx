import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './rightTopFrame.scss'

import {Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function UlRightTopFrame(props) {
  const soc = ''
  const [founders, setFounders] = useState([]);
  const [pdl, setPdl] = useState([])
  const [uchreditel, setUchreditel] = useState([])
  useEffect(() => {
    setFounders(props.founders)
    setPdl(props.pdls)
    setUchreditel(props.uchreditel)
  }, [soc])


    const displayData = () => {
        return (
            <div >
                <span>Нет данных</span>
            </div>
        )
    }
    return ( 
        
        <div className="right-top-section">
            <div className="other-line">
                <UchreditelTable array = {uchreditel} />
                <FoundersBlock array={founders}/>
                <PdlTable array={pdl} />
            </div>  
        </div>

    );
}

const UchreditelTable = (props) => {
  const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>Учредители</a></TableCell>
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
                    <Box sx={{borderRadius: '3px',  margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                        <TableRow className="uitableHead">
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>ИИН/БИН</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>ФИО/Наименование ЮЛ</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '15%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Идентификатор</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата рег.</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Риск</a></TableCell>
                            {/* <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Область</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Орган</a></TableCell> */}
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length != 0 ? array.map((row, index) => (
                        <UchreditelRow row={row} />
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

const UchreditelRow = (props) => {
    const {row} = props


    return (
        <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
            <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.iin_bin || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.fioorUlName || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.identificator || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.reg_date || "---"}</a></TableCell>
            <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.risk || "---"}</a></TableCell>
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
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>ПДЛ (Публичные должностые лица)</a></TableCell>
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
                            <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>ИИН</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>ФИО</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Должность</a></TableCell>
                            {/* <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Область</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Орган</a></TableCell> */}
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length != 0 ? array.map((row, index) => (
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
          <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.iin}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.fio}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.position}</a></TableCell>
          {/* <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.oblast}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.organ}</a></TableCell> */}
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
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Область</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.oblast || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Орган</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.organ || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>ИИН супруги</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.spouse_iin || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>ФИО супруги</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.spouse_fio || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Госорган супруги</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.spouse_organ || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Должность супруги</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.spouse_position || "---"}</a></TableCell>
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


const FoundersBlock = (props) => {
    const {array} = props
    const [open, setOpen] = useState(true)

    return (
        <>
        <TableContainer sx={{marginTop: 0}}>
            <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>Со основатели</a></TableCell>
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
                            <TableCell sx={{padding: 1}} style={{ width: '50%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>ФИО</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата регистрации</a></TableCell>
                            <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                        </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {array?.length > 0 ? array.map((row, index) => (
                        <FounderRow row={row} />
                    )): 
                    <TableCell  className="zeroResult" align="center" colSpan={4} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
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
const FounderRow = (props) => {
    const {row} = props
    const [open, setOpen] = useState(false)
  
    return (
      <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
          <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row.lastname+' '+row.firstname+' '+row.patronymic || "---"}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{verticalAlign: 'top', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.reg_date || "---"}</a></TableCell>
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
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Депозит</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.deposit || "---"}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{verticalAlign: 'top', width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Доля</a></TableCell>
                      <TableCell style={{verticalAlign: 'top', width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.share || "---"}</a></TableCell>
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
    return props => <Component {...props} username={useParams()} />;
}

export default withParams(UlRightTopFrame);
