import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './supersetPage.scss'
import SideBar from '../../components/side-bar';
import logoImage from './superset-logo.png';

import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function SupersetPage() {
    const [dashboardUrl, setDashboardUrl] = useState('');
    const [questionUrl, setQuestionUrl] = useState('');

    const [open, setOpen] = useState(false);
    const [openSelect, setOpenSelect] = useState(true);

    const fetchDashboardUrl = (event) => {


        let url = event.target.id;
        
        axios.get(`http://192.168.5.22:8081/dashboard/dashurl`)
            .then(response => {
                setDashboardUrl(response.data.url);
            })
            .catch(error => {
                console.error('Error fetching dashboard URL:', error);
            });

        setOpen(true)
    };    const fetchDashboardUrl1 = (event) => {


        let url = event.target.id;

        axios.get(`http://192.168.5.22:8081/dashboard/dashurl1`)
            .then(response => {
                setDashboardUrl(response.data.url);
            })
            .catch(error => {
                console.error('Error fetching dashboard URL:', error);
            });

        setOpen(true)
    };

    return (
        <div className='supersetPage'>
            <SideBar/>
            <div className='supersetBody'>
                <div className="iframes-container">
                    <div className={`selectBar ${openSelect ? 'selectBarOpen' : 'selectBarClose'}`}>

                        <div onClick={fetchDashboardUrl} id='dashurl'>DASHBOARD1</div>
                        <div onClick={fetchDashboardUrl1} id='dashboard_2'>DASHBOARD2</div>
                        <div onClick={fetchDashboardUrl} id='dashboard_3'>DASHBOARD3</div>
                        <div onClick={fetchDashboardUrl} id='dashboard_4'>DASHBOARD4</div>

                        <div onClick={() => {setOpenSelect(false)}}><LibraryBooksIcon/></div>
                    </div>
                    <div className="iframe-items">
                        <div onClick={() => {setOpenSelect(true)}}><LibraryBooksIcon/></div>
                        {
                            open ? 
                            <iframe
                                id="dashboard"
                                src={dashboardUrl}
                                frameBorder="0"
                                width="1000"
                                height="600"
                                allowtransparency
                            ></iframe>
                            :
                            <img src={logoImage}/>
                        }
                        
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default SupersetPage;
