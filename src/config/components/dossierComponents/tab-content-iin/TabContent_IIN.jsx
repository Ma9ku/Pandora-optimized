import axios from 'axios';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import { dossierURL } from '../../../data/dossier';
import SearchedTable from '../searchedTable/SearchedTable';

import './tabContent_iin.scss';

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

function TabConent_IIN(props) {
    const [iin, setIIN] = React.useState('');
    const [doc, setDoc] = useState('')
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [result, setResult] = React.useState(null);
    const [photo, setPhoto] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const email = localStorage.getItem("email")
    const userSession = JSON.parse(localStorage.getItem("user"))


    const handleSelectPerson = (photo) => {
        setPhoto(photo)
        console.log(photo)
    }

    const handleIIN = (event) => {
        setIIN(event.target.value)
    }
    const searchIIN = async () => {
        console.log(loading)
        const params = { iin: iin, email: email }
        setLoading(true)
        console.log(params)
        axios.get(dossierURL+'iin', {
            params: params,
            authorization: 'Bearer ' + userSession.accessToken
        })
        .then(res => {
            console.log(res.data)
            setResult(res.data)
            setLoading(false)
        })
        .catch(err => console.log(err));
        setPhoto('')
    }
    const searchDoc = async () => {
        console.log(loading)
        const params = {doc: doc}
        setLoading(true)
        console.log(params)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(dossierURL+'nomer_doc', {params: params}).then(res => {
            console.log(res.data)
            setResult(res.data)
            setLoading(false)
        })
        setPhoto('')
    }
    const searchPhone = async () => {
        console.log(loading)
        const params = {phone: phone}
        setLoading(true)
        console.log(params)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(dossierURL+'byphone', {params: params}).then(res => {
            console.log(res.data)
            setResult(res.data)
            setLoading(false)
        })
        setPhoto('')
    }
    const searchEmail = async () => {
        console.log(loading)
        const params = {email: mail}
        setLoading(true)
        console.log(params)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
        axios.get(dossierURL+'byemail', {params: params}).then(res => {
            console.log(res.data)
            setResult(res.data)
            setLoading(false)
        })
        setPhoto('')
    }
    return ( 
        <div className="tab__content tab_iin">
            <div className='displayFlexTwoColumns'>
                <div>
                    <FormControl sx={{
                            marginLeft: 8, 
                            width: '70%', 
                            marginBottom: '20px',
                        }} fullWidth> 
                        <a className='fieldText' style={{
                                marginBottom: '5px', 
                                marginLeft: '10px'
                            }}>ИИН</a>
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
                                value={iin}
                                onChange={handleIIN}
                                variant="outlined" />
                            <Button sx={zaprosButtonStyle} variant="contained"
                                onClick={() => {
                                    searchIIN()}}>
                                <span className='buttonSearch'>Запрос</span>
                            </Button>
                        </div>
                    </FormControl>
                    <FormControl sx={{ 
                            marginLeft: 8, 
                            width: '70%', 
                            marginBottom: '20px' 
                        }} fullWidth>
                        <a className='fieldText' style={{
                                marginBottom: '5px', 
                                marginLeft: '10px'
                            }}>Номер документа</a>
                        <div style={{ 
                                display: 'flex', 
                                marginLeft: '0 auto'
                            }}>
                            <TextField sx={{
                                    height: '34px', 
                                    flex: 1, 
                                    // border: "1px solid #565656", 
                                    borderRadius: "4px",
                                }} id="outlined-basic"
                                inputProps={{ style: inputStyle, 'aria-label': 'Without label' }}
                                       value={doc}
                                       onChange={(e) => setDoc(e.target.value)}
                                variant="outlined" />
                            <Button sx={zaprosButtonStyle} onClick= {() => searchDoc()} variant="contained">
                                <span className='buttonSearch'>Запрос</span>
                            </Button>
                        </div>
                    </FormControl>
                    <FormControl sx={{ 
                            marginLeft: 8, 
                            width: '70%', 
                            marginBottom: '20px' 
                        }} fullWidth>
                        <a className='fieldText' style={{
                                marginBottom: '5px', 
                                marginLeft: '10px'
                            }}>Номер телефона</a>
                        <div style={{ 
                                display: 'flex', 
                                marginLeft: '0 auto' 
                            }}>
                            <TextField sx={{ 
                                    height: '34px', 
                                    flex: 1, 
                                    // border: "1px solid #565656", 
                                    borderRadius: "4px" 
                                }} 
                                id="outlined-basic" 
                                inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                value={phone}
                                       onChange={(e) => setPhone(e.target.value)}
                                variant="outlined" />
                            <Button sx={zaprosButtonStyle} onClick= {() => searchPhone()} variant="contained">
                                <span className='buttonSearch'>Запрос</span>
                            </Button>
                        </div>
                    </FormControl>
                    <FormControl sx={{
                            marginLeft: 8, 
                            width: '70%', 
                            marginBottom: '20px' 
                        }} fullWidth>
                        <a className='fieldText' style={{
                                marginBottom: '5px', 
                                marginLeft: '10px'
                            }}>Электронная почта</a>
                        <div style={{ 
                                display: 'flex', 
                                marginLeft: '0 auto' 
                            }}>
                            <TextField sx={{ 
                                    height: '34px', 
                                    flex: 1, 
                                    // border: "1px solid #565656", 
                                    borderRadius: "4px" 
                                }} 
                                id="outlined-basic" 
                                inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                                variant="outlined" />
                            <Button sx={zaprosButtonStyle} onClick= {() => searchEmail()} variant="contained">
                                <span className='buttonSearch'>Запрос</span>
                            </Button>
                        </div>

                        
                    </FormControl>
                </div>
                <div>
                    <img src={'data:image/jpeg;base64,' +  photo} alt=''/>
                </div>
            </div>

            <div className='searchResultBlock'>
                <p>Результат</p>
                { loading ? (
                        <Box sx={{ width: '100%' }}>
                            <div style={{height: '50px'}}></div>
                            <LinearProgress />
                        </Box>
                    ) : ( 
                        
                        <SearchedTable result={result} selectPhoto={handleSelectPerson} loading={loading}/>
                )}
            </div>
        </div>
    );
}

export default TabConent_IIN;