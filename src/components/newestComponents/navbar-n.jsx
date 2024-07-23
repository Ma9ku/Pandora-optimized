import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Menu } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";

// import '../../pages/mainPage/mainPageLS.scss'
import './navbar-n.scss';

import pandora from './pandora-logo.png';

import React, { useState } from "react";

import { useLocation, useNavigate, useParams } from 'react-router-dom';
import authService from '../../services/auth.service';

import SideBar from './../side-bar';


const NavbarN = (props) => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const userSession = JSON.parse(localStorage.getItem("user"))
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isItapRoute = location.pathname.startsWith('/itap');
    const isETanuRoute = location.pathname.startsWith('/eTanu');

    const logoutHandler = () => {
        authService.logout();
        navigate('/login');
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    return <>

        <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
        <div className='mainPageBlock' style={{ position: 'relative', width:"100%" }}>
            <div className='navbar-transparent' style={{width: '100%', height: '80px', display: 'flex', justifyContent: 'space-between', margin: '0 auto', zIndex: 1,  marginTop: '15px'}}>
                <div style={{ width: '90%', margin: '0 auto', opacity: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center' }}>
                        <img className="pandora-logo" src={pandora} onClick={() => {navigate('/')}} alt='pandora' style={{width: '170px'}}/>

                        {/* <img src={menu} onClick={() => {setMenuOpen(true)}} style={{marginRight: '10px',
                            transition: 'filter 0.3s ease',
                            filter: 'brightness(100%)', cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.filter = 'brightness(50%)'}
                             onMouseLeave={(e) => e.target.style.filter = 'brightness(100%)'}/>
                        <Link to={"/"} style={{fontWeight: 600, fontSize: '26px', color: 'white', cursor: 'pointer'}}>SID</Link> */}
                    </div>
                    <div>
                        {isItapRoute && (
                                <a className="text-button" onClick={() => { navigate('/itap/upload-csv') }} style={{ fontSize: '21px', fontWeight: '500', marginRight: '15px', color: 'white' }}>Загрузить данные</a>
                            )}
                            {isETanuRoute && (
                                <a className="text-button" onClick={() => { navigate('/eTanu/history') }} style={{ fontSize: '21px', fontWeight: '500', marginRight: '15px', color: 'white' }}>История запросов</a>
                            )}
                        <a className="text-button" onClick={()=> {navigate('/admin')}} style={{fontSize: '21px', fontWeight: '500', marginRight: '15px', color: 'white'}}>Админ панель</a>
                        <a className="text-button" onClick={()=> {navigate('/registration')}} style={{fontSize: '21px', fontWeight: '500', marginRight: '25px', color: 'white'}}>Регистрация</a>
                        <a style={{fontSize: '21px', fontWeight: '500', color: 'white'}}>{userSession?userSession.email:"No userSession"}</a>
                        <IconButton onClick={handleMenu}>
                            <ArrowDropDownIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem onClick={() => {navigate("/profile")}}>Профиль</MenuItem>
                            <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>

    </>
}

export default NavbarN;