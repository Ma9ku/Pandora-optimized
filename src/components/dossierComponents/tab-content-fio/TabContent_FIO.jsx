import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import React, { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import SearchedTable from '../searchedTable/SearchedTable';
import './tabContent_fio.scss';

import { dossierURL } from '../../../data/dossier';
import DopInfoBlock from '../dop-info-block/DopInfoBlock';
// const baseURL = 'http://10.202.20.92:9095/'
const selectStyle = {
    width: '200px',
    height: '35px',
    alignSelf: "flex-end",

    backgroundColor: '#0D0F11',
    color: '#fff',

    outline: "none",
    // border: '1px solid #565656',
    borderRadius: '2px',
    
    display: "flex",
    flexDirection: "row",
}


const inputStyle = {
    height: "3px", 
    color: "#fff", 
    fontFamily: 'Ubuntu', 
    fontStyle: "normal", 
    fontWeight: 500, 
    fontSize: "14px", 
    lineHeight: "16px",
    // width: '300px',
}

const zaprosButtonStyle = {
    height: '34px', 
    backgroundColor: "#757575", 
    color: 'white', 
    width: 'fit-content', 
    marginLeft: 3,
     
    ":hover": {
        backgroundColor: "#a3a3a3", 
    },

    ":active": {
        backgroundColor: "#525252",
    }
}

function TabContent_FIO(props) {
    const [showDopInfo, setShowDopInfo] = useState(false)
    const [loading, setLoading] = useState(false)

    const [fnameType, setFnameType] = useState('begin')
    const [lnameType, setLnameType] = useState('begin')
    const [fathNameType, setFathNameType] = useState('begin')

    const [fname, setFname] = useState('')
    const [fathName, setFathName] = useState('')
    const [lname, setLname] = useState('')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')
    const [gender, setGender] = useState('')
    const [nation, setNation] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [vin, setVin] = useState('')
    const email = localStorage.getItem("email")

    const [result, setResult] = React.useState(null);
    const [photo, setPhoto] = React.useState('')
    const handleSelectPerson = (photo) => {
        setPhoto(photo)
    }

    const searchFIO = async () => {
        setLoading(true)
        let resFname = ''
        let resLname = ''
        let resFathName = ''
        if (fnameType == 'begin') {
            resFname = fname.toUpperCase() + '$'
        } else if (fnameType == 'have') {
            resFname = '$' + fname.toUpperCase() + '$'
        } else {
            resFname = '$' + fname.toUpperCase()
        }
        if (lnameType == 'begin') {
            resLname = lname.toUpperCase() + '$'
        } else if (lnameType == 'have') {
            resLname = '$' + lname.toUpperCase() + '$'
        } else {
            resLname = '$' + lname.toUpperCase()
        }
        if (fathNameType == 'begin') {
            resFathName = fathName.toUpperCase() + '$'
        } else if (fathNameType == 'have') {
            resFathName = '$' + fathName.toUpperCase() + '$'
        } else {
            resFathName = '$' + fathName.toUpperCase()
        }
        const req = {
            i: resFname, 
            o: resFathName, 
            f: resLname,
            dateFrom: dateFrom == '' ? '' : dateFrom.format('YYYY-MM-DD'),
            dateTo: dateTo == '' ? '' : dateTo.format('YYYY-MM-DD'),
            gender,
            nation: nation.toUpperCase(),
            city: city.toUpperCase(), 
            country: country.toUpperCase(), 
            region: region.toUpperCase(),
            vin,
            email: email
        }
        console.log(req)
        const userSession = JSON.parse(localStorage.getItem("user"))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(dossierURL+'additionalfio', {params: req}).then(res => {
            console.log(res.data)
            setResult(res.data)
            setLoading(false)
        })
        setPhoto('')
    }
    
    return ( 
        <div className="tab__content tab_fio">
            <div className="displayFlexTwoColumns">
                <div className="searchForm">
                    <div>
                        <Select value={fnameType} onChange={event => {
                            console.log(event)
                        }} inputProps={{ 'aria-label': 'Without label' }} style={selectStyle}>
                            <MenuItem value={"begin"} onClick={(event) => {
                                setFnameType(event.target.dataset.value)
                            }}>Начинается с</MenuItem>
                            <MenuItem value={"have"} onClick={(event) => {
                                setFnameType(event.target.dataset.value)
                            }}>Содержит</MenuItem>
                            <MenuItem value={"ends"} onClick={(event) => {
                                setFnameType(event.target.dataset.value)
                            }}>Заканчивается на</MenuItem>
                        </Select>
                        <div>
                            <label htmlFor="fname">Имя</label>
                            {/* <input type="text" name="fname" id="fname" /> */}
                            <TextField sx={{ 
                                        height: '34px', 
                                        flex: 1, 
                                        borderRadius: "4px"
                                    }} 
                                    id="outlined-basic" 
                                    inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                    variant="outlined" />
                        </div>
                    </div>
                    <div>
                        <Select value={lnameType} inputProps={{ 'aria-label': 'Without label' }} style={selectStyle}>
                            <MenuItem value={"begin"} onClick={(event) => {
                                setLnameType(event.target.dataset.value)
                            }}>Начинается с</MenuItem>
                            <MenuItem value={"have"} onClick={(event) => {
                                setLnameType(event.target.dataset.value)
                            }}>Содержит</MenuItem>
                            <MenuItem value={"ends"} onClick={(event) => {
                                setLnameType(event.target.dataset.value)
                            }}>Заканчивается на</MenuItem>
                        </Select>
                        <div>
                            <label htmlFor="lName">Фамилия</label>
                            {/* <input type="text" name="lName" id="lName" /> */}
                            <TextField sx={{ 
                                        height: '34px', 
                                        flex: 1, 
                                        borderRadius: "4px"
                                    }} 
                                    id="outlined-basic" 
                                    inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                    variant="outlined" />
                        </div>
                    </div>
                    <div>
                    <Select value={fathNameType} inputProps={{ 'aria-label': 'Without label' }} style={selectStyle}>
                        <MenuItem value={"begin"} onClick={(event) => {
                            setFathNameType(event.target.dataset.value)
                        }}>Начинается с</MenuItem>
                        <MenuItem value={"have"} onClick={(event) => {
                            setFathNameType(event.target.dataset.value)
                        }}>Содержит</MenuItem>
                        <MenuItem value={"ends"} onClick={(event) => {
                            setFathNameType(event.target.dataset.value)
                        }}>Заканчивается на</MenuItem>
                    </Select>
                        <div>
                            <label htmlFor="fathName">Отчество</label>
                            {/* <input type="text" name="fathName" id="fathName" /> */}
                            <TextField sx={{ 
                                        height: '34px', 
                                        flex: 1, 
                                        borderRadius: "4px"
                                    }} 
                                    id="outlined-basic" 
                                    inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                    value={fathName}
                                    onChange={(e) => setFathName(e.target.value)}
                                    variant="outlined" />
                        </div>
                    </div>
                </div>
                <div style= {{position: "fixed", right: "10%", zIndex: 9, backgroundColor: 'white'}} >
                    <img style= {{right: 0}} src={'data:image/jpeg;base64,' +  photo} alt=''/>
                </div>
            </div>
            
{/* 
            <div className='dopInfa'>

                <TableContainer sx={{marginTop: 0, backgroundColor: '#0D0F11'}} style={{ overflow: 'unset'}}>
                    <Table aria-label="collapsible table" className="uitable">
                        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{width: '90%', fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a style={{marginLeft: '15px', fontSize: '15px'}}>Дополнительные данные</a></TableCell>
                        <TableCell sx={{padding: 1}} style={{width: '10%'}} align='right'>
                            <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setShowDopInfo(!showDopInfo)}
                            >
                            {showDopInfo ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
                            </IconButton>
                        </TableCell>
                        </TableRow>
                        <TableRow style={{borderBottom: 'hidden', overflow: 'hidden'}}>
                        <TableCell sx={{padding: 1}} style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                            
                            <Collapse in={showDopInfo} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 0, marginLeft: '0' }}>
                                    
                            <DopInfoBlock dateFrom={dateFrom} setDateFrom={setDateFrom} 
                                dateTo={dateTo} setDateTo={setDateTo} 
                                gender={gender} setGender={setGender} 
                                nation={nation.toUpperCase()} setNation={setNation}
                                country={country} setCountry={setCountry}
                                city={city} setCity={setCity}
                                region={region} setRegion={setRegion}
                                vin = {vin} setVin={setVin}
                                show={showDopInfo}/>
                            <div style={{height: '20px'}}></div>
                            </Box>
                            </Collapse>
                        </TableCell>
                        </TableRow>
                    </Table>
                </TableContainer>
            </div> */}

            <div style={{display: "flex", justifyContent: "flex-start", paddingLeft: "70%"}}>
                <Button sx={zaprosButtonStyle} variant="contained" onClick={searchFIO}>
                    <span className='buttonSearch'>Запрос</span>
                </Button>
            </div>

            <div className='searchResultBlock'>
                <p>Результат</p>
                { loading? (
                        <Box sx={{ width: '100%' }}>
                            <div style={{height: '50px'}}></div>
                            <LinearProgress />
                        </Box>
                    ) : ( 
                        
                        <SearchedTable result={result} selectPhoto={handleSelectPerson}/>
                )}
            </div>
        </div>
    );
}

export default TabContent_FIO;