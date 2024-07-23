import React, { useEffect, useState } from 'react';

import './profilePage.scss';

import { Button, TextField } from '@mui/material';
import SideBar from '../../components/side-bar';

import VisibilityOn from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import defaultURL from '../../data/baseURL';

function ProfilePage(props) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const [tab1, setTab1] = useState(true)
    const [tab2, setTab2] = useState(false)
    const [tab3, setTab3] = useState(false)
    const [tab4, setTab4] = useState(false)
    const [tab5, setTab5] = useState(false)
    const [tab6, setTab6] = useState(false)
    const [tab7, setTab7] = useState(false)
    const [tab8, setTab8] = useState(false)
    const [tab9, setTab9] = useState(false)

    const [tabs, setTabs] = useState({
        'tab1': true,
        'tab2': false,
        'tab3': false,
        'tab4': false,
        'tab5': false,
        'tab6': false,
        'tab7': false,
        'tab8': false,
        'tab9': false
    })
    const [currTab, setCurrTab] = useState('tab1')
    useEffect(() => {
        document.getElementById('tab1').click()

        getUserInfo()
    }, [])

    const [changePasswordError, setChangePasswordError] = useState(false)

    const userSession = JSON.parse(localStorage.getItem("user"))

    const getUserInfo = async () => {
        console.log(userSession)

        let res = await axios.get(defaultURL+"/main/getUserInfo",
    { headers: {
                Authorization: `Bearer ${userSession.accessToken}`
            }})

        setName(res.data.email)
        setEmail(res.data.username)
        setRole(res.data.roles[0].name)

        console.log(res.data)
    }

    const handlePasswordChange =  async  ()  => {
        let newPassword = document.querySelector('.newPassword input').value;
        let approvePassword = document.querySelector('.approvePassword input').value;
    
        if (newPassword === approvePassword) {
            setChangePasswordError(false)

            
            let res = await axios.post(defaultURL+"/auth/changePassword?password=" + newPassword)
            console.log(res.body)
            document.getElementById('tab1').click()

        } else {
            setChangePasswordError(true)

        }
    }

    const handleTabClick = (tabId) => {
        setTabs({
            'tab1': false,
            'tab2': false,
            'tab3': false,
            'tab4': false,
            'tab5': false,
            'tab6': false,
            'tab7': false,
            'tab8': false,
        })

        setTabs({
            ...tabs,
            [currTab]: false,
            [tabId]: true
        })

        setCurrTab(tabId)
    }

    return (
        <div className="profilePage">
            <SideBar/>
            <div className='profilePageBody'>
                <div className="mainInfo">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAAEPCAYAAAAph6q0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAANXSURBVHgB7daxTQMxAEZhJzSUocsIlBkNOjpESYXYADZhhBvjOm4EfGKF5FXfJ/2yPMCTfRjT5XJ5ncfT3GkA17bNfS3L8nyYsX2M/9iA23rbg/sdXjYobMchNqicjgPICA5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgJDgICQ5CgoOQ4CAkOAgJDkKCg5DgICQ4CAkOQoKDkOAgtAe3DaCw7cF9DqDwfbeu68/5fH6Yl8e5+wFc2/6LfF+W5eUP2xwYQKepFAMAAAAASUVORK5CYII=" alt="" />
                    <div>
                        <div className="name">{name}</div>
                        <div className="email">e-mail: <span>{email}</span></div>
                        <div className="birthDay">День рождения: <span>31.01.2002</span></div>
                        <div className="rank">Звание: <span>Ст. Сержант</span></div>
                        <div className="companyName">Организация: <span>ГУ “Агентство Республики Казахстан по финансовому мониторигу”</span></div>
                        <div className="department">Отдел: <span>Управление информационной безопасности</span></div>
                        <div className="phone">Рабочий телефон: <span>87785535429</span></div>
                        <div className="gender">Пол: <span>Мужчина</span></div>
                    </div>
                </div>
                <div className="profileTabs">
                <div className="tab-wrap">
                        <input type="radio" id="tab0" name="tabGroup2" className="tab" disabled style={{cursor: 'default'}}/>

                        <TabItem 
                            pos='end'
                            name="tab1" 
                            label='Общие сведения'
                            thisTab={tabs['tab1']}
                            nextTab={tabs['tab2']}
                            handleTabClick={handleTabClick}
                            />
                        
                        {/* <TabItem 
                            pos='middle'
                            name="tab2" 
                            label='Образование'
                            thisTab={tabs['tab2']}
                            nextTab={tabs['tab3']}
                            handleTabClick={handleTabClick}
                            />

                        <TabItem 
                            pos='middle'
                            name="tab3" 
                            label='Опыт работы'
                            thisTab={tabs['tab3']}
                            nextTab={tabs['tab4']}
                            handleTabClick={handleTabClick}
                            />

                        <TabItem 
                            pos='middle'
                            name="tab4" 
                            label='Справки'
                            thisTab={tabs['tab4']}
                            nextTab={tabs['tab5']}
                            handleTabClick={handleTabClick}
                            />
                        
                        <TabItem 
                            pos='middle'
                            name="tab5" 
                            label='Заявления'
                            thisTab={tabs['tab5']}
                            nextTab={tabs['tab6']}
                            handleTabClick={handleTabClick}
                            />

                        <TabItem 
                            pos='middle'
                            name="tab6" 
                            label='Заявки'
                            thisTab={tabs['tab6']}
                            nextTab={tabs['tab7']}
                            handleTabClick={handleTabClick}
                            />

                        <TabItem 
                            pos='middle'
                            name="tab7" 
                            label='Приказы'
                            thisTab={tabs['tab7']}
                            nextTab={tabs['tab8']}
                            handleTabClick={handleTabClick}
                            />

                        <TabItem 
                            pos='end'
                            name="tab8" 
                            label='Скуд'
                            thisTab={tabs['tab8']}
                            handleTabClick={handleTabClick}
                            />        */}
                        
                        <div className="tab__content">
                            
                        </div>

                        <div className="tab__content tab1_content">
                            <div>Категория: <span>{'B-6 (A-5)'}</span></div>
                            <div>Дата рождения: <span>{'22 сентября 2022г.'}</span></div>
                            <div>Национальность: <span>{'Казах'}</span></div>
                            <div>Семейное положение: <span>{'Холост'}</span></div>
                            <div>Мобильный номер: <span>{''}</span></div>
                            <div>Вид: <span>{'Государственный служащий'}</span></div>
                            <div>Адрес места рождения: <span>{'Казахстан'}</span></div>
                            <div>Адрес места проживания: <span>{'Казахстан'}</span></div>
                            <div>Табельный номер: <span>{'700'}</span></div>
                            <div>Дата приема: <span>{'14.04.2023г.'}</span></div>
                            <div>Дата последнего перемещения: <span>{'14.04.2023г.'}</span></div>
                        </div>

                        <div className="tab__content tab2_content">
                            <div className="title">Образование</div>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow style={{background: '#202020'}}>
                                            <TableCell style={{color: '#838383'}}>Вид Образования</TableCell>
                                            <TableCell style={{color: '#838383'}}>Дата поступления</TableCell>
                                            <TableCell style={{color: '#838383'}}>Учебное заведение</TableCell>
                                            <TableCell style={{color: '#838383'}}>Специальность</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* <TableRow sx={{borderBottom: 'hidden'}}>
                                            <TableCell>Вид Образования</TableCell>
                                            <TableCell>Дата поступления</TableCell>
                                            <TableCell>Учебное заведение</TableCell>
                                            <TableCell>Специальность</TableCell>
                                        </TableRow> */}
                                        <TableRow>
                                            <TableCell colSpan={4} style={{ textAlign: 'center', fontSize: '20px'}}>Отсутствуют данные</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>

                        <div className="tab__content">
                        </div>

                        <div className="tab__content">
                        </div>

                        <div className="tab__content">
                        </div>

                        <div className="tab__content">
                        </div>

                        <div className="tab__content">
                        </div>

                        <div className="tab__content">
                        </div>

                        <div className="tab__content">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TabItem(props) {

    const style = {
        textTransform: 'uppercase',
        backgroundColor: props.thisTab?"#0D0F11":"#171B1F", 
        color: props.thisTab?"#FFFFFF":"#7B7B7B",
        borderTop: "1px #565656 solid",
    }

    const startStyle = {
        ...style,
        borderLeft: "1px #565656 solid",
        borderRight: !props.thisTab? (!props.nextTab ? "1px #565656 solid" : "none") : "1px #565656 solid"
    }

    const middleStyle = {
        ...style,
        borderTop: "1px #565656 solid",
        borderRight: !props.thisTab? (!props.nextTab ? "1px #565656 solid" : "none") : "1px #565656 solid"
    }
    
    const endStyle = {
        ...style,
        borderTop: "1px #565656 solid",
        borderRight: "1px #565656 solid"
    }

    const getStyle = () => {
        if (props.pos === 'middle') return middleStyle
        else if (props.pos === 'end') return endStyle
        else return startStyle
    }

    return (
        <>
            <input type="radio" id={props.name} name="tabGroup2" className="tab"
                onClick={(event) => props.handleTabClick(event.target.id)}/>
            <label htmlFor={props.name} 
                style={getStyle()}>{props.label}</label>
        </>
    )
}

function OldProfilePage(props) {

    const [tab1, setTab1] = useState(true)
    const [tab2, setTab2] = useState(true)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    // const [name, setName] = useState('')

    useEffect(() => {
        getUserInfo()
    }, [tab1, tab2])

    useEffect(() => {
        getUserInfo()
    }, [])

    const [showPassword, setShowPassword] = useState(false)
    const [changePasswordError, setChangePasswordError] = useState(false)

    const [appNumber, setAppNumber] = useState(0)
    const userSession = JSON.parse(localStorage.getItem("user"))

    const handlePasswordChange =  async  ()  => {
        let newPassword = document.querySelector('.newPassword input').value;
        let approvePassword = document.querySelector('.approvePassword input').value;
    
        if (newPassword === approvePassword) {
            setChangePasswordError(false)

            
            let res = await axios.post(defaultURL+"/auth/changePassword?password=" + newPassword)
            console.log(res.body)
            document.getElementById('tab1').click()

        } else {
            setChangePasswordError(true)

        }
    }
    const getUserInfo = async () => {
        console.log(userSession)

        let res = await axios.get(defaultURL+"/main/getUserInfo",
    { headers: {
                Authorization: `Bearer ${userSession.accessToken}`
            }})

        setName(res.data.email)
        setEmail(res.data.username)
        setRole(res.data.roles[0].name)

        console.log(res.data)
    }
    // {
    //     "id": 86,
    //     "username": "zhokha_off@mail.com",
    //     "email": "Zhahanger Zhangaliev",
    //     "user_photo": null,
    //     "password": "$2a$10$ma56cY1dDVR8ewcnslcu8.pYW5ny0XiiDo5X922AeC4bC7gHV5cUK",
    //     "active": true,
    //     "roles": [
    //     {
    //         "id": 1,
    //         "name": "ADMIN",
    //         "relations": null,
    //         "person_properties": null,
    //         "company_properties": null
    //     }
    // ]
    // }

    return ( 
        <div className='profilePage'>
            <SideBar/>
            <div className='pageTabs'>
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
                            }}>ИНФОРМАЦИЯ</label>

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
                            }}>НАСТРОЙКИ</label>

                        
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
                            <div className='profileInfo'>
                                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxARBhENBw8PERANEA4PEQ4NDRAPEA8PFRcWFhUSExMYKCggGR0lGxYTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg0NDisZFRk3KysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAgQFAQMH/8QANRABAQABAgIGCAQGAwAAAAAAAAECAxEEITFBUWFxgQUSIiMykaGxM3LB0UJSU2KS8RM0Q//EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A+qAKgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADy1eIxx+K8+yc6D1Gdqcblfg2n1rxutlenLL5g1xkf8uX82X+VSx4nOfxfPag1RRw467+3jPGXZdllm+N38AdAAAAAAAAAAAAAAAAAAAAcysk3y6I6oekNT25jOiTe+II8TxVt20+U7euqwKAAAACelq3HLfC+XVUAGtoasyw3nnOyvRmcFntryfzcr+jTQAAAAAAAAAAAAAAAAAAc8WRq5+tqXK9d+jU17to5XurJAAUAAAAAAdxy2ylnVZWyxWzLy5IOgAAAAAAAAAAAAAAAAA8uJ/Ay8KymvqzfSs7ZWQAAoAAAAAANbQvucfyz7MlraM9zj+WfZB6AAAAAAAAAAAAAAAAAArcdqXHTnqXbe7bs5oekJ7ieM/VngAKAAAAAADR4HUt076/Pa8mc0PR89zfzX7RBaAAAAAAAAAAAAAAAAAB48Vjvw+Xhv8ALmy2zZvNr1s3iuH9Ta43fffpnQDwAUAAAAAAGpwmO3D4983+alw3D+vvbdpNuidLSxm2O06JyQdAAAAAAAAAAAAAAAAAAVuOw30N5/DZVlyzebXovIGMJ62lcdTa+V7YgoAAAAAno6frakxnn3QF/gsNtCf3c1hyTabTq5OoAAAAAAAAAAAAAAAAAAAAKfpGexje+xRXfSN9nGeNUgAFAABb9HT28vCKi16PvvbO2fZBoAAAAAAAAAAAAAAAAAAA5bJN8rtO2g6p63G89tKed/Y1uNk5aXPvvQo28971glnnblvnd0QUAAAAHccrLvjdr3OALmlxt6NWb986fkuy8uTGXNDjeW2rPOfrEF4Rwzlx3wss7kgAAAAAAAAAABDU1Jjjvnf3qlqcbb+HNu+86DQeWevjPis8JzrNz1cr8Vt80AXNTjv6U87+yrnqXK7521EUAAAAAAAAAAAAdxysu+Fs8FrT46/+k375yqoA1NPicL0XyvJ7MVLHOz4bZ4VBsDO0+Nynx8/pV3R1scp7HnL0wHoAAAAhq6kx07ll1fVNR9I5c5j5gq6upcs98/8AXciCgAAAAAAAAAAAAAAAAAAAA7jlZlvjdrHAGrw+r62nv19FnZXqzuAy99t2z6tFAAAZ/pD8afln3oAqgKAAAAAAAAAAAAAAAAAAAAAAPbgv+zPP7VqAgAA//9k=" alt="" srcset="" />
                                <div className="infoBlock">
                                    <div>
                                        <label htmlFor="pName">ФИО</label>
                                        <TextField sx={{ 
                                                flex: 1, 
                                                border: "1px solid #565656", 
                                                borderRadius: "4px",
                                                // height: '10px'
                                            }}  
                                            id="filled-read-only-input" 
                                            value={name}
                                            variant="outlined" />
                                    </div>
                                    <div>
                                        <label htmlFor="pName">Почта</label>
                                        <TextField sx={{ 
                                                flex: 1, 
                                                border: "1px solid #565656", 
                                                borderRadius: "4px",
                                                // height: '10px'
                                            }}  
                                            id="filled-read-only-input" 
                                            value={email}
                                            variant="outlined" />
                                    </div>
                                    <div>
                                        <label htmlFor="pName">Роль</label>
                                        <TextField sx={{
                                            flex: 1,
                                            border: "1px solid #565656",
                                            borderRadius: "4px",
                                            // height: '10px'
                                        }}
                                                   id="filled-read-only-input"
                                                   value={role}
                                                   variant="outlined" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab__content">
                            <div className='profileSettings'>
                                <div className="" style={{
                                    width: '70%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '30px',
                                }}>
                                    <PasswordInput className={'newPassword'} labelTitle={'Введите новый пароль'}/>
                                    <PasswordInput className={'approvePassword'} labelTitle={'Подтвердите новый пароль'}/>
                                    <Button 
                                        variant="outlined" 
                                        sx={{width: '200px', alignSelf: 'flex-end'}}
                                        onClick={handlePasswordChange}
                                        >Сменить пароль</Button>
                                    {changePasswordError ? <div className="errorMessage">Пароли не совпадают</div> : ""}
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
    );
}



const PasswordInput = (props) => {
    const [showPassword, setShowPassword] = useState(false)

    return <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                height: '35px'
            }} className={props.className}>
                <label 
                    htmlFor="pName"
                    style={{
                        minWidth: '300px',
                        maxWidth: '30%',
                        fontSize: '1.2rem'
                    }}

                    >{props.labelTitle}</label>
                <TextField
                    id="filled-input"
                    type={!showPassword ? 'password' : 'text'}
                    variant="outlined"
                    sx={{ 
                        flex: 1, 
                        border: "1px solid #565656", 
                        borderRadius: "4px",
                    }} 
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end" sx={{cursor: 'pointer'}}
                                onClick={() => {setShowPassword(prev => !prev)}}>
                                {!showPassword ? <VisibilityOn sx={{fontSize: '0.9rem'}}/>
                                : <VisibilityOff sx={{fontSize: '0.9rem'}}/>}
                            </InputAdornment>,
                    }}
                />
            </div>
}

export default ProfilePage;