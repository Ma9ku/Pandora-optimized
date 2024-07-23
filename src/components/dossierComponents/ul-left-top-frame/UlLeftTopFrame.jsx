import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './leftTopFrame.scss'
import './ul-left-top-frame.scss'

function UlLeftTopFrame(props) {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState(props.address ? props.address : {})
    const [bin, setBin] = useState('');

    useEffect(() => {
        setFullName(props.fullName)
        setBin(props.bin)
    })

    return ( 
        <div className="left-top-section">
            <div className="first-line">
                <div className='person-main-info'>
                    <div>
                        <label htmlFor="pName">Наименование</label>
                        <TextField sx={{ 
                            flex: 1, 
                            border: "1px solid #565656", 
                            borderRadius: "4px",
                            height: '10px'
                        }}  
 
                        id="filled-read-only-input" 
                        value={fullName || '---'}
                        variant="outlined" />
                    </div>
                    <div>
                        <label htmlFor="pName">БИН</label>
                        <TextField sx={{ 
                            flex: 1, 
                            border: "1px solid #565656", 
                            borderRadius: "4px",
                            height: '10px'
                        }}  
 
                        id="filled-read-only-input" 
                        value={bin || '---'}
                        variant="outlined" />
                    </div>
                    <div className='adressBlock'>
                        <div>
                            <label htmlFor="pName">Юридический адрес</label>
                        </div>
                        <div className='addressLine'>
                            <div>
                                <label htmlFor="pName">Область</label>
                                <TextField sx={{ 
                                    flex: 1, 
                                    borderRadius: "4px",
                                    height: '30px'
                                }}  
                                
                                id="filled-read-only-input" 
                                value={address.regAddrRegionRu || '---'}
                                variant="outlined" />
                            </div>
                            <div>
                                <label htmlFor="pName">Улица</label>
                                <TextField sx={{ 
                                    flex: 1, 
                                    borderRadius: "4px",
                                    height: '10px'
                                }}  
                                
                                id="filled-read-only-input" 
                                value={address.regAddrStreetRu || '---'}
                                variant="outlined" />
                            </div>
                            <div>
                                <label htmlFor="pName">Город</label>
                                <TextField sx={{ 
                                    flex: 1, 
                                    borderRadius: "4px",
                                    height: '10px'
                                }}  
                                
                                id="filled-read-only-input" 
                                value={address.regAddrLocalityRu || '---'}
                                variant="outlined" />
                            </div>
                            <div>
                                <label htmlFor="pName">Номер дома</label>
                                <TextField sx={{ 
                                    flex: 1, 
                                    borderRadius: "4px",
                                    height: '10px'
                                }}  
                                
                                id="filled-read-only-input" 
                                value={address.regAddrBuildingNum || '---'}
                                variant="outlined" />
                            </div>
                            <div>
                                <label htmlFor="pName">Район</label>
                                <TextField sx={{ 
                                    flex: 1, 
                                    borderRadius: "4px",
                                    height: '10px'
                                }}  
                                
                                id="filled-read-only-input" 
                                value={address.regAddrDistrictRu || '---'}
                                variant="outlined" />
                            </div>
                            <div>
                                <label htmlFor="pName">Наименование ОКЭД</label>
                                <TextField sx={{ 
                                    flex: 1, 
                                    borderRadius: "4px",
                                    height: '10px'
                                }}  
                                
                                id="filled-read-only-input" 
                                value={address.okedNameRu || '---'}
                                variant="outlined" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="other-line">
                
            </div>   
        </div>
    );
}

export default UlLeftTopFrame;