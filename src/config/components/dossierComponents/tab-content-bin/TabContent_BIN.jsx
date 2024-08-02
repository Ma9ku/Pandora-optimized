import axios from 'axios';
import React, { useState } from 'react';


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';

import SearchedTable from '../searchedTableUL/SearchedTableUL';
// const baseURL = 'http://192.168.30.24:9095/'
import { dossierURL } from '../../../data/dossier';

const inputStyle = {
    height: "3px", 
    color: "#fff", 
    fontFamily: 'Ubuntu', 
    fontStyle: "normal", 
    fontWeight: 500, 
    fontSize: "13px", 
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

function TabConent_BIN(props) {
    const [bin, setBIN] = useState('')
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const email = localStorage.getItem("email")

    const searchBIN = async () => {
        console.log(loading)
        const params = {bin: bin, email: email}
        setLoading(true)
        console.log(params)
        const userSession = JSON.parse(localStorage.getItem("user"))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(dossierURL+'bin', {params: params}).then(res => {
            console.log(res.data)
            setResult(res.data)
            setLoading(false)
        })
    }
    return ( 
        <div className="tab__content">
 
            <FormControl sx={{
                    display: 'block', 
                    marginLeft: 8, 
                    width: '40%', 
                    marginBottom: '20px'  
                }} fullWidth> 
                <a className='fieldText' style={{marginBottom: '5px', marginLeft: '10px'}}>БИН</a>
                <div style={{ 
                        display: 'flex', 
                        marginLeft: '0 auto' 
                    }}>

                    <TextField sx={{ 
                            height: '34px', 
                            flex: 1, 
                            borderRadius: "4px",
                        }} 
                        value ={bin}
                        onChange={(e) => setBIN(e.target.value)}
                        id="outlined-basic" 
                        inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                        variant="outlined" />
                    <Button sx={zaprosButtonStyle} onClick={() => searchBIN()} variant="contained">
                        <span className='buttonSearch'>Запрос</span>
                    </Button>
                </div>
            </FormControl>
            <FormControl sx={{ 
                    display: 'block', 
                    marginLeft: 8, 
                    width: '40%', 
                    marginBottom: '20px' 
                }} fullWidth>
                <a className='fieldText' style={{
                        marginLeft: '10px'
                    }}>Номер телефона</a>
                <div style={{ 
                        display: 'flex', 
                        marginLeft: '0 auto'
                    }}>
                    <TextField sx={{
                            height: '34px', 
                            flex: 1, 
                            borderRadius: "4px",
                        }} id="outlined-basic"
                        inputProps={{ style: inputStyle, 'aria-label': 'Without label' }} 
                        variant="outlined" />
                    <Button sx={zaprosButtonStyle} variant="contained">
                        <span className='buttonSearch'>Запрос</span>
                    </Button>
                </div>
            </FormControl>
            <FormControl sx={{ 
                    display: 'block', 
                    marginLeft: 8, 
                    width: '40%', 
                    marginBottom: '20px' 
                }} fullWidth>
                <a className='fieldText' style={{
                        marginLeft: '10px'
                    }}>Электронная почта</a>
                <div style={{ 
                        display: 'flex', 
                        marginLeft: '0 auto' 
                    }}>
                    <TextField sx={{ 
                            height: '34px', 
                            flex: 1, 
                            borderRadius: "4px" 
                        }} 
                        id="outlined-basic" 
                        inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                        variant="outlined" />
                    <Button sx={zaprosButtonStyle} variant="contained">
                        <span className='buttonSearch'>Запрос</span>
                    </Button>
                </div>
            </FormControl>

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

export default TabConent_BIN;