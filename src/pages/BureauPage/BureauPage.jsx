import React, { useState, useEffect } from 'react';

import './bureauPage.scss'

import SideBar from '../../components/side-bar';
import { Select, MenuItem, TextField, ButtonGroup, Button } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function BureauPage(props) {

    const [tab1, setTab1] = useState(true)
    const [tab2, setTab2] = useState(true)

    const [appNumber, setAppNumber] = useState(0)

    const inputStyle = {
        height: '50px',
        color: "#fff", 
        fontFamily: 'Ubuntu', 
        fontStyle: "normal", 
        fontWeight: 500, 
        fontSize: "14px", 
        lineHeight: "16px",
        // width: '300px',
    }

    return (
        <>
            <div className='bureauPage'>
                <div className='bureauTabs'>
                    <div className="tab-wrap">
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" disabled style={{cursor: 'default'}}/>
                        <label htmlFor="tab0" style={{cursor:"default", background: "#0d0f1100"}} sx={{}}></label>

                        <input type="radio" id="tab1" name="tabGroup2" className="tab" defaultChecked
                            onClick={() => {
                                setTab1(true)
                                setTab2(false)
                            }}/>
                        <label htmlFor="tab1" 
                            style={{
                                backgroundColor: tab1?"#0D0F11":"#171B1F", 
                                color: tab1?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderLeft: "1px #565656 solid",
                                borderRight: !tab1? (!tab2 ? "1px #565656 solid" : "none") : "1px #565656 solid", 
                            }}>ЗАЯВКИ НА ПРОПУСК</label>

                        <input type="radio" id="tab2" name="tabGroup2" className="tab"
                            onClick={() => {
                                setTab1(false)
                                setTab2(true)
                            }}/>
                        <label htmlFor="tab2" 
                            style={{
                                backgroundColor: tab2?"#0D0F11":"#171B1F", 
                                color: tab2?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderRight: "1px #565656 solid"
                            }}>ПОСЕТИТЕЛИ</label>

                        
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" style={{cursor: 'default'}}></input>
                        <label htmlFor="tab0" style={{cursor:"default"}}></label>
                        
                        
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" style={{cursor: 'default'}}></input>
                        <label htmlFor="tab0" style={{cursor:"default"}}></label>
                        
                        
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" style={{cursor: 'default'}}></input>
                        <label htmlFor="tab0" style={{cursor:"default"}}></label>
                        
                        
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" style={{cursor: 'default'}}></input>
                        <label htmlFor="tab0" style={{cursor:"default"}}></label>
                        
                        
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" style={{cursor: 'default'}}></input>
                        <label htmlFor="tab0" style={{cursor:"default"}}></label>
                        
                        
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" style={{cursor: 'default'}}></input>
                        <label htmlFor="tab0" style={{cursor:"default"}}></label>
                        
                        <div className="tab__content">
                        </div>
                        <div className="tab__content">
                            <div>
                                <div className='filterBlock'>
                                    <div>
                                        <Select value={'begin'} inputProps={{ 'aria-label': 'Without label' }}>
                                            <MenuItem value={"begin"} onClick={(event) => {}}>МОИ ЗАЯВКИ</MenuItem>
                                        </Select>
                                        <TextField 
                                                sx={{width: '500px'}}
                                                id="outlined-basic" 
                                                inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                                value={appNumber}
                                                onChange={(e) => setAppNumber(e.target.value)}
                                                variant="outlined" />
                                        <ButtonGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} variant="outlined" aria-label="outlined primary button group">
                                            <Button sx={{height: '34px'}}>ПОИСК</Button>
                                            <Button variant='outlined' sx={{height: '34px'}}>СБРОС</Button>

                                        </ButtonGroup>
                                    </div>
                                    <div>
                                        <Button variant='outlined' sx={{height: '34px'}}>НОВАЯ ЗАЯВКА</Button>
                                    </div>
                                    
                                </div>
                                <div className="applicantsTable">
                                    <TableContainer component={Paper} sx={{ backgroundColor: '#0D0F11', width: '95%', margin: '0 auto' }}>
                                        <Table sx={{ minWidth: 650, background: "#0D0F11" }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left">№</TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Тип</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Посетители</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Сопровождающий</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Причина</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Дата с</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Дата по</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Заявитель</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Примечание</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Статус</div></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    key={1}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left" component="th" scope="row">
                                                        {'8122'}
                                                    </TableCell>
                                                    <TableCell align="left">{'Разовый пропуск'}</TableCell>
                                                    <TableCell align="left">{'Амиркулов'}</TableCell>
                                                    <TableCell align="left">{'Maku'}</TableCell>
                                                    <TableCell align="left">{'Разработчик'}</TableCell>
                                                    <TableCell align="left">{'25-05-2023'}</TableCell>
                                                    <TableCell align="left">{'26-05-2023'}</TableCell>
                                                    <TableCell align="left">{'Маку'}</TableCell>
                                                    <TableCell align="left">{'со своей техникой'}</TableCell>
                                                    <TableCell align="left">{'Направлено'}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <div className="tab__content">
                            <div>
                                <div className='filterBlock'>
                                    <div>
                                        <Select value={'begin'} inputProps={{ 'aria-label': 'Without label' }}>
                                            <MenuItem value={"begin"} onClick={(event) => {}}>МОИ ПОСЕТИТЕЛИ</MenuItem>
                                        </Select>
                                        <TextField 
                                                sx={{width: '500px'}}
                                                id="outlined-basic" 
                                                inputProps={{ style: inputStyle,'aria-label': 'Without label' }} 
                                                value={appNumber}
                                                onChange={(e) => setAppNumber(e.target.value)}
                                                variant="outlined" />
                                        <ButtonGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} variant="outlined" aria-label="outlined primary button group">
                                            <Button sx={{height: '34px'}}>ПОИСК</Button>
                                            <Button variant='outlined' sx={{height: '34px'}}>СБРОС</Button>

                                        </ButtonGroup>
                                    </div>
                                    <div>
                                        <Button variant='outlined' sx={{height: '34px'}}>НОВАЯ ЗАЯВКА</Button>
                                    </div>
                                    
                                </div>
                                <div className="applicantsTable">
                                    <TableContainer component={Paper} sx={{ backgroundColor: '#0D0F11', width: '95%', margin: '0 auto'}}>
                                        <Table sx={{ minWidth: 650, background: "#0D0F11" }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{paddingLeft: '15px'}}>Посетитель</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Тип документа</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Номер документа</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Резидент РК</div></TableCell>
                                                    <TableCell align="left" style={{padding: '5px 0'}}><div style={{borderLeft: '1px solid #838383', paddingLeft: '15px'}}>Последний статус</div></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow
                                                    key={1}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="left">{'Айтпаев Арлан'}</TableCell>
                                                    <TableCell align="left">{'ИИН'}</TableCell>
                                                    <TableCell align="left">{'020131555525'}</TableCell>
                                                    <TableCell align="left">{'Да'}</TableCell>
                                                    <TableCell align="left" style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                                                        {'Покинул здание'}
                                                        <Button variant='outlined'>История посещении</Button>
                                                        <Button variant='outlined'>Создать заявку</Button>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        <div className="tab__content">
                        </div>
                        <div className="tab__content">
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    );
}

export default BureauPage;