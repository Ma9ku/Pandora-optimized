import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './side-bar/side-bar.scss'
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import axios from 'axios';
const baseURL = 'http://localhost:9095/'
const SideBar = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))

    const menuOpen = props.menuOpen;
    const setMenuOpen = props.setMenuOpen;

    // const [menuOpen, setMenuOpen] = useState(false)
    const logoutHandler = () => {
        authService.logout();
        // navigate('/login');
    }
    const searchPage = () => {
        let d = document.querySelector(".searchtabs")
        if (menuOpen && d != null) {
            d.style.width = "50%"
        } else {
            if (d != null) {
                d.style.width = "90%"
            }
        }
        
    }

    const sideBarButtons = [
        {name: "Главная страница", to: "/"},
        {name: "Справочник", to: "/workers"},
        {name: "Все новости", to: "/news"},
        {name: "Календарь", to: "/calendar"},
        // {name: "Информационные ресурсы", to: "/"},
        // {name: "База знаний", to: "/"},
        {name: "Мессенджер", to: "/"},
        {name: "Заявления", to: "/"},
        {name: "Бюро пропусков", to: "/bureau"},
        {name: "Служба поддержки", to: "/"},
    ]

    return (  
        <>
            <div className='menu-bar'  
                style={{
                    // width: menuOpen?"300px":"0",
                    // padding: menuOpen?"0px 20px":"0", 
                    // border: menuOpen?"1px solid #3a3a3a":"none",
                    // marginRight: menuOpen?"20px":"0",
                    height: '100%', /* 100% Full-height */
                    width: menuOpen? "300px":0, /* 0 width - change this with JavaScript */
                    // marginRight: menuOpen? "300px":0, /* 0 width - change this with JavaScript */
                    position: 'fixed', /* Stay in place */
                    zIndex: 3, /* Stay on top */
                    top: '0', /* Stay at the top */
                    left: 0,
                    backgroundColor: '#0D0F11', /* Black*/
                    borderRight: menuOpen?'1px solid #3a3a3a':'',
                    overflowX: 'hidden', /* Disable horizontal scroll */
                    paddingTop: '60px', /* Place content 60px from the top */
                    transition: '0.5s'/* 0.5 second transition effect to slide in the sidenav */
                }}>
                <div className="menu-close" style={{ top: '30px', display: !menuOpen?"none":"block"}}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setMenuOpen(false)}>
                        <KeyboardArrowLeftIcon style={{ fill: '#ffffff', fontSize: '33px' }}/>
                    </IconButton>
                </div>
                <div className='menu-body'>
                    <div>
                        <div className="menu-name">
                            <span>{userSession?userSession.email:"No userSession"}</span>
                        </div>
                        <div className='menu-buttons'>
                            {sideBarButtons.map((button, index) => (
                                <Link className="menu-text" to={button.to} key={index} onClick={() => {
                                    setMenuOpen(false)
                                }
                                }>
                                    <div>{button.name}</div>
                                </Link>
                                
                            ))}
                        </div>
                    </div>
                    <div className="menu-logout">
                        <Link to='/login' onClick={logoutHandler}>Выйти</Link>
                    </div>
                </div>
            </div>
            {/*<div className="menu-open" */}
            {/*    style={{*/}
            {/*        top: '35px',*/}
            {/*        width: menuOpen?"0":"40px", */}
            {/*        zIndex: 2,*/}
            {/*        left: "10px",*/}
            {/*        height: 'min-content', */}
            {/*        display: menuOpen? "none": "unset"*/}
            {/*    }} onClick={() => {*/}
            {/*        setMenuOpen(true) */}
            {/*        searchPage()*/}
            {/*        }}>*/}
            {/*    <IconButton aria-label="expand row" size="small" onClick={() => setMenuOpen(true)}>*/}
            {/*        <MenuIcon style={{ fill: '#949494', fontSize: '30px' }}/>*/}
            {/*    </IconButton>*/}
            {/*</div>*/}
        </>
    );
}

export default SideBar;