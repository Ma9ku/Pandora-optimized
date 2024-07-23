import React, { useState, useEffect } from 'react';
import default_host from '../../../config/config'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import './leftTopFrame.scss'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import axios from 'axios';

const baseURL = 'http://10.202.20.92:8081/'


function LeftTopFrame(props) {
    const [photo, setPhoto] = useState('')
    const [photos, setPhotos] = useState([{photo: ''}, {photo: ''}])
    const [first_name, setfirst_name] = useState('')
    const [last_name, setlast_name] = useState('')
    const [patronymic, setpatronymic] = useState('')
    const [iin, setiin] = useState('')

    const [canChange, setCanChange] = useState(true)

    const [sliderNum, setSliderNum] = useState(0)
    // const [first_name, setfirst_name] = useState('')
    // const [first_name, setfirst_name] = useState('')
    // const [first_name, setfirst_name] = useState('')
    useEffect(() => {
        setPhoto(props.photo)
        setPhotos(props.photos)
        setfirst_name(props.data && props.data[0] && (props.data[0].first_name))
        setlast_name(props.data && props.data[0] && (props.data[0].last_name))
        setpatronymic(props.data && props.data[0] && (props.data[0].patronymic))
        setiin(props.data && props.data[0] && (props.data[0].iin))
    })
    // const [iin, setIIN] = useState("")
    //
    // const handleKeyDown = (event) => {
    //     if (event.key === "Enter") {
    //
    //         if (event.target.value !== iin) {
    //             setIIN(event.target.value)
    //             props.fetchIIN(event.target.value)
    //         }
    //     }
    // }
    const downloadAsPdf = () => {
        axios.get(default_host+'download/' + iin, {responseType: 'blob'}).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', iin+'.pdf')
            document.body.appendChild(link)
            link.click()
        })
    }

    const handleSliderNext = () => {

        let temp = sliderNum-1
        if (temp < 0) {
            temp = photos.length-1
        }

        setSliderNum(temp)
    }

    const handleSliderPrev = () => {

        let temp = sliderNum+1
        if (temp >= photos.length) {
            temp = 0
        }

        setSliderNum(temp)

    }

    return (
        <>
        <div className="left-top-section" style={{position: 'relative'}}>
            <div className="first-line">
            <div className="avatar">
                <div className="avatar-image-wrapper">
                    <img src={"data:image/png;base64, " + (props.photos && props.photos[sliderNum] && photos[sliderNum].photo)} alt="No Image" />
                    <div className="avatar-slider-controls">
                    <div className="avatar-slider-arrow" onClick={handleSliderPrev}><ChevronLeftIcon/></div>
                    <div className="avatar-slider-arrow" onClick={handleSliderNext}><ChevronRightIcon/></div>
                    </div>
                </div>
            </div>
                <div className='person-main-info'>
                    <div style={{position: 'relative'}}>
                        <label htmlFor="pName">Имя</label>
                        <TextField sx={{ 
                            flex: 1, 
                            border: "1px solid #565656", 
                            borderRadius: "4px",
                            height: '10px',
                            width: '90%'
                        }}  
                        
                        id="filled-read-only-input" 
                        // inputProps={{'aria-label': 'Without label' }} 
                        value={first_name || '---'}
                        variant="outlined" />
                        <div style={{position: 'absolute', top: '64%', right: 0, transform: 'translateY(-50%)' }}>
                        <IconButton title="Скачать в PDF формате" aria-label="delete" onClick={downloadAsPdf}>
                            <PictureAsPdfIcon />
                        </IconButton>
                        </div>
                        {/* <input readOnly type="text" name="pName" value={first_name || "---"} className={props.data.fName ? "" : "disabledInput"} id="pName" placeholder='Салтанат' /> */}
                    </div>
                    <div>
                        <label htmlFor="pFam">Фамилия</label>
                        <TextField sx={{ 
                            flex: 1, 
                            borderRadius: "4px",
                            height: '10px'
                        }}  
                        
                        id="filled-read-only-input" 
                        // inputProps={{'aria-label': 'Without label' }} 
                        value={last_name || '---'}
                        variant="outlined" />
                    </div>
                    <div>
                        <label htmlFor="pOtch">Отчество</label>
                        <TextField sx={{ 
                            flex: 1, 
                            borderRadius: "4px",
                            height: '10px'
                        }}  
                        
                        id="filled-read-only-input" 
                        // inputProps={{'aria-label': 'Without label' }} 
                        value={patronymic || '---'}
                        variant="outlined" />
                    </div>
                    <div>
                        <label htmlFor="pIIN">ИИН</label>
                        <TextField sx={{ 
                            flex: 1, 
                            borderRadius: "4px",
                            height: '10px'
                        }}  
                        
                        id="filled-read-only-input" 
                        // inputProps={{'aria-label': 'Without label' }} 
                        value={iin || '---'}
                        variant="outlined" />
                    </div>
                </div>
            </div> 
            <div className="other-line">
                <div>
                    <label htmlFor="born-city">Дата рождения</label>
                    <TextField sx={{ 
                        flex: 1, 
                        borderRadius: "4px",
                        height: '10px',
                    }}  
                    
                    id="filled-read-only-input" 
                    // inputProps={{'aria-label': 'Without label' }} 
                    value={props.data && props.data[0] && (props.data[0].birth_date || "---")}
                    variant="outlined" />
                </div>
                <div>
                    <label htmlFor="nationality">Национальность</label>
                    <TextField sx={{ 
                        flex: 1, 
                        borderRadius: "4px",
                        height: '10px',
                    }}  
                    
                    id="filled-read-only-input" 
                    // inputProps={{'aria-label': 'Without label' }} 
                    value={props.data && props.data[0] && (props.data[0].nationality_ru_name || "---")}
                    variant="outlined" />
                </div>
                <div>
                    <label htmlFor="citizenship">Гражданство</label>
                    <TextField sx={{ 
                        flex: 1, 
                        borderRadius: "4px",
                        height: '10px',
                    }}  
                    
                    id="filled-read-only-input" 
                    // inputProps={{'aria-label': 'Without label' }} 
                    value={props.data && props.data[0] && (props.data[0].citizenship_ru_name || "---")}
                    variant="outlined" />
                </div>
                <div>
                    <label htmlFor="citizenship">Пол</label>
                    <TextField sx={{ 
                        flex: 1, 
                        borderRadius: "4px",
                        height: '10px',
                    }}  
                    
                    id="filled-read-only-input" 
                    // inputProps={{'aria-label': 'Without label' }} 
                    value={props.data && props.data[0] && (props.data[0].gender==='male' || props.data[0].gender==='1' ? 'МУЖЧИНА' : 'ЖЕНЩИНА')}
                    variant="outlined" />
                </div>
            </div>  
            {/* <div className='pdfButton' style={{ position: 'absolute', zIndex: 9999, bottom: 0, right: 0, backgroundColor: '#0D0F11', borderRadius: '3px 0 0 0', borderLeft: '1px solid #3a3a3a', borderTop: '1px solid #3a3a3a' }}> */}
            {/* </div> */}
        </div>
        </> 
    );
}

export default LeftTopFrame;