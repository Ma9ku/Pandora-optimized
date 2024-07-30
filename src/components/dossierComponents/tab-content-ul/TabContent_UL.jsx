import React, { useState, useEffect } from 'react';

import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Select from '@mui/material/Select';

import './tabContent_ul.scss'

import SearchedTable from '../searchedTableUL/SearchedTableUL';
import default_host from '../../../config/config';
import { dossierURL } from '../../../data/dossier';


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
    width: "100%",
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
    backgroundColor: "#2E3740", 
    color: 'white', 
    width: 'fit-content', 
    marginLeft: 3,
     
    ":hover": {
        backgroundColor: "#191e24", 
    },

    ":active": {
        backgroundColor: "#525252",
    }
}

function TabContent_UL(props) {
    const [ulName, setULName] = useState("")
    const [vin, setVin] = useState('')
    const [ulNameType, setULNameType] = useState("begin")
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])

    const searchName = async () => {
        setLoading(true)
        const userSession = JSON.parse(localStorage.getItem("user"))

        let resName = ""
        if (vin == '') {
            if (ulNameType == 'begin') {
                resName = ulName.toUpperCase() + '$'
            } else if (ulNameType == 'have') {
                resName = '$' + ulName.toUpperCase() + '$'
            } else {
                resName = '$' + ulName.toUpperCase()
            }
            const req = {
                name: resName
            }
            
            console.log(req)
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
            axios.get(dossierURL+'binname', {params: req}).then(res => {
                console.log(res.data)
                setResult(res.data)
                setLoading(false)
            })
        } else {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
            axios.get(dossierURL+'byvinkuzovul', {params: {vin: vin}}).then(res => {
                console.log(res.data)
                setResult(res.data)
                setLoading(false)
            })
        }
    }
    return ( 
        <div className="tab__content tab_ul">
            <div className="searchForm">
                <div>
                    <Select value={ulNameType} onChange={event => {
                        console.log(event)
                    }} inputProps={{ 'aria-label': 'Without label' }} style={selectStyle}>
                        <MenuItem value={"begin"} onClick={(event) => {
                            setULNameType(event.target.dataset.value)
                        }}>Начинается с</MenuItem>
                        <MenuItem value={"have"} onClick={(event) => {
                            setULNameType(event.target.dataset.value)
                        }}>Содержит</MenuItem>
                        <MenuItem value={"ends"} onClick={(event) => {
                            setULNameType(event.target.dataset.value)
                        }}>Заканчивается на</MenuItem>
                    </Select>
                    <div style={{width: "100%"}}>
                        <label htmlFor="ulName">Наименование организации</label>
                        <TextField sx={{ 
                                    height: '34px', 
                                    flex: 1, 
                                    borderRadius: "4px"
                                }} 
                                id="outlined-basic ulName" 
                                inputProps={{ style: inputStyle, 'aria-label': 'Without label' }} 
                                value={ulName}
                                onChange={(e) => setULName(e.target.value)}
                                variant="outlined" />
                    </div>
                </div>
                <div className="displayFlexTwoColumn">
                    <div>
                        <label htmlFor="regNum">Регистрационный номер №</label>
                        <TextField sx={{ 
                            flex: 1, 
                            borderRadius: "4px",
                            height: '16px'
                        }}  
                        id='regNum'
                        variant="outlined" />
                    </div>
                    <div>
                        <label htmlFor="transport">VIN/Кузов/Шасси (Транспорт)</label>
                        <TextField sx={{ 
                            flex: 1, 
                            borderRadius: "4px",
                            height: '16px'
                        }}  
                        id='transport'
                        value={vin}
                        onChange={(e) => setVin(e.target.value)}
                        variant="outlined" />
                    </div>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button sx={zaprosButtonStyle} onClick={()=> searchName()} variant="contained">
                        <span className='buttonSearch'>Запрос</span>
                    </Button>
                </div>
            </div>
            <div className='searchResultBlock'>
                <p>Результат</p>
                { loading? (
                        <Box sx={{ width: '100%' }}>
                            <div style={{height: '50px'}}></div>
                            <LinearProgress />
                        </Box>
                    ) : ( 
                        
                        <SearchedTable result={result}/>
                )}
            </div>
        </div>
    );
}

export default TabContent_UL;