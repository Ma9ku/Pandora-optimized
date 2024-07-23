import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import './navbar.scss'
import { Component, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Route, Routes, useNavigate } from 'react-router-dom';
// import './NavBar.css'
import authService from '../../services/auth.service';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import SideBar from '../side-bar';

import NavbarN from '../newestComponents/navbar-n'

const GrayNavbar = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()    

    const debugMode = useState(true)

    useEffect(() => {
        if (!debugMode && userSession == null) {
            navigate('/login')
        }
    })

    const logoutHandler = () => {
        authService.logout();
        navigate('/login');
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target)
        ) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        const a = !userSession && !debugMode ? toLogin() : ""
    })

    const toAdmin = () => {
        navigate('/admin')
    }
    const toLogin = () => {
        navigate('/login')
    }
    return ( 
        <>
        {/*    <div className="nav-back navbar-transparent" style={{*/}
        {/*        marginTop: '13px',*/}
        {/*        background: 'radial-gradient(110.65% 7956.71% at 10.63% 20.65%, rgba(255, 255, 255, 0.201) 0%, rgba(255, 255, 255, 0) 100%)',*/}
        {/*        border: '0.2px solid #868686',*/}
        {/*        backdropFilter: ' blur(27.5px)',*/}

        {/*        }}>*/}
        {/*    <nav className="NavbarItems2">*/}
        {/*        <h1 className="logoNav" style={{paddingLeft: '100px'}}><Link style={{}} to='/'>SID</Link></h1>*/}
        {/*        <div>*/}
        {/*            {(userSession &&*/}
        {/*            userSession.roles.includes("ADMIN")) || debugMode*/}
        {/*            ?  (*/}
        {/*                <>*/}
        {/*                <div className="admin"><a style={{ fontWeight: 500}} onClick={() => toAdmin()}>Админ панель</a></div>*/}
        {/*                <div className="admin"><Link style={{ fontWeight: 500}} to="/registration">Регистрация</Link></div>*/}
        {/*                </>*/}
        {/*            ) : ("")}*/}

        {/*            <ul className="nav-menu" style={{marginLeft: '50px'}}>*/}
        {/*            {debugMode || userSession ? */}
        {/*                <>*/}
        {/*                    /!* <style>*/}
        {/*                        */}
        {/*                    </style> *!/*/}
        {/*                    /!* <li>*/}
        {/*                        <a className={"nav-email"}>*/}
        {/*                            <span>{userSession.email}</span>*/}
        {/*                        </a>*/}
        {/*                    </li> *!/*/}
        {/*                    <li>*/}
        {/*                        <IconButton */}
        {/*                                aria-label="expand row" */}
        {/*                                size="small"*/}
        {/*                                ref={anchorRef}*/}
        {/*                                id="composition-button"*/}
        {/*                                aria-controls={open ? 'composition-menu' : undefined}*/}
        {/*                                aria-expanded={open ? 'true' : undefined}*/}
        {/*                                aria-haspopup="true"*/}
        {/*                                onClick={handleToggle}*/}
        {/*                                >*/}
        {/*                            <AccountCircleIcon style={{ fill: '#ffffff', fontSize: '35px' }}/>*/}
        {/*                        </IconButton>*/}
        {/*                        <IconButton */}
        {/*                            aria-label="expand row" */}
        {/*                            size="small"*/}
        {/*                            ref={anchorRef}*/}
        {/*                            id="composition-button"*/}
        {/*                            aria-controls={open ? 'composition-menu' : undefined}*/}
        {/*                            aria-expanded={open ? 'true' : undefined}*/}
        {/*                            aria-haspopup="true"*/}
        {/*                            onClick={handleToggle}>*/}

        {/*                            <KeyboardArrowDownIcon style={{ fill: '#ffffff', fontSize: '35px'  }}/>*/}
        {/*                        </IconButton>*/}
        {/*                    </li>*/}
        {/*                    <Popper*/}
        {/*                        sx={{position: 'absolute', zIndex: 99999999999}}*/}
        {/*                        open={open}*/}
        {/*                        anchorEl={anchorRef.current}*/}
        {/*                        role={undefined}*/}
        {/*                        placement="bottom-start"*/}
        {/*                        transition*/}
        {/*                        disablePortal*/}
        {/*                        >*/}
        {/*                        {({ TransitionProps, placement }) => (*/}
        {/*                            <Grow*/}
        {/*                            {...TransitionProps}*/}
        {/*                            style={{*/}
        {/*                                transformOrigin:*/}
        {/*                                placement === 'bottom-start' ? 'left top' : 'left bottom',*/}
        {/*                            }}*/}
        {/*                            >*/}
        {/*                            <Paper>*/}
        {/*                                <ClickAwayListener onClickAway={handleClose}>*/}
        {/*                                <MenuList*/}
        {/*                                    autoFocusItem={open}*/}
        {/*                                    id="composition-menu"*/}
        {/*                                    aria-labelledby="composition-button"*/}
        {/*                                    onKeyDown={handleListKeyDown}*/}
        {/*                                >*/}
        {/*                                    <MenuItem onClick={handleClose}><Link style={{ fontWeight: 600}} className={"nav-links"} to={"/profile"}>Профиль</Link></MenuItem>*/}
        {/*                                    <MenuItem onClick={handleClose}><Link style={{ fontWeight: 600}} className={"nav-links"} to={"/login"} onClick={logoutHandler}>Выйти</Link></MenuItem>*/}
        {/*                                </MenuList>*/}
        {/*                                </ClickAwayListener>*/}
        {/*                            </Paper>*/}
        {/*                            </Grow>*/}
        {/*                        )}*/}
        {/*                        </Popper>*/}
        {/*                </> */}
        {/*                :*/}
        {/*                <>*/}
        {/*                    /!* <li><a className={"nav-links"} href={"http://localhost:3000/registration"}>SIGN UP</a></li> *!/*/}
        {/*                    /!* <li><a className={"nav-links"} href={"http://localhost:3000/login"}>LOG IN</a></li> *!/*/}
        {/*                </>*/}
        {/*            }*/}
        {/*            </ul>*/}
        {/*        </div>*/}
        {/*        */}
        {/*    </nav>*/}
        {/*</div>*/}
        {/*<SideBar/>*/}
            <NavbarN/>
        </>
     );
}

export default GrayNavbar;