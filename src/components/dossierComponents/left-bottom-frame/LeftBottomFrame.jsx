import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './leftBottomFrame.scss'

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

function LeftBottomFrame(props) {
    const soc = ''
    const [docs, setDocs] = useState([])
    const [addresses, setAddresses] = useState([])
    const [transport, setTransport] = useState([])
    const [schools, setSchools] = useState([])
    const [universities, setUniversities] = useState([])
    const [pensions, setPensions] = useState([])
    const [military, setMilitary] = useState([])
    const [nedvijimost, setNedvijimost] = useState([])
    const [militaryEntities, setMilitaryEntities] = useState([])
    const [contacts, setContacts] = useState([])
    const [equipment, setEquipment] = useState([])
    const [ipgoEmailEntities, setIpgoEmailEntities] = useState([])
    const [ulLeaders, setUlLeaders] = useState([])
    const [flUlFounders, setFlUlFounders] = useState([])
    const [commodityProducers, setCommodityProducers] = useState([])
    
    const [professions, setProfessions] = useState({
      accountant: [],
      advocate: [],
      auditors: [],
      bailiff: []
    })

    useEffect(()=> {
        if (props.docs) {
          props.docs.sort((a, b) => {
            if (a.doc_type_ru_name > b.doc_type_ru_name) {
                return -1;
            } else if (a.doc_type_ru_name < b.doc_type_ru_name) {
                return 1;
            } else {
                return 0;
            }
          })
        }

        const filteredTSPRT = props.transport?.filter(x => x != null) 
        setDocs(props.docs)
        setAddresses(props.addresses)
        setTransport(filteredTSPRT)
        setSchools(props.schools)
        setUniversities(props.universities)
        setPensions(props.pensions)
        setMilitary(props.military)
        setMilitaryEntities(props.militaryEntities)
        setNedvijimost(props.nedvijimost)
        setContacts(props.contacts)
        setEquipment(props.equipment)
        setUlLeaders(props.ulLeaders)

        setCommodityProducers(props.commodityProducers)

        setProfessions({
          accountant: props.accountantListEntities,
          advocate: props.advocateListEntities,
          auditors: props.auditorsListEntities,
          bailiff: props.bailiffListEntities
        })

        setIpgoEmailEntities(props.ipgoEmailEntities)
        setFlUlFounders(props.flUlFounders)

    }, [soc])
    return ( 

        <div className="left-bottom-section">
            <div className="other-line">
                <div>
                    {/* <label htmlFor="born-city" style={{fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}>Адресы прописки</label> */}
                    <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Адресы прописки - {addresses != null ? addresses.length : 0}</a></TableCell>
                    </TableRow>
                    <TableContainer sx={{backgroundColor: '#ffffff0a', borderRadius: '3px',  marginTop: '10px'}}>
                        <Table aria-label="collapsible table" className="uitable">
                            <TableHead sx={{backgroundColor: '#ffffff0a'}}>
                            <TableRow className="uitableHead">
                                <TableCell sx={{padding: 1}} style={{ width: '5%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>№</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Страна</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Город</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Улица, дом, квартира</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '10%', color: "#fff" }} align="left"></TableCell>
                            </TableRow>
                            </TableHead> 
                            <TableBody style={{borderBottom: 'hidden'}}>
                            {addresses && addresses.length>0 ? addresses.map((row, index) => (
                                <AddressRow row={row} index={index} />
                            )): <TableCell  className="zeroResult" align="center" colSpan={4} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div>
                    <TableContainer>
                        <Table aria-label="collapsible table" className="uitable">
                            <TableBody >
                            {docs && docs.length>0 ? docs.map((row, index) => (
                                <Row row={row} index={index} />
                            )): <TableCell  className="zeroResult" align="center" colSpan={4} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TransportRow row={transport} exist={transport && transport.length > 0 ? true : false}/>
                    {equipment && equipment.length > 0? <EquipmentBlock array={equipment}/> : ""}
                    <SchoolsBlock schools={schools} exist={schools && schools.length > 0 ? true : false}/>
                    <UniversityBlock universities={universities} exist={universities && universities.length > 0 ? true : false}/>
                    {military && military.length > 0? <MilitaryBlock military={military} militaryEntities={militaryEntities} exist={military && military.length > 0 ? true : false}/> : ""}
                    {nedvijimost && nedvijimost.length > 0? <NedvijimostBlock nedvijimost={nedvijimost} exist={nedvijimost.length > 0 ? true : false}/> : ""}
                    {contacts && contacts.length > 0? <ContactsBlock array={contacts} exist={contacts.length > 0? true : false}/> : ""}
                    {professions && Object.keys(professions).length > 0? <ProfessionsBlock professions={professions}/> : ""}
                    {ulLeaders ? <UlLeaderBlock uls={ulLeaders}/> : "" }
                    {flUlFounders && flUlFounders.length > 0? <FlUlFounderBlock array={flUlFounders}/> : "" }
                    {<IpgoEmailBlock array={ipgoEmailEntities}/>}
                    {pensions && pensions.length > 0? <FlPensionBlock pensions={pensions} exist={pensions.length > 0 ? true : false}/> : ""}
                </div>
                {/* TRANSPORT */}
                <div style={{width: '100%'}}>
                </div>
            </div>   
        </div>
    );
}



const FlUlFounderBlock = (props) => {
  const {array} = props
  const exist = array.length > 0? true : false
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Сведения об участии в ЮЛ - {array != null ? array.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '20%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Наименование ЮЛ</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '80%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата регистрации</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '80%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>БИН</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? array.map((row, index) => (
                      <FlUlFounderRow row={row}/>
                  )): <TableCell  className="zeroResult" align="center" colSpan={3} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
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

const FlUlFounderRow = (props) => {
  const {row} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.name || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.reg_date || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.bin_org || "---"}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Идентификатор ЮЛ</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.id || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Риски</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.risks || "---"}</a></TableCell>
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

const UlLeaderBlock = (props) => {
  let {uls} = props
  const [open, setOpen] = useState(false)
  if (uls != null) { 
    return (
      <>
        <TableContainer sx={{marginTop: 0}}>
          <Table aria-label="collapsible table" className="uitable">
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Сведения об участии в ЮЛ - {uls != null ? uls.length : 0}</a></TableCell>
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
                  <Box sx={{ borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                    <TableHead sx={{ backgroundColor: '#ffffff0a'}}>
                      <TableRow className="uitableHead">
                          <TableCell sx={{padding: 1}} style={{ width: '30%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Идентификатор ЮЛ</a></TableCell>
                          <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Дата регистрации</a></TableCell>
                          <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>БИН</a></TableCell>
                          <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                      </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    { uls.length > 0 ? uls.map((row, index) => (
                        <UlLeaderRow row={row} />
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
  else {
    return null
  }
}

const UlLeaderRow = (props) => {
  let {row} = props

  return (
    <>
        <TableRow className="uitableHead">
          <TableCell sx={{padding: 1}} style={{ width: '33%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>{row?.is_curr ? "Директор" : "Директор(исторический)"}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{ width: '33%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>{row?.reg_date.substring(0, 10)}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{ width: '33%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>{row?.bin_org}</a></TableCell>
        </TableRow>
    </>
  )

}

const IpgoEmailBlock = (props) => {
  let {array} = props
  const exist = array && array.length > 0
  const [open, setOpen] = useState(false)

  if (exist) {
    array = array?.filter((value, index, self) =>
      index === self.findIndex((t) => (
        t.organ === value.organ && t.position === value.position && t.email === value.email
      ))
    )

    return (
      <>
        <TableContainer sx={{marginTop: 0}}>
          <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Сведения по ИПГО - {array != null ? array.length : 0}</a></TableCell>
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
                          <TableCell sx={{padding: 1}} style={{ width: '30%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Департамен</a></TableCell>
                          <TableCell sx={{padding: 1}} style={{ width: '40%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Должность</a></TableCell>
                          <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >ИПГО почта</a></TableCell>
                          <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                      </TableRow>
                    </TableHead> 
                    <TableBody style={{borderBottom: 'hidden'}}>
                    {exist ? array.map((row, index) => (
                        <IpgoEmailRow row={row} />
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
  else {
    return null
  }
}

const IpgoEmailRow = (props) => {
  let {row} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.organ || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.position || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.email || "---"}</a></TableCell>
      </TableRow>
    </>
  )
}

const ProfessionsBlock = (props) => {
  const {accountant, advocate, auditors, bailiff} = props.professions
  const [open, setOpen] = useState(false)

  let blockTitle = [
    accountant && accountant.length > 0 ? "Бухгалтер" : '',
    advocate && advocate.length > 0 ? "Адвокат" : '', 
    auditors && auditors.length > 0 ? "Аудитор" : '',
    bailiff && bailiff.length > 0 ? "Частный судебный исполнитель" : ''
  ]

  blockTitle = blockTitle?.filter(value => value != '').join(', ')

  if (blockTitle === undefined)
    return (
      <>
        <TableContainer sx={{marginTop: 0}}>
          <Table aria-label="collapsible table" className="uitable">

            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}>
                  <a>
                    {blockTitle}
                  </a>
                </TableCell>
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
            <TableRow style={{width: '100%'}}>
              <TableCell sx={{padding: 1}} style={{width: '100%', paddingBottom: 0, paddingTop: 0}} colSpan={2}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0'}}>
                    <TableContainer>
                      <Table>
                        <TableHead sx={{backgroundColor: '#ffffff0a'}} >
                          <TableRow className="uitableHead">
                              <TableCell sx={{padding: 1}} style={{ width: '90%', fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Профессия</a></TableCell>
                              <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)"}} align="right"><a> </a></TableCell>
                          </TableRow>
                        </TableHead> 
                        <TableBody style={{borderBottom: 'hidden'}}>
                          {accountant.length > 0 || advocate.length > 0 || auditors.length > 0 || bailiff.length > 0
                          ? 
                          <>
                          {accountant.map(row => (
                            <ProfessionsRow row={row} />
                          ))}
                          {advocate.map(row => (
                            <ProfessionsRow row={row} />
                          ))}
                          {auditors.map(row => (
                            <ProfessionsRow row={row} />
                          ))}
                          {bailiff.map(row => (
                            <ProfessionsRow row={row} />
                          ))}
                          </>
                          : <TableCell className="zeroResult" align="center" colSpan={2} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
      </>
    )
  else return null
}

const ProfessionsRow = (props) => {
  const {row} = props
  const [open, setOpen] = useState(false)

  const rus_headers = {
    bin: 'БИН Организации',
    lilicenseDate: 'Дата выдачи лицензии',
    licenseNumber: 'Номер лицензии',
    auditorNumber: 'Номер аудитора',
  }

  let profName = row?.prof || row?.status || "---"
  profName = profName.toUpperCase()

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell colSpan={1} sx={{padding: 1}} style={{fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{profName}</a></TableCell>
        <TableCell colSpan={1} sx={{padding: 1}} align='right'>
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
        <TableCell style={{ width: '100%', paddingBottom: 0, paddingTop: 0 }} colSpan={2}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{borderRadius: '3px', margin: 1, marginLeft: '2.6%' }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  {
                    Object.keys(row).map((key) => {
                      if (rus_headers[key] !== undefined)
                      return (
                        <TableRow key={key} style={{borderBottom: 'hidden'}}>
                          <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a>{rus_headers[key]}</a></TableCell>
                          <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row[key] || "---"}</a></TableCell>
                        </TableRow>
                      )
                    })
                  }
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const EquipmentBlock = (props) => {
  const {array} = props
  const exist = array.length > 0
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Техника - {array != null ? array.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Модель</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Гос. номер</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Заводской номер (ВИН)</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? array.map((row, index) => (
                      <EquipmentRow row={row} />
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

const EquipmentRow = (props) => {
  const {row} = props
  const [open, setOpen] = useState(false)

  let regDate = new Date(row?.reg_date)
  regDate = ('0' + regDate.getDate()).slice(-2) + '/'
            + ('0' + (regDate.getMonth()+1)).slice(-2) + '/'
            + regDate.getFullYear();

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.equipment_model || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.gov_number || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.vin || "---"}</a></TableCell>
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
                  {/* <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Серия и номер техпаспорта</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.equipmentType || "---"}</a></TableCell>
                  </TableRow> */}
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Модель</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.equipmentType || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Дата регистрации</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{regDate|| "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Марка</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.brand || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Серия и номер техпаспорта</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.reg_series_num || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>В аресте (да/нет)</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.is_arrest !== null ? (row?.is_arrest ? "Да" : "Нет") : "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>В залоге (да/нет)</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.is_pledge !== null ? (row?.is_pledge ? "Да" : "Нет") : "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Первичная регистрация (да/нет)</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.is_first_reg !== null ? (row?.is_first_reg ? "Да" : "Нет") : "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '40%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Первичная регистрация (да/нет)</a></TableCell>
                    <TableCell style={{ width: '60%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.is_first_reg !== null ? (row?.is_first_reg ? "Да" : "Нет") : "---"}</a></TableCell>
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

const ContactsBlock = (props) => {
  const {array, exist} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Контактные данные - {array != null ? array.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Email</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Номер телефона</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? array.map((row, index) => (
                      <ContactRow row={row} />
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

const ContactRow = (props) => {
  const {row} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.email || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.phone || "---"}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Ник</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.nickname || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Source</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.source || "---"}</a></TableCell>
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

const NedvijimostBlock = (props) => {
  const {nedvijimost, exist} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Недвижимости - {nedvijimost != null ? nedvijimost.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>Кадастровый номер №</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Адрес</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Площадь общая</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? nedvijimost.map((row, index) => (
                      <NedvijimostRow row={row} />
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

const NedvijimostRow = (props) => {
  const {row} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.cadastral_number || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.address_rus}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.area_total}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Вид документа</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.type_of_property_rus || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Номер документа</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.register_emergence_rights_rus || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Дата документа</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{null && row?.date_end || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Правообладатель</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.owner_full_name || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Этажность</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.floor || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Дата регистрации</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.register_reg_date || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Дата прекращения</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.register_end_date || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Количество составляющих</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{null && row?.date_end || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Сумма сделки (стоимость)</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{null && row?.date_end || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Жилая площадь</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.area_usefull || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>ИИН/БИН продавца</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{null && row?.owner_iin_bin || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>ФИО/Наименование продавца</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{null && row?.date_end || "---"}</a></TableCell>
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

const MilitaryBlock = (props) => {
  const {military, militaryEntities, exist} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Воинский учет - {military != null ? military.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>БИН</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '80%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Наименование воинской части</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? military.map((row, index) => (
                      <MilitaryRow militaryEntities={militaryEntities} row={row} />
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

const MilitaryRow = (props) => {
  const {militaryEntities, row} = props
  const [open, setOpen] = useState(false)

  const getMilitaryName = (bin) => {
    return militaryEntities?.filter(item => item.bin === bin)[0].orgName
  }

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.bin || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{getMilitaryName(row?.bin)}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Дата службы с</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.date_start || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Дата службы по</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.date_end || "---"}</a></TableCell>
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

const SchoolsBlock = (props) => {
  const {schools, exist} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Школы - {schools != null ? schools.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '20%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>БИН ШКОЛЫ</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '80%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a >Название школы</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? schools.map((row, index) => (
                      <SchoolRow school={row} index={index} />
                  )): <TableCell  className="zeroResult" align="center" colSpan={3} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
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

const SchoolRow = (props) => {
  const {school} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{school.school_code}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{school.school_name}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Класс</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{school.grade || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Год поступления</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{school.start_date || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Год окончания</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{school.end_date}</a></TableCell>
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

const FlPensionBlock = (props) => {
  const {pensions, exist} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Пенсионные начисления</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '15%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>БИН</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '70%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Наименование ЮЛ</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '10%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Года поступления начислений</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? pensions.map((row, index) => (
                      <FlPensionRow pension={row} index={index} />
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

const FlPensionRow = (props) => {
  const {pension} = props
  const [open, setOpen] = useState(false)

  const getPensionYears = () => {
    return pension.years.map(year => {
      return year.substring(0, 4)
    }).join(", ")
  }

  const getNakoplenie = (year, knp) => {
    let nakoplenie = pension.flPensionMinis?.filter(item => {

      if (item && item.pay_date+"" === year.substring(0, 4) && item.KNP === knp) return true
    })

    let sum = 0
    for (let i=0; i<nakoplenie.length; i++) {
        sum += parseInt(nakoplenie[i].AMOUNT)
    }

    return sum
  }

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{pension.companyBin}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{pension.flPensionMinis && pension.flPensionMinis[0] && pension.flPensionMinis[0].P_NAME || "---"}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }}><a>{getPensionYears()}</a></TableCell>
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
                <TableHead sx={{width: "60%"}}>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '10%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>{"Период"}</a></TableCell>
                    <TableCell style={{ width: '45%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a>{"Общая сумма (012)"}</a></TableCell>
                    <TableCell style={{ width: '45%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a>{"Общая сумма (010)"}</a></TableCell>
                  </TableRow>
                  {pension.years.map(year => {
                    return (
                      <TableRow key={year} style={{borderBottom: 'hidden'}}>
                        <TableCell style={{ width: '10%', fontSize: '12px', color: "#FFFFFF" }}  align="left"><a>{year.substring(0, 4)}</a></TableCell>
                        <TableCell style={{ width: '45%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{getNakoplenie(year.substring(0, 4), "012")}</a></TableCell>
                        <TableCell style={{ width: '45%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{getNakoplenie(year.substring(0, 4), "010")}</a></TableCell>
                      </TableRow>
                    )
                  })}
                  
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const UniversityBlock = (props) => {
  const {universities, exist} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">

          <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{borderBottom: 'hidden', width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>ВУЗЫ - {universities != null ? universities.length : 0}</a></TableCell>
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
                        <TableCell sx={{padding: 1}} style={{ width: '20%',fontSize: '12px', color: "rgb(199, 199, 199)"}} align="left"><a>БИН ВУЗА</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '80%', fontSize: '12px', color: "rgb(199, 199, 199)" }} align="left"><a>Название ВУЗА</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{ width: '5%', color: "#fff" }} align="left"></TableCell>
                    </TableRow>
                  </TableHead> 
                  <TableBody style={{borderBottom: 'hidden'}}>
                  {exist ? universities.map((row, index) => (
                      <UniversityRow university={row} index={index} />
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

const UniversityRow = (props) => {
  const {university} = props
  const [open, setOpen] = useState(false)

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{university.study_code}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{university.study_name}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Специализация</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{university.spec_name || university.spec_name_2 || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Длительность обучения</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{university.duration || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Год поступления</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{university.start_date || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Год окончания</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{university.end_date || "---"}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>{university.five ? "Группа" : "Курс"}</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{university.five || university.course || "---"}</a></TableCell>
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

function TransportRow(props) {
    const {row, exist} = props;
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <TableContainer sx={{marginTop: 0}}>
        <Table aria-label="collapsible table" className="uitable">
            <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
              <TableCell sx={{padding: 1}} style={{width: '90%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>Транспорт - {row != null ? row?.length : 0}</a></TableCell>
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
            <TableRow style={{}}>
              <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                  
                  <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{borderRadius: '3px', margin: 0, marginLeft: '0' }}>
                              <TableHead>
                                <TableRow className="uitableHead"  style={{borderBottom: 'hidden'}}>
                                    <TableCell sx={{padding: 1}} style={{ width: '1%',fontSize: '14px', color: "#6D6D6D"}} align="left"><a>№</a></TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '13%', fontSize: '14px', color: "#6D6D6D" }} align="left">Модель</TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '13%', fontSize: '14px', color: "#6D6D6D" }} align="left">Серийный номер</TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '5%',fontSize: '14px', color: "#6D6D6D" }} align="left">Номер</TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '10%',fontSize: '14px', color: "#6D6D6D" }} align="left">Дата с</TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '10%',fontSize: '14px', color: "#6D6D6D" }} align="left">До</TableCell>
                                </TableRow>
                              </TableHead> 
                                <TableBody style={{borderBottom: 'hidden'}}>
                                { 
                                    exist ? row?.map((car, index) => {
                                        return (
                                            <>
                                            <TableRow className="uitableHead"  style={{borderBottom: 'hidden'}}>
                                                <TableCell sx={{padding: 1}} style={{ fontSize: '14px', color: "#FFFFFF"}} align="left">{index+1}</TableCell>
                                                <TableCell sx={{padding: 1}} style={{  fontSize: '14px', color: "#FFFFFF" }} align="left">{car.brand_model}</TableCell>
                                                <TableCell sx={{padding: 1}} style={{  fontSize: '14px', color: "#FFFFFF" }} align="left">{car.series_reg_number}</TableCell>
                                                <TableCell sx={{padding: 1}} style={{  fontSize: '14px', color: "#FFFFFF" }} align="left">{car.reg_number}</TableCell>
                                                <TableCell sx={{padding: 1}} style={{ fontSize: '14px', color: "#FFFFFF" }} align="left">{car.date_certificate}</TableCell>
                                                <TableCell sx={{padding: 1}} style={{  fontSize: '14px', color: "#FFFFFF" }} align="left">{car.end_date}</TableCell>
                                            </TableRow>
                                            </>
                                            )
                                        }) 
                                        : 
                                        <TableCell  className="zeroResult" colSpan={6} align='center' style={{ borderBottom: 'hidden'}}><a >Нет данных</a></TableCell>
                                }
                              </TableBody>
                      
                              <div style={{height: '10px'}}></div>
                      
                  </Box>
                  </Collapse>
              </TableCell>
            </TableRow>
        </Table>
        </TableContainer>
      </>
    );
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
          <TableCell sx={{padding: 1}} style={{width: '70%', fontSize: '16px', fontWeight: 500, color: "#FFFFFF"}}><a>{row?.doc_type_ru_name.charAt(0).toUpperCase() + row?.doc_type_ru_name.slice(1).toLowerCase()}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{width: '30%'}} align='right'>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow style={{}}>
          <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 0, marginLeft: '0' }}>
                {
                    row?.message == null 
                    ?
                    <Table size="small" aria-label="purchases">
                            {
                                row?.doc_type_ru_name != "Транспорт"
                                ?
                                <TableBody style={{padding: 0, borderBottom: 'hidden'}}>
                                    <TableRow style={{borderBottom: 'hidden', width: "100%"}}>
                                        <TableCell sx={{p: 0}} style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Орган выдачи</a></TableCell>
                                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF"}} align="left"><a>{row?.issue_organization_ru_name}</a></TableCell>
                                    </TableRow>
                                    <TableRow style={{borderBottom: 'hidden', width: "100%"}}>
                                        <TableCell sx={{p: 0}} style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Дата выдачи</a></TableCell>
                                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF"}} align="left"><a>{row?.issue_date}</a></TableCell>
                                    </TableRow>
                                    <TableRow style={{borderBottom: 'hidden', width: "100%"}}>
                                        <TableCell sx={{p: 0}} style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Срок до</a></TableCell>
                                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF"}} align="left"><a>{row?.expiry_date}</a></TableCell>
                                    </TableRow>
                                    <TableRow style={{borderBottom: 'hidden', width: "100%"}}>
                                        <TableCell sx={{p: 0}} style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Номер документа</a></TableCell>
                                        <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF"}} align="left"><a>{row?.doc_number}</a></TableCell>
                                    </TableRow>
                                    <TableRow  style={{borderBottom: 'hidden', width: "100%"}}>
                                        <TableCell sx={{p: 0}} style={{fontSize: '3px'}}  align="left"></TableCell>
                                        <TableCell style={{ width: '70%', fontSize: '12px'}} align="left"></TableCell>
                                    </TableRow>
                                </TableBody>
                                :
                                <>
                                <TableHead>
                                <TableRow className="uitableHead"  style={{borderBottom: 'hidden'}}>
                                    <TableCell sx={{padding: 1}} style={{ width: '5%',fontSize: '12px', color: "#6D6D6D"}} align="left"><a>№</a></TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a className="bumber">Модель</a></TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '25%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a className="bumber">Серийный номер</a></TableCell>
                                    <TableCell sx={{padding: 1}} style={{ width: '25%', color: "#6D6D6D" }} align="left">Номер</TableCell>
                                </TableRow>
                                </TableHead> 
                                <TableBody style={{borderBottom: 'hidden'}}>
                                { 
                                    row?.dop_infa.car_num > 0 ? row?.dop_infa.cars.map(car => {
                                        return (
                                        <>
                                            <TableCell sx={{padding: 1}} style={{ width: '5%', fontSize: '12px', color: "#FFFFFF"}} align="left"><a>{car.num}</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '30%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a className="bumber">{car.model}</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '25%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a className="bumber">{car.serial_num}</a></TableCell>
                                            <TableCell sx={{padding: 1}} style={{ width: '25%', fontSize: '12px', color: "#FFFFFF" }} align="left">{car.number}</TableCell>
                                        </>
                                        )
                                    }) 
                                    : 
                                    <TableCell  className="zeroResult" align="center" colSpan={4} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>
                                }
                                </TableBody>
                                </>
                            }

                    </Table>
                    :
                    <p style={{
                        color: "#FFFFFF"
                    }}>{row?.message}</p>
                }
                
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

function AddressRow(props) {
  
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{props.index + 1}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row?.country}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }}><a>{row?.district}</a></TableCell>
        <TableCell sx={{padding: 1}} style={{ fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }}><a>{row?.street}, {row?.building}, {row?.apartment_number}</a></TableCell>
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
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>Район</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.region}</a></TableCell>
                  </TableRow>
                  <TableRow style={{borderBottom: 'hidden'}}>
                    <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Дата регистрации</a></TableCell>
                    <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row?.reg_date}</a></TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function withParams(Component) {
    return props => <Component {...props} username={useParams()} />;
}

export default withParams(LeftBottomFrame);