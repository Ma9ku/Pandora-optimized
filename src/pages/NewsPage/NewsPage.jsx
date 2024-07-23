import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { dossierURL } from '../../data/dossier';

import './newsPage.scss'
import { set } from 'react-hook-form';
import authService from "../../services/auth.service";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import menu from "../mainPage/ep_menu.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

function NewsPage() {

    const [news, setNews] = useState([])
    const [menuOpen, setMenuOpen] = useState(false)
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = React.useState(null);
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

    const [mainNews, setMainNews] = useState({
        id: 1,
        poster: '',
        date: '2023-08-11',
        desc: ''
    })

    useEffect(() => {
        axios.get(dossierURL + 'news').then(res => {
            setNews(res.data)
            setMainNews(res.data[0])
            console.log(res.data)
        })

    }, [])

    return ( 
        <div className="newsPage" style={{}}>
            <SideBar menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <div className='navbar-transparent' style={{width: '100%', height: '80px', display: 'flex', justifyContent: 'space-between', margin: '0 auto', zIndex: 1, backgroundColor: "white", background: 'rgba(217, 217, 217, 0.35)', marginTop: '15px'}}>
                <div style={{ width: '90%', margin: '0 auto', opacity: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div style={{display: 'flex', alignItems: 'center' }}>
                        <img src={menu} onClick={() => {setMenuOpen(true)}} style={{marginRight: '10px',
                            transition: 'filter 0.3s ease',
                            filter: 'brightness(0%)', cursor: 'pointer'}} onMouseEnter={(e) => e.target.style.filter = 'brightness(50%)'}
                             onMouseLeave={(e) => e.target.style.filter = 'brightness(0%)'}/>
                        <a style={{fontWeight: 600, fontSize: '26px', color: 'black'}}>SID</a>
                    </div>
                    <div>
                        <a className="text-button" onClick={()=> {navigate('/admin')}} style={{fontSize: '21px', fontWeight: '500', marginRight: '15px', color: 'black'}}>Админ панель</a>
                        <a className="text-button" onClick={()=> {navigate('/registration')}} style={{fontSize: '21px', fontWeight: '500', marginRight: '25px', color: 'black'}}>Регистрация</a>
                        <a style={{fontSize: '21px', fontWeight: '500', color: 'black'}}>{userSession?userSession.email:"No userSession"}</a>
                        <IconButton onClick={handleMenu}>
                            <ArrowDropDownIcon style={{color: 'black'}}/>
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
            <div className="newsBody">
                <div className="newsHeader">
                    <div className="addArticle">
                        <IconButton>
                            <Link to={`/article/create`}>
                                <AddIcon style={{color: 'black'}}/>
                            </Link>
                        </IconButton>
                    </div>
                    <div className="mainNewsBlock">
                        <h1>{mainNews.title}</h1>
                        <h6>{mainNews.dateOfCreated || ""}</h6>
                        <p>{mainNews.description}</p>

                        {/*<div className='quote'>*/}
                        {/*    <p>*/}
                        {/*        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium asperiores beatae, consequuntur debitis doloribus eos error eum excepturi explicabo,*/}
                        {/*        /!*{mainNews.desc.substring(0, 50)}*!/*/}
                        {/*    </p>*/}
                        {/*</div>*/}

                        <div className='poster'>
                            <img src={mainNews.image}/>
                        </div>

                        <div className='readMore'>
                            <div>Читайте также:</div>
                            <ul>
                                {news[1] ? <li><Link to={`/article/${news[1].id}`}>{news[1].title}</Link></li> : ""}
                                {news[2] ? <li><Link to={`/article/${news[2].id}`}>{news[2].title}</Link></li> : ""}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="otherNews">
                    {news.map(article => (
                        <Link to={`/article/${article.id}`}>
                            <div className="articleCard">
                                <div className='poster'>
                                    <img src={article.image} alt={article.title} />
                                </div>
                                <div className="info">
                                    <div className="title">{article.title}</div>
                                    <div className="desc">{`${article.description.substring(0, 400)}...`}</div>
                                    <div className="date">{article.dateOfCreated || ""}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
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
        </div>
    );
}

const SideBar = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const {menuOpen, setMenuOpen} = props
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
                            <span style={{color: 'white'}}>{userSession?userSession.email:"No userSession"}</span>
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


export default NewsPage;