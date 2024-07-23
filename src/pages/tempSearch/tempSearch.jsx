// import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';


// import Navbar from '../../components/nav-bar/Navbar';

// const TempSearch = (props) => {
//     const [value, setValue] = React.useState(0);

//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };

//     return (
//         <>
//         <Navbar/>
//         <div className='searchtabs'>
//             <div class="tab-wrap">
//                 <input type="radio" id="tab4" name="tabGroup2" class="tab"/>
//                 <label for="tab4">ИИН</label>

//                 <input type="radio" id="tab5" name="tabGroup2" class="tab"/>
//                 <label for="tab5">ФИО</label>

//                 <input type="radio" id="tab6" name="tabGroup2" class="tab"/>
//                 <label for="tab6">БИН</label>

//                 <input type="radio" id="tab7" name="tabGroup2" class="tab"/>
//                 <label for="tab7">Наименование ЮЛ</label>

//                 <div class="tab__content">
//                     <FormControl sx={{ marginLeft: 8, width: '80%', marginBottom: '20px'  }} fullWidth> 
//                         <a className='fieldText'>ИИН</a>
//                         <div style={{ display: 'flex', marginLeft: '0 auto' }}>
//                             <TextField sx={{ height: '34px', flex: 1 }} id="outlined-basic" inputProps={{ style: {height: "3px"},'aria-label': 'Without label' }} variant="outlined" />
//                             <Button sx={{height: '34px', backgroundColor: "#33B6FF", color: 'white', width: 'fit-content',marginLeft: 3 }} variant="contained">
//                             <span className='buttonSearch'>Запрос</span>
//                             </Button>
//                         </div>
//                     </FormControl>
//                     <FormControl sx={{ marginLeft: 8, width: '80%', marginBottom: '20px' }} fullWidth>
//                         <a className='fieldText'>Номер документа</a>
//                         <div style={{ display: 'flex', marginLeft: '0 auto'}}>
//                             <TextField sx={{flex: 1  }} id="outlined-basic" inputProps={{ style: {height: "3px"}, 'aria-label': 'Without label' }} variant="outlined" />
//                             <Button sx={{height: '34px', backgroundColor: "#33B6FF", color: 'white', width: 'fit-content',marginLeft: 3 }} variant="contained">
//                             <span className='buttonSearch'>Запрос</span>
//                             </Button>
//                         </div>
//                     </FormControl>
//                     <FormControl sx={{ marginLeft: 8, width: '80%', marginBottom: '20px'  }} fullWidth>
//                         <a className='fieldText'>Номер телефона</a>
//                         <div style={{ display: 'flex', marginLeft: '0 auto' }}>
//                             <TextField sx={{ height: '34px', flex: 1 }} id="outlined-basic" inputProps={{ style: {height: "3px"},'aria-label': 'Without label' }} variant="outlined" />
//                             <Button sx={{height: '34px', backgroundColor: "#33B6FF", color: 'white', width: 'fit-content',marginLeft: 3 }} variant="contained">
//                                 <span className='buttonSearch'>Запрос</span>
//                             </Button>
//                         </div>
//                     </FormControl>
//                     <FormControl sx={{ marginLeft: 8, width: '80%', marginBottom: '20px' }} fullWidth>
//                         <a className='fieldText'>Электронная почта</a>
//                         <div style={{ display: 'flex', marginLeft: '0 auto' }}>
//                             <TextField sx={{ height: '34px', flex: 1 }} id="outlined-basic" inputProps={{ style: {height: "3px"},'aria-label': 'Without label' }} variant="outlined" />
//                             <Button sx={{height: '34px', backgroundColor: "#33B6FF", color: 'white', width: 'fit-content',marginLeft: 3 }} variant="contained">
//                                 <span className='buttonSearch'>Запрос</span>
//                             </Button>
//                         </div>
//                     </FormControl>
//                 </div>

//                 <div class="tab__content">
//                 </div>

//                 <div class="tab__content">
//                 </div>

//                 <div class="tab__content">
//                     fasf
//                 </div>

//                 <div className='tab__result'>
//                     RES
//                 </div>
//             </div>
//         </div>
//     </>
//     );
// }

// export default TempSearch;