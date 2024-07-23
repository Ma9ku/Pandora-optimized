import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Menu } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from "../../services/auth.service";
import backVideo from './backgroundVideo.mp4';
import esfL from './esf.svg';
import eTanu from './eTanuLogo.png';
import itapL from './itap.svg';
import './mainPageLS.scss';
import pandora from './pandora-logo.png';
import profilerL from './profiler.svg';
import supersetL from './superset.svg';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));



function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const MainPage = (props) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false)
    const userSession = JSON.parse(localStorage.getItem("user"))
    const [news, setNews] = useState([])
    const [openNews, setOpenNews] = useState(false)
    const [newsTitle, setNewsTitle] = useState('')
    const [newsDesc, setNewsDesc] = useState('')
    const [newsDate, setNewsDate] = useState('')
    const [newsImage, setNewsImage] = useState('')
    const [events, setEvents] = useState([])
    const [open, setOpen] = React.useState(false);
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [modalIndex, setModalIndex] = useState(0)

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickOpen = (index) => {
        setModalIndex(index + 1)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (userSession == null) {
            navigate('/login')
        }
    })

    // useEffect(() => {
    //     axios.get(default_host + 'news').then(res => {
    //         setNews(res.data)
    //         // setMainNews(res.data[0])
    //         console.log(res.data)
    //     }).then(
    //         axios.get(default_host + 'events').then(res => {
    //             setEvents(res.data)
    //             console.log(res.data)
    //         })
    //     )
    // }, [])

    const logoutHandler = () => {
        authService.logout();
        navigate('/login');
    }

    const handleNewsOpen = (item) => {
        console.log(item)
        setNewsTitle(item.title)
        setNewsDesc(item.description)
        setNewsDate(item.date)
        setNewsImage(item.image)

        setOpenNews(true)
    }




    const handleNewsClose = () => setOpenNews(false);

    return (
        <>
            {news.length > 0 ?
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                    style={{ width: '1000px', margin: '0 auto' }}
                >
                    <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                        {news[modalIndex].title}
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <img style={{ width: '100%' }} src={news[modalIndex].image} />
                        <Typography gutterBottom>
                            {news[modalIndex].description}
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Закрыть
                        </Button>
                    </DialogActions>
                </BootstrapDialog> : ''
            }
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                <video autoPlay muted loop style={{
                    // position: 'absolute',
                    zIndex: -2,
                    top: 0,
                    left: 0,
                    width: '100%',
                    // objectFit: 'cover',
                    filter: 'grayscale(100%)'
                }}>
                    <source src={backVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className='mainPageBlock' style={{ position: 'relative', width:"100%" }}>
                <div className='navbar-transparent' style={{ width: '100%', height: '80px', display: 'flex', justifyContent: 'space-between', margin: '0 auto', zIndex: 1, backgroundColor: "white", background: 'rgba(217, 217, 217, 0.35)', marginTop: '15px' }}>
                    <div style={{ width: '90%', margin: '0 auto', opacity: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {/* <img src={menu} onClick={() => {setMenuOpen(true)}} style={{marginRight: '10px',
                                transition: 'filter 0.3s ease',
                                filter: 'brightness(100%)', cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.filter = 'brightness(50%)'}
                                 onMouseLeave={(e) => e.target.style.filter = 'brightness(100%)'}/>
                            <a href={'/'} style={{fontWeight: 600, fontSize: '26px', color: 'white'}}>SID</a> */}
                            <img src={pandora} alt='pandora' style={{ width: '170px' }} />
                        </div>
                        <div>
                            <a className="text-button" onClick={() => { navigate('/admin') }} style={{ fontSize: '21px', fontWeight: '500', marginRight: '15px', color: 'white' }}>Админ панель</a>
                            <a className="text-button" onClick={() => { navigate('/registration') }} style={{ fontSize: '21px', fontWeight: '500', marginRight: '25px', color: 'white' }}>Регистрация</a>
                            <a style={{ fontSize: '21px', fontWeight: '500', color: 'white' }}>{userSession ? userSession.email : "No userSession"}</a>
                            <IconButton onClick={handleMenu}>
                                <ArrowDropDownIcon />
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
                                <MenuItem onClick={() => { navigate("/profile") }}>Профиль</MenuItem>
                                <MenuItem onClick={logoutHandler}>Выйти</MenuItem>
                            </Menu>
                        </div>
                    </div>
                </div>

                <div style={{ width: '80%', margin: '0 auto', paddingTop: '5%' }}>
                    {/* <a style={{display: 'block', fontSize: '32px', fontWeight: 600}}>Lorem ipsum dolor sit amet</a> */}
                    {/* <a style={{marginTop: '32px', display: 'block', width: '55%', fontSize: '28px', fontWeight: 500}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</a> */}
                </div>
                <div style={{ width: '80%', display: 'flex', justifyContent: 'space-around', margin: '0 auto', paddingTop: '50px' }}>
                    <div className="toolPan" onClick={() => { navigate('/itap') }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{ display: 'block', margin: '0 auto', marginTop: '10px' }} src={itapL} />
                        <a style={{ display: 'block', fontSize: '23px', fontWeight: 700 }}></a>
                        <a className='context-text' style={{ fontSize: '18px', fontWeight: 300, textAlign: 'center' }}>Поиск взаимосвязей</a>
                    </div>
                    <div className="toolPan" onClick={() => { navigate('/superset') }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{ display: 'block', margin: '0 auto', marginTop: '10px' }} src={supersetL} />
                        <a style={{ display: 'block', fontSize: '23px', fontWeight: 700 }}></a>
                        <a className='context-text' style={{ fontSize: '18px', fontWeight: 300, textAlign: 'center' }}>Аналитичесие отчеты</a>
                    </div>
                </div>
                <div style={{ width: '80%', display: 'flex', justifyContent: 'space-around', margin: '0 auto', paddingTop: '50px' }}>
                    <div className="toolPan" onClick={() => { navigate('/profiler') }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{ display: 'block', margin: '0 auto', marginTop: '10px' }} src={profilerL} />
                        <a style={{ display: 'block', fontSize: '23px', fontWeight: 700 }}></a>
                        <a className='context-text' style={{ fontSize: '18px', fontWeight: 300, textAlign: 'center' }}>Поиск объектов</a>
                    </div>
                    <div className="toolPan" onClick={() => { navigate('/esf') }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{ display: 'block', margin: '0 auto', marginTop: '10px', width: '77px' }} src={esfL} />
                        <a style={{ display: 'block', fontSize: '23px', fontWeight: 700 }}></a>
                        <a className='context-text' style={{ fontSize: '18px', fontWeight: 300, textAlign: 'center', paddingTop: '8px' }}>ESF</a>
                    </div>
                </div>
                <div style={{ width: '80%', display: 'flex', justifyContent: 'space-around', margin: '0 auto', paddingTop: '50px' }}>
                    <div className="toolPan" onClick={() => { navigate('/eTanu') }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <img style={{ display: 'block', margin: '0 auto', marginTop: '10px', width: '102px' }} src={eTanu} />
                        <a style={{ display: 'block', fontSize: '23px', fontWeight: 700 }}></a>
                        <a className='context-text' style={{ fontSize: '18px', fontWeight: 300, textAlign: 'center', paddingTop: '8px' }}>eTanu</a>
                    </div>
                </div>
            </div>
            {/* <div className='newsAndAnnouncements'>
                <div className='newsAndAnnouncementsUsableSpace'>
                    {news.length > 0 ?
                    <>
                    <div style={{display: 'flex', paddingTop: '60px', justifyContent: 'space-between',}}>
                        <div style={{width: '49%'}}>
                            <div style={{display: 'flex', alignItems: 'center', marginBottom: '26px'}}>
                                <a style={{marginRight: '10px', fontSize: '24px', fontWeight: 700}}>Новости</a>
                            </div>
                            {news.map((x, index) => (
                                    <div onClick={(e) => handleClickOpen(index-1)} className='news-preview' style={{cursor: 'pointer', display: 'flex', paddingBottom: '10px', marginBottom: '10px'}}>
                                        <div style={{width: '70%'}}>
                                            <a style={{display: 'block',  color: 'black', fontSize: '18px', fontWeight: 600, marginBottom: '25px'}}>{x.title}</a>
                                            <a style={{color: '#253745', display: 'block', fontSize: '16px', fontWeight: 400, marginBottom: '25px'}}>{x.description.substring(0, 150)}</a>
                                            <a style={{bottom: 0, display: 'block',  fontSize: '14px', fontWeight: 400, color: 'white'}}>17.07.2023</a>
                                        </div>
                                        <img style={{width: '30%'}} src={x.image}/>
                                    </div>
                            )
                            )}
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '26px'}}>
                                <Link to={"/news"} style={{color: '#D9D9D9', fontWeight: '400'}}>Перейти к новостям</Link>
                            </div>
                        </div>
                        <div style={{width: '49%'}}>
                            <div style={{display: 'flex', alignItems: 'center',  marginBottom: '26px'}}>
                                <a style={{marginRight: '10px', fontSize: '24px', fontWeight: 700}}>Календарь</a>
                            </div>
                            {events.map((x) => (
                                <div className='news-preview' style={{display: 'flex',paddingBottom: '10px', marginBottom: '10px'}}>
                                    <div style={{width: '70%'}}>
                                        <a style={{display: 'block', color: 'black', fontSize: '18px', fontWeight: 600, marginBottom: '25px'}}>{x.title}</a>
                                        <a style={{color: '#253745', display: 'block', fontSize: '16px', fontWeight: 400, marginBottom: '25px'}}>{x.desc.substring(0, 200)}</a>
                                        <a style={{bottom: 0, display: 'block',  fontSize: '14px', fontWeight: 400, color: 'white'}}>{x.start} - {x.end}</a>
                                    </div>
                                </div>
                            ))}
                            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '26px'}}>
                                <Link to={'/calendar'} style={{color: '#D9D9D9', fontWeight: '400'}}>Перейти в календарь</Link>
                            </div>
                        </div>
                    </div>
                    </>
                        :
                        ""
                    }
                </div>
                <div style={{backgroundColor: '#A4A7AC', marginTop: '200px'}}>
                    <div  style={{width: '90%', height: '80px', display: 'flex', justifyContent: 'flex-end', margin: '0 auto', zIndex: 1, alignItems: 'center'}}>
                        <a style={{fontWeight: '700'}}>
                            SID
                        </a>
                        <a>
                            2023
                        </a>
                    </div>
                </div>
            </div> */}
        </>

    );
}


const SideBar = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const { menuOpen, setMenuOpen } = props
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
        { name: "Главная страница", to: "/" },
        { name: "Справочник", to: "/workers" },
        { name: "Все новости", to: "/news" },
        { name: "Календарь", to: "/calendar" },
        // {name: "Информационные ресурсы", to: "/"},
        // {name: "База знаний", to: "/"},
        { name: "Мессенджер", to: "/" },
        { name: "Заявления", to: "/" },
        { name: "Бюро пропусков", to: "/bureau" },
        { name: "Служба поддержки", to: "/" },
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
                    width: menuOpen ? "300px" : 0, /* 0 width - change this with JavaScript */
                    // marginRight: menuOpen? "300px":0, /* 0 width - change this with JavaScript */
                    position: 'fixed', /* Stay in place */
                    zIndex: 3, /* Stay on top */
                    top: '0', /* Stay at the top */
                    left: 0,
                    backgroundColor: '#0D0F11', /* Black*/
                    borderRight: menuOpen ? '1px solid #3a3a3a' : '',
                    overflowX: 'hidden', /* Disable horizontal scroll */
                    paddingTop: '60px', /* Place content 60px from the top */
                    transition: '0.5s'/* 0.5 second transition effect to slide in the sidenav */
                }}>
                <div className="menu-close" style={{ top: '30px', display: !menuOpen ? "none" : "block" }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setMenuOpen(false)}>
                        <KeyboardArrowLeftIcon style={{ fill: '#ffffff', fontSize: '33px' }} />
                    </IconButton>
                </div>
                <div className='menu-body'>
                    <div>
                        <div className="menu-name">
                            <span>{userSession ? userSession.email : "No userSession"}</span>
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
            {/* <div className="menu-open" 
                style={{
                    top: '35px',
                    width: menuOpen?"0":"40px", 
                    zIndex: 2,
                    left: "10px",
                    height: 'min-content', 
                    display: menuOpen? "none": "unset"
                }} onClick={() => {
                    setMenuOpen(true) 
                    searchPage()
                    }}>
                <IconButton aria-label="expand row" size="small" onClick={() => setMenuOpen(true)}>
                    <MenuIcon style={{ fill: '#949494', fontSize: '30px' }}/>
                </IconButton>
            </div> */}
        </>
    );
}

export default MainPage;