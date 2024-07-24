import axios from 'axios';
import React, { useEffect, useState } from "react";

import SideBar from '../../components/side-bar';

import { useLocation, useNavigate } from "react-router-dom";
import UsersTable from "../../components/itapComponents copy/UsersTable/UsersTable";
import './AdminPage.css';

const baseURL = "http://localhost:8081/api/pandora/main"

const AdminPage = (props) => {
    const userSession = JSON.parse(localStorage.getItem("user"))
    const navigate = useNavigate()    

    const [users, setUsers] = useState(0)
    const [logs, setLogs] = useState(0)
    const [todayLogs, setTodayLogs] = useState(0)

    const location = useLocation()

    useEffect(() => {
        const a = !userSession.roles.includes("ADMIN") ? navigate('/') : ""

        axios.get(`${baseURL}/general`)
        .then(res => {
            setUsers(res.data.userNumber)
            setLogs(res.data.allLogsNum)
            setTodayLogs(res.data.todayRequests)
            // console.log(this.location)
        })
    })

    return (
        <div className={'adminPage'} style={{display: 'flex', flexDirection: 'row'}}>
            <SideBar/>
            <section>
                <div className="countStats">
                    <div className="lastQuery">
                        <div>Количество пользователей</div>
                        <div>{users}</div>
                    </div>

                    <div>
                        <div>Количество запросов</div>
                        <div>{logs}</div>
                    </div>

                    <div>
                        <div>Количество запросов за сегодня</div>
                        <div>{todayLogs}</div>
                    </div>
                </div>
                <div>
                    <UsersTable></UsersTable>
                </div>
                <div className="footer"></div>
            </section>
        </div>

    );
}

export default AdminPage;