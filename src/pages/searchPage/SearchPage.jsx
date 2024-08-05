import React, { useState, useEffect } from 'react';
import './searchPage.scss'



import authService from "../../services/auth.service";

import TabContent_IIN from '../../components/dossierComponents/tab-content-iin/TabContent_IIN';
import TabContent_FIO from '../../components/dossierComponents/tab-content-fio/TabContent_FIO';
import TabContent_BIN from '../../components/dossierComponents/tab-content-bin/TabContent_BIN';
import TabContent_UL from '../../components/dossierComponents/tab-content-ul/TabContent_UL';
import axios from 'axios';
import { pandoraURL } from '../../data/dossier';
import { useNavigate } from 'react-router-dom';

const Search = (props) => {
    const [iinTab, setIINTab] = useState(true)
    const [fioTab, setFIOTab] = useState(false)
    const [binTab, setBINTab] = useState(false)
    const [ulTab, setUlTab] = useState(false)

    const [historyTab, setHistoryTab] = useState(false)
    const [historyLoading, setHistoryLoading] = useState(true)
    const [historyError, setHistoryError] = useState(false)
    const [history, setHistory] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const userSession = JSON.parse(localStorage.getItem("user"))
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken

        axios.get(`${pandoraURL}/main/logs`)
            .then((res) => {
                setHistory(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setHistoryLoading(false);
            })
    }, [])

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
                                setHistoryTab(false)
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
                                setHistoryTab(false)
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
                                setHistoryTab(false)
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
                                setHistoryTab(false)
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
                        
                        
                        <input type="radio" id="tab10" name="tabGroup2" className="tab" style={{cursor: 'default'}}
                            onClick={() => {
                                setIINTab(false)
                                setFIOTab(false)
                                setBINTab(false)
                                setUlTab(false)
                                setHistoryTab(true)
                            }}
                        ></input>
                        <label 
                            htmlFor="tab10" 
                            style={{
                                backgroundColor: historyTab?"#0D0F11":"#171B1F", 
                                color: historyTab?"#FFFFFF":"#7B7B7B",
                                borderTop: "1px #565656 solid",
                                borderRight: "1px #565656 solid",
                                borderLeft: "1px #565656 solid",
                            }}>История поиска</label>
                        
                        
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
                        
                        <div className="tab__content"></div>
                        <div className="tab__content"></div>

                        <div className="tab__content tab_history">
                            <table>
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Лог</th>
                                        <th>ФИО</th>
                                        <th>Дата поиска</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    historyLoading 
                                        ? <tr>
                                            <td className='loading-row' colSpan={5}>...Загрузка</td>
                                        </tr>
                                        : historyError
                                        ?  <tr>
                                            <td className='loading-row' colSpan={5}>Ошибка загрузки</td>
                                        </tr>
                                        : (
                                            history && history.map((item, index) => {
                                                const logIIN = item.obwii.substring(item.obwii.lastIndexOf(':')+2)

                                                return <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{item.obwii}</td>
                                                    <td>{item.username}</td>
                                                    <td>{item.date.substring(0, 10)}</td>
                                                    <td>
                                                        <div
                                                            className='history-goto-button'
                                                            onClick={() => {
                                                                navigate(`/profiler/person/${logIIN}`)
                                                            }}
                                                        >
                                                            Перейти
                                                        </div>
                                                    </td>
                                                </tr>
                                            })
                                        )
                                }
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            
        </>
    );
}

export default Search;