import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import authService from '../../services/auth.service';

import NavbarN from '../newestComponents/navbar-n'
import { useTheme } from '../../context/themeContext';

const GrayNavbar = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()    

    const debugMode = useState(true)

    const { theme } = useTheme();

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
            <NavbarN/>
        </>
     );
}

export default GrayNavbar;