import React, { useState, useEffect } from 'react';
import './searchPage.scss'

import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import authService from "../../services/auth.service";
import SideBar from '../../components/side-bar';
import Navbar from '../../components/dossierComponents/nav-bar/Navbar';
import TabContent_IIN from '../../components/dossierComponents/tab-content-iin/TabContent_IIN';
import TabContent_FIO from '../../components/dossierComponents/tab-content-fio/TabContent_FIO';
import TabContent_BIN from '../../components/dossierComponents/tab-content-bin/TabContent_BIN';
import TabContent_UL from '../../components/dossierComponents/tab-content-ul/TabContent_UL';

const Search = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [iinTab, setIINTab] = useState(true)
    const [fioTab, setFIOTab] = useState(false)
    const [binTab, setBINTab] = useState(false)
    const [ulTab, setUlTab] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const logoutHandler = () => {
        authService.logout();
        // navigate('/login');
    }

    return (
        <>
            <div className='searchPage'>
                <div className='searchtabs'>
                    <div className="tab-wrap">
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" disabled style={{cursor: 'default'}}/>
                        <label htmlFor="tab0" style={{cursor:"default", background: "#0d0f1100"}} sx={{}}></label>

                        <input type="radio" id="tab4" name="tabGroup2" className="tab" defaultChecked
                            onClick={() => {
                                setIINTab(true)
                                setFIOTab(false)
                                setBINTab(false)
                                setUlTab(false)
                            }}/>
                        <label htmlFor="tab4" 
                            style={{
                                backgroundColor: iinTab?"#0D0F11":"#171B1F", 
                                color: iinTab?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderLeft: "1px #565656 solid",
                                borderRight: !iinTab? (!fioTab ? "1px #565656 solid" : "none") : "1px #565656 solid", 
                            }}>ИИН</label>

                        <input type="radio" id="tab5" name="tabGroup2" className="tab"
                            onClick={() => {
                                setIINTab(false)
                                setFIOTab(true)
                                setBINTab(false)
                                setUlTab(false)
                            }}/>
                        <label htmlFor="tab5" 
                            style={{
                                backgroundColor: fioTab?"#0D0F11":"#171B1F", 
                                color: fioTab?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderRight: !fioTab? (!binTab ? "1px #565656 solid" : "none") : "1px #565656 solid"
                            }}>ФИО</label>

                        <input type="radio" id="tab6" name="tabGroup2" className="tab"
                            onClick={() => {
                                setIINTab(false)
                                setFIOTab(false)
                                setBINTab(true)
                                setUlTab(false)
                            }}/>
                        <label htmlFor="tab6" 
                            style={{
                                backgroundColor: binTab?"#0D0F11":"#171B1F", 
                                color: binTab?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderRight: !binTab? (!ulTab ? "1px #565656 solid" : "none") : "1px #565656 solid"
                            }}>БИН</label>

                        <input type="radio" id="tab7" name="tabGroup2" className="tab"
                            onClick={() => {
                                setIINTab(false)
                                setFIOTab(false)
                                setBINTab(false)
                                setUlTab(true)
                            }}/>
                        <label htmlFor="tab7" 
                            style={{
                                backgroundColor: ulTab?"#0D0F11":"#171B1F", 
                                color: ulTab?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderRight: "1px #565656 solid",
                            }}>Наименование ЮЛ</label>
                        
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

                        <TabContent_IIN/>
                        <TabContent_FIO/>
                        <TabContent_BIN/>
                        <TabContent_UL/>
                        

                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Search;