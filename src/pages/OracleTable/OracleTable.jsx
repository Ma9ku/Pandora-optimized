import * as React from "react";
import axios from 'axios';



// import exportFromJSON from "export-from-json";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './oracleTable.scss'
import LinearProgress from '@mui/material/LinearProgress';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {DateField} from '@mui/x-date-pickers/DateField';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import dayjs from "dayjs";
import moment from "moment/moment";
import { createTheme, ThemeProvider } from '@mui/material';
import defaultURL from "../../data/baseURL";
const baseURL = defaultURL + "/main"

const dictionaryOfTable = {
    "messOfmId" : "Идентификатор записи о сообщении",
    "messNumber" : "Внутренний для СФМ номер сообщения",
    "messDate" : "Дата сообщения",
    "messType" : "Вид документа",
    "operStatus" : "Состояние операции",
    "messReason" : "Основание для подачи сообщения",
    "cfmCode" : "Код субъекта финансового мониторинга",
    "cfmName" : "Наименование субъекта",
    "cfmMainCode" : "ИИН\БИН",
    "cfmSeatArea" : "Адрес местонахождения - Область",
    "cfmSeatRegion" : "Адрес местонахождения - Регион",
    "cfmSeatCity" : "Адрес местонахождения - Город",
    "cfmSeatStreet" : "Адрес местонахождения - Улица",
    "cfmSeatHouse" : "Адрес местонахождения - Дом",
    "cfmSeatOffice" : "Адрес местонахождения - Офис",
    "cfmSeatPostcode" : "Адрес местонахождения - Почтовый индекс",
    "cfmIsac" : "Физлицо или Юрлицо",
    "docType" : "Тип документа (для физ лиц)",
    "cfmDocNumber" : "Номер док",
    "cfmDocSeries" : "Серия док",
    "cfmDocWhom" : "Кем выдан",
    "cfmDocDate" : "Дата выдачи",
    "operNumber" : "Номер операции",
    "operType" : "Тип операции",
    "operPaymentPurpose" : "Назначение платежа",
    "operMembersCount" : "Колво участников",
    "currencyType" : "Вид валюты",
    "operCurrencyAmount" : "Сумма валютой",
    "operTengeAmount" : "Сумма в тенге",
    "operReason" : "Основание совершения операции",
    "operDocDate" : "Дата документа на основании которого проведена операция",
    "operDocNumber" : "Номер документа операции",
    "suspFirst" : "1 признак подозрительности",
    "suspSecond" : "2 признак подозрительности",
    "suspThird" : "3 признак подозрительности",
    "operDopInfo" : "Доп инфо по операции",
    "memberId" : "Идентификатор участника",
    "memberVid" : "Вид участника",
    "memberResidence" : "Резиденство (1-да, 0-нет)",
    "memberResidenceCountrycode" : "Код страны резиденства",
    "memberType" : "Тип участника",
    "memberForeign" : "Показатель иностранного публичного лица и аффилированных с ним лиц",
    "memberBankCode" : "Код банка участника",
    "memberBankName" : "Название банка",
    "memberBankAccount" : "Счет участника",
    "memberBankAddress" : "Адрес банка",
    "memberUrName" : "Имя участника (Юр лицо)",
    "memberUrFistHeadName" : "Фио первого руководителя (Юр лицо)",
    "memberOked" : "ОКЭД",
    "memberMaincode" : "ИИН\БИН",
    "memberAcFirstName" : "Имя (Физ лицо либо ип)",
    "memberAcSecondName" : "Фамилия",
    "memberAcMiddlename" : "Отчество",
    "memberAcDocType" : "Тип документа участника",
    "memberAcDocSeries" : "Серия",
    "memberAcDocWhom" : "Кем выдан",
    "memberAcDocDate" : "Дата выдачи",
    "memberAcBirthDate" : "Дата рождения",
    "memberAcBirthPlace" : "Место рождения",
    "memberRegArea" : "Область прописки",
    "memberRegRegion" : "Регион прописки",
    "memberRegSity" : "Город",
    "memberRegStreet" : "Улица",
    "memberRegHouse" : "Дом",
    "memberRegOffice" : "Офис",
    "memberPhone" : "Телефон",
    "memberEmail" : "Эмайл",
    "memberSeatArea" : "Фактический адрес проживания - Область",
    "memberSeatRegion" : "Регион",
    "memberSeatSity" : "Город",
    "memberSeatStreet" : "Улица",
    "memberSeatHouse" : "Дом",
    "memberSeatOffice" : "Офис"
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


const names = {
    'ИИН/БИН Субъекта': 'cfmMainCode',
    'Внутренний для СФМ номер сообщения': 'messNumber',
    'Код субъекта финансового мониторинга': 'cfmName',
    'Номер операции': 'operNumber',
    'ИИН/БИН Покупателя': 'memberMaincode',
}
  

function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

function OracleTable(props) {
    const theme = useTheme();
    const [loading, setLoading] = React.useState(false)
    const labelStyle = {
        fontSize: '14px', /* set the desired font size */
    };
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [count, setCount] = React.useState(0)
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 15) : 0;
  
    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        getData()
        setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
    const themeOracle = createTheme({
        palette: {
          mode: 'dark',
          // primary: {
          //   // light: will be calculated from palette.primary.main,
          //   main: '#3F7E6F',
          //   // dark: will be calculated from palette.primary.main,
          //   // contrastText: will be calculated to contrast with palette.primary.main
          // },
        },
        typography: {
          fontFamily: 'Montserrat',
          fontSize: 13
        },
        components: {
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                // minHeight: 'max-content',
                // maxHeight: '30px',
                // fontSize: '9px',
                backgroundColor: '#0D0F11'
              },
              focused: {
                backgroundColor: '#0D0F11'
              },
              input: {
                '&:-webkit-autofill': {
                  WebkitBoxShadow: '0 0 0 100px #0D0F11 inset'
                
                }
              }
            }
          }
        }
      })

    const [startDate, setStartDate] = React.useState('')
    const [endDate, setEndDate] = React.useState('')
    const [mainList, setMainList] = React.useState([])
    const [firstFilter, setFirst] = React.useState('')
    const [secondFilter, setSecond] = React.useState('')
    const [thirdFilter, setThird] = React.useState('')
    const [fourthFilter, setFourth] = React.useState('')
    const [fifthFilter, setFifth] = React.useState('')
    const [aOr1, setAOr1] = React.useState('none')
    const [aOr2, setAOr2] = React.useState('none')
    const [aOr3, setAOr3] = React.useState('none')
    const [aOr4, setAOr4] = React.useState('none')
    const [value1, set1] = React.useState('')
    const [value2, set2] = React.useState('')
    const [value3, set3] = React.useState('')
    const [value4, set4] = React.useState('')
    const [value5, set5] = React.useState('')

    const [counting, setCounting] = React.useState(false)
    const nameArray = Object.entries(names);

    const handleFirst = (event) => {
        setFirst(event.target.value)
    }
    const handleSecond = (event) => {
        setSecond(event.target.value)
    }
    const handleThird = (event) => {
        setThird(event.target.value)
    }
    const handleFourth = (event) => {
        setFourth(event.target.value)
    }
    const handleFifth = (event) => {
        setFifth(event.target.value)
    }

    
    React.useEffect(() => {
        if (aOr1 == 'none') {
            setAOr2('none')
            setAOr3('none')
            setAOr4('none')
            setSecond('')
            setThird('')
            setFourth('')
            setFifth('')
            set2('')
            set3('')
            set4('')
            set5('')
        }
    }, [aOr1])
    React.useEffect(() => {
        if (aOr2 == 'none') {
            setAOr3('none')
            setAOr4('none')
            setThird('')
            setFourth('')
            setFifth('')
            set3('')
            set4('')
            set5('')
        }
    }, [aOr2])
    React.useEffect(() => {
        if (aOr3 == 'none') {
            setAOr4('none')
            setFourth('')
            setFifth('')
            set4('')
            set5('')
        }
    }, [aOr3])
    React.useEffect(() => {
        if (aOr4 == 'none') {
            setAOr4('none')
            setFifth('')
            set5('')
        }
    }, [aOr4])
    
    const getData = () => {
        setLoading(true)
        const request = axios.CancelToken.source()
        const req = {
            filter1: firstFilter,
            filter2: secondFilter,
            filter3: thirdFilter,
            filter4: fourthFilter,
            filter5: fifthFilter,
            aOr1,
            aOr2,
            aOr3,
            aOr4,
            value1,
            value2,
            value3,
            value4,
            value5,
            startDate: startDate == '' ? null : startDate.format('YYYY-MM-DD'),
            endDate: startDate == '' ? null : endDate.format('YYYY-MM-DD'),
            page
        }
        console.log(req)
        axios.get('http://localhost:1415/get', {params: req}, {
                cancelToken: request.token
            }).then(res => {
                console.log(res.data)
                setMainList(res.data.rows)
                setLoading(false)
                setCount(res.data.rows.length)
                // countGet()
            })


        return () => {
            // request.cancel()
            console.log('asd')
            setLoading(false)
        }
    }
    // React.useEffect(() => {
    //     while (counting == true) {
    //         setCount(count + 10)
    //     }
    // })
    const countGet = () => {
        const request = axios.CancelToken.source()
        setCounting(true)
        const req = {
            filter1: firstFilter,
            filter2: secondFilter,
            filter3: thirdFilter,
            filter4: fourthFilter,
            filter5: fifthFilter,
            aOr1,
            aOr2,
            aOr3,
            aOr4,
            value1,
            value2,
            value3,
            value4,
            value5,
            startDate: startDate == '' ? null : startDate.format('YYYY-MM-DD'),
            endDate: startDate == '' ? null : endDate.format('YYYY-MM-DD'),
            page
        }
        console.log(req)
        axios.get('http://localhost:1415/count', {params: req}, {
                cancelToken: request.token
            }).then(res => {
                setCount(res.data)
                setCounting(false)
            })


        return () => {
            // request.cancel()
            console.log('asd')
            setLoading(false)
        }
    }


    const beforeTableEncode = (data) => {
        const modifiedData = data.map((item) => {
            const modifiedItem = {};
            for (const [key, value] of Object.entries(item)) {
              const newKey = dictionaryOfTable[item[key]] || item[key]; // Use the key from the dictionary or the original key if not found
              modifiedItem[key] = newKey;
            }
            return modifiedItem;
          });
          return modifiedData;
      };
    

    const download = () => {
        axios.get('http://localhost:1415/export-to-pdf', {responseType: 'blob'}).then(res=> {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'document.pdf')
            document.body.appendChild(link)
            link.click()
        })
        // const data = mainList
        // const fileName = "set"
        // const exportType = exportFromJSON.types.csv
        // const encoding = 'windows-1252'
        // exportFromJSON({data, fileName, beforeTableEncode, exportType, encoding})
    }
    return (
        <ThemeProvider theme={themeOracle}>

        <div className="wholeBlock">
            <div className="searchBar">
                <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select-label"
                                label = "Фильтр"                                
                                value={firstFilter}
                                onChange={handleFirst}
                                MenuProps={MenuProps}
                                >
                                    <MenuItem value={'cfmMainCode'}>ИИН/БИН Субъекта</MenuItem>
                                    <MenuItem value={'messNumber'}>Внутренний для СФМ номер сообщения</MenuItem>
                                    <MenuItem value={'cfmName'}>Наименование субъекта</MenuItem>
                                    <MenuItem value={'operNumber'}>Номер операции</MenuItem>
                                    <MenuItem value={'memberMaincode'}>ИИН/БИН Покупателя</MenuItem>
                            </Select>
                </FormControl>
                {firstFilter.length > 0 && (
                    <>
                    <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            {/* <DatePicker
                                label="Начало интервала"
                                value={startDate}
                                onChange= {e=> setStartDate(e)} size= "small" sx={{width: '100%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}}
                                />
                            <DatePicker
                                
                                label="Начало интервала"
                                value={endDate}
                                onChange= {e=> setEndDate(e)} size= "small" sx={{width: '100%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} 
                                /> */}
                            <DateField required label="Начало интервала"
                                value={startDate} 
                                format="YYYY/MM/DD"
                                onChange= {e=> setStartDate(e)} size= "small" sx={{width: '100%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} />
                            <DateField required label="Конец интервала"
                                value={endDate} 
                                format="YYYY/MM/DD"
                                onChange={e=> setEndDate(e)} size= "small" sx={{width: '100%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} />
                        </LocalizationProvider>
                    </FormControl>
                    </>
                )}
                {firstFilter == 'cfmMainCode' && (
                    <>
                        <TextField size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} 
                        InputLabelProps={{style: labelStyle}} id="outlined-basic" 
                        label="ИИН/БИН Субъекта" variant="outlined" value={value1} onChange={event => (set1(event.target.value))} />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr1}
                                    onChange={event => {
                                        setAOr1(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {firstFilter == 'messNumber' && (
                    <>
                        <TextField value={value1} onChange={event => (set1(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Внутренний для СФМ номер сообщения" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr1}
                                    onChange={event => {
                                        setAOr1(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {firstFilter == 'cfmName' && (
                    <>
                        <TextField value={value1} onChange={event => (set1(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Код субъекта финансового мониторинга" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr1}
                                    onChange={event => {
                                        setAOr1(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {firstFilter == 'operNumber' && (
                    <>
                        <TextField value={value1} onChange={event => (set1(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Номер операции" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr1}
                                    onChange={event => {
                                        setAOr1(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {firstFilter == 'memberMaincode' && (
                    <>
                        <TextField value={value1} onChange={event => (set1(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Покупателя" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr1}
                                    onChange={event => {
                                        setAOr1(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}

                {aOr1 !== 'none' && (
                    <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                        <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label = "Фильтр"                                
                            value={secondFilter}
                            onChange={handleSecond}
                            MenuProps={MenuProps}
                            >
                                <MenuItem value={'cfmMainCode'}>ИИН/БИН Субъекта</MenuItem>
                                <MenuItem value={'messNumber'}>Внутренний для СФМ номер сообщения</MenuItem>
                                <MenuItem value={'cfmName'}>Наименование субъекта</MenuItem>
                                <MenuItem value={'operNumber'}>Номер операции</MenuItem>
                                <MenuItem value={'memberMaincode'}>ИИН/БИН Покупателя</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {/* SECOND VALUE ********************************************************* */}
                {secondFilter == 'cfmMainCode' && (
                    <>
                        <TextField value={value2} onChange={event => (set2(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Субъекта" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr2}
                                    onChange={event => {
                                        setAOr2(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {secondFilter == 'messNumber' && (
                    <>
                        <TextField value={value2} onChange={event => (set2(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Внутренний для СФМ номер сообщения" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr2}
                                    onChange={event => {
                                        setAOr2(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {secondFilter == 'cfmName' && (
                    <>
                        <TextField value={value2} onChange={event => (set2(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Код субъекта финансового мониторинга" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr2}
                                    onChange={event => {
                                        setAOr2(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {secondFilter == 'operNumber' && (
                    <>
                        <TextField value={value2} onChange={event => (set2(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Номер операции" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr2}
                                    onChange={event => {
                                        setAOr2(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {secondFilter == 'memberMaincode' && (
                    <>
                        <TextField value={value2} onChange={event => (set2(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Покупателя" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr2}
                                    onChange={event => {
                                        setAOr2(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {aOr2 !== 'none' && (
                    <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                        <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label = "Фильтр"                                
                            value={thirdFilter}
                            onChange={handleThird}
                            MenuProps={MenuProps}
                            >
                                <MenuItem value={'cfmMainCode'}>ИИН/БИН Субъекта</MenuItem>
                                <MenuItem value={'messNumber'}>Внутренний для СФМ номер сообщения</MenuItem>
                                <MenuItem value={'cfmName'}>Наименование субъекта</MenuItem>
                                <MenuItem value={'operNumber'}>Номер операции</MenuItem>
                                <MenuItem value={'memberMaincode'}>ИИН/БИН Покупателя</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {/* THIRD VALUE ********************************************************* */}
                {thirdFilter == 'cfmMainCode' && (
                    <>
                        <TextField value={value3} onChange={event => (set3(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Субъекта" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr3}
                                    onChange={event => {
                                        setAOr3(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {thirdFilter == 'messNumber' && (
                    <>
                        <TextField value={value3} onChange={event => (set3(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Внутренний для СФМ номер сообщения" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr3}
                                    onChange={event => {
                                        setAOr3(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {thirdFilter == 'cfmName' && (
                    <>
                        <TextField value={value3} onChange={event => (set3(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Код субъекта финансового мониторинга" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr3}
                                    onChange={event => {
                                        setAOr3(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {thirdFilter == 'operNumber' && (
                    <>
                        <TextField value={value3} onChange={event => (set3(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Номер операции" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr3}
                                    onChange={event => {
                                        setAOr3(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {thirdFilter == 'memberMaincode' && (
                    <>
                        <TextField value={value3} onChange={event => (set3(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Покупателя" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr3}
                                    onChange={event => {
                                        setAOr3(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {aOr3 !== 'none' && (
                    <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                        <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label = "Фильтр"                                
                            value={fourthFilter}
                            onChange={handleFourth}
                            MenuProps={MenuProps}
                            >
                                <MenuItem value={'cfmMainCode'}>ИИН/БИН Субъекта</MenuItem>
                                <MenuItem value={'messNumber'}>Внутренний для СФМ номер сообщения</MenuItem>
                                <MenuItem value={'cfmName'}>Наименование субъекта</MenuItem>
                                <MenuItem value={'operNumber'}>Номер операции</MenuItem>
                                <MenuItem value={'memberMaincode'}>ИИН/БИН Покупателя</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {/* FOURTH VALUE ********************************************************* */}
                {fourthFilter == 'cfmMainCode' && (
                    <>
                        <TextField value={value4} onChange={event => (set4(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Субъекта" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr4}
                                    onChange={event => {
                                        setAOr4(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {fourthFilter == 'messNumber' && (
                    <>
                        <TextField value={value4} onChange={event => (set4(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Внутренний для СФМ номер сообщения" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr4}
                                    onChange={event => {
                                        setAOr4(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {fourthFilter == 'cfmName' && (
                    <>
                        <TextField value={value4} onChange={event => (set4(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Код субъекта финансового мониторинга" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr4}
                                    onChange={event => {
                                        setAOr4(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {fourthFilter == 'operNumber' && (
                    <>
                        <TextField value={value4} onChange={event => (set4(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Номер операции" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr4}
                                    onChange={event => {
                                        setAOr4(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {fourthFilter == 'memberMaincode' && (
                    <>
                        <TextField value={value4} onChange={event => (set4(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Покупателя" variant="outlined" />
                        <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                            <InputLabel id="demo-simple-select-label">И/ИЛИ</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select-label"
                                    label = "И/ИЛИ"                                
                                    value={aOr4}
                                    onChange={event => {
                                        setAOr4(event.target.value)
                                    }}
                                    MenuProps={MenuProps}
                                    >
                                        <MenuItem value={'none'}>...</MenuItem>
                                        <MenuItem value={'and'}>И</MenuItem>
                                        <MenuItem value={'or'}>ИЛИ</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                {aOr4 !== 'none' && (
                    <FormControl size= "small" sx={{ m: 1, width: '90%' }} style={{ margin: '0 auto', marginBottom: '15px'}}>
                        <InputLabel id="demo-simple-select-label">Фильтр</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select-label"
                            label = "Фильтр"                                
                            value={fifthFilter}
                            onChange={handleFifth}
                            MenuProps={MenuProps}
                            >
                                <MenuItem value={'cfmMainCode'}>ИИН/БИН Субъекта</MenuItem>
                                <MenuItem value={'messNumber'}>Внутренний для СФМ номер сообщения</MenuItem>
                                <MenuItem value={'cfmName'}>Наименование субъекта</MenuItem>
                                <MenuItem value={'operNumber'}>Номер операции</MenuItem>
                                <MenuItem value={'memberMaincode'}>ИИН/БИН Покупателя</MenuItem>
                        </Select>
                    </FormControl>
                )}

                {/* FIFTH VALUE ********************************************************* */}
                {fifthFilter == 'cfmMainCode' && (
                    <>
                        <TextField value={value5} onChange={event => (set5(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Субъекта" variant="outlined" />
                    </>
                )}
                {fifthFilter == 'messNumber' && (
                    <>
                        <TextField value={value5} onChange={event => (set5(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Внутренний для СФМ номер сообщения" variant="outlined" />
                    </>
                )}
                {fifthFilter == 'cfmName' && (
                    <>
                        <TextField value={value5} onChange={event => (set5(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Код субъекта финансового мониторинга" variant="outlined" />
                    </>
                )}
                {fifthFilter == 'operNumber' && (
                    <>
                        <TextField value={value5} onChange={event => (set5(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="Номер операции" variant="outlined" />
                    </>
                )}
                {fifthFilter == 'memberMaincode' && (
                    <>
                        <TextField value={value5} onChange={event => (set5(event.target.value))} size= "small" sx={{width: '90%', p: 0}} style={{ margin: '0 auto', marginBottom: '15px'}} InputLabelProps={{style: labelStyle}} id="outlined-basic" label="ИИН/БИН Покупателя" variant="outlined" />
                    </>
                )}

                {firstFilter.length > 0 && (
                    <>

                    <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end', width: '90%'}}>
                        <Button
                            sx={{
                                height: '34px',
                                backgroundColor: "#33B6FF",
                                color: 'white',
                                width: '100px',
                            }}
                            variant="contained"
                            onClick={() => {
                                setPage(0)
                                getData()
                            }}
                            >
                            {!loading && (
                                <span style={{ fontWeight: '600' }} className='buttonSearch'>Запрос</span>
                                )}
                            {loading && (
                                <span style={{ fontWeight: '600' }} className='buttonSearch'>Отмена</span>
                                )}
                        </Button>
                    </div>
                                </>
                )}
            </div>
            <div className="tableBlock">
                <div className="tableSam">
                    {loading && (
                        <Box sx={{ width: '100%' }}>
                        <LinearProgress />
                        </Box>
                    )}
                    {!loading && (
                        <ResultTable list={mainList}/>
                        )}
                </div>
                {!loading && (
                    <>
                    <div style={{display: 'flex', justifyContent: 'flex-start', float: 'right', marginRight: '5%'}}>
                        <TableFooter >
                            <TableRow >
                                <TablePagination style={{borderBottom: 'hidden'}}
                                    colSpan={3}
                                    count={count}
                                    rowsPerPage={10}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    ActionsComponent={TablePaginationActions}
                                    rowsPerPageOptions={10}
                                    />
                            </TableRow>
                        </TableFooter>
                        </div>
                    {/* <div style={{ marginTop: '100px', display: 'flex', justifyContent: 'flex-end', width: '95%'}}>
                        <IconButton onClick={download} aria-label="download" size="large">
                        <FileDownloadIcon fontSize="inherit" />
                        </IconButton>
                    </div> */}
                    </>
                )}
            </div>
        </div>
        </ThemeProvider>
    )
}


function ResultTable(props) {
    const {list} = props
    const downloadSchema = (row) => {

        axios.get('http://10.202.20.92:9091/export-to-pdf/' + row.messOfmId + '/' + row.memberId, {responseType: 'blob'}).then(res=> {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'document.pdf')
            document.body.appendChild(link)
            link.click()
        }) 
    }
  
    return ( <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, whiteSpace: 'nowrap' }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                <TableCell  sx={{  whiteSpace: 'nowrap', position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#0D0F11'}}></TableCell>
                {Object.values(dictionaryOfTable).map((column) => (
                    <TableCell sx={{ whiteSpace: 'nowrap' }}  key={column}>{column}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {list.map((row, index) => (
                    <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >

                    <TableCell  sx={{ position: 'sticky', left: 0, zIndex: 1, backgroundColor: '#0D0F11'}}><p style={{cursor: 'pointer'}} onClick={() => downloadSchema(row)}>Скачать</p></TableCell>
                    <TableCell  component="th" scope="row">{row.messOfmId}</TableCell>
                    <TableCell align="right">{row.messNumber}</TableCell>
                    <TableCell align="right">{row.messDate}</TableCell>
                    <TableCell align="right">{row.messType}</TableCell>
                    <TableCell align="right">{row.operStatus}</TableCell>
                    <TableCell align="right">{row.messReason}</TableCell>
                    <TableCell align="right">{row.cfmCode}</TableCell>
                    <TableCell align="right">{row.cfmName}</TableCell>
                    <TableCell align="right">{row.cfmMainCode}</TableCell>
                    <TableCell align="right">{row.cfmSeatArea}</TableCell>
                    <TableCell align="right">{row.cfmSeatRegion}</TableCell>
                    <TableCell align="right">{row.cfmSeatCity}</TableCell>
                    <TableCell align="right">{row.cfmSeatStreet}</TableCell>
                    <TableCell align="right">{row.cfmSeatHouse}</TableCell>
                    <TableCell align="right">{row.cfmSeatOffice}</TableCell>
                    <TableCell align="right">{row.cfmSeatPostcode}</TableCell>
                    <TableCell align="right">{row.cfmIsac}</TableCell>
                    <TableCell align="right">{row.docType}</TableCell>
                    <TableCell align="right">{row.cfmDocNumber}</TableCell>
                    <TableCell align="right">{row.cfmDocSeries}</TableCell>
                    <TableCell align="right">{row.cfmDocWhom}</TableCell>
                    <TableCell align="right">{row.cfmDocDate}</TableCell>
                    <TableCell align="right">{row.operNumber}</TableCell>
                    <TableCell align="right">{row.operType}</TableCell>
                    <TableCell align="right">{row.operPaymentPurpose}</TableCell>
                    <TableCell align="right">{row.operMembersCount}</TableCell>
                    <TableCell align="right">{row.currencyType}</TableCell>
                    <TableCell align="right">{row.operTengeAmount}</TableCell>
                    <TableCell align="right">{row.operReason}</TableCell>
                    <TableCell align="right">{row.operDocDate}</TableCell>
                    <TableCell align="right">{row.operDocNumber}</TableCell>
                    <TableCell align="right">{row.suspFirst}</TableCell>
                    <TableCell align="right">{row.suspSecond}</TableCell>
                    <TableCell align="right">{row.suspThird}</TableCell>
                    <TableCell align="right">{row.operDopInfo}</TableCell>
                    <TableCell align="right">{row.memberId}</TableCell>
                    <TableCell align="right">{row.memberVid}</TableCell>
                    <TableCell align="right">{row.memberResidence}</TableCell>
                    <TableCell align="right">{row.memberResidenceCountrycode}</TableCell>
                    <TableCell align="right">{row.memberType}</TableCell>
                    <TableCell align="right">{row.memberForeign}</TableCell>
                    <TableCell align="right">{row.memberBankCode}</TableCell>
                    <TableCell align="right">{row.memberBankName}</TableCell>
                    <TableCell align="right">{row.memberBankAccount}</TableCell>
                    <TableCell align="right">{row.memberBankAddress}</TableCell>
                    <TableCell align="right">{row.memberUrName}</TableCell>
                    <TableCell align="right">{row.memberUrFistHeadName}</TableCell>
                    <TableCell align="right">{row.memberOked}</TableCell>
                    <TableCell align="right">{row.memberMaincode}</TableCell>
                    <TableCell align="right">{row.memberAcFirstName}</TableCell>
                    <TableCell align="right">{row.memberAcSecondName}</TableCell>
                    <TableCell align="right">{row.memberAcMiddlename}</TableCell>
                    <TableCell align="right">{row.memberAcDocType}</TableCell>
                    <TableCell align="right">{row.memberAcDocSeries}</TableCell>
                    <TableCell align="right">{row.memberAcDocWhom}</TableCell>
                    <TableCell align="right">{row.memberAcDocDate}</TableCell>
                    <TableCell align="right">{row.memberAcBirthDate}</TableCell>
                    <TableCell align="right">{row.memberAcBirthPlace}</TableCell>
                    <TableCell align="right">{row.memberRegArea}</TableCell>
                    <TableCell align="right">{row.memberRegRegion}</TableCell>
                    <TableCell align="right">{row.memberRegSity}</TableCell>
                    <TableCell align="right">{row.memberRegStreet}</TableCell>
                    <TableCell align="right">{row.memberRegHouse}</TableCell>
                    <TableCell align="right">{row.memberRegOffice}</TableCell>
                    <TableCell align="right">{row.memberPhone}</TableCell>
                    <TableCell align="right">{row.memberEmail}</TableCell>
                    <TableCell align="right">{row.memberSeatArea}</TableCell>
                    <TableCell align="right">{row.memberSeatRegion}</TableCell>
                    <TableCell align="right">{row.memberSeatSity}</TableCell>
                    <TableCell align="right">{row.memberSeatStreet}</TableCell>
                    <TableCell align="right">{row.memberSeatHouse}</TableCell>
                    <TableCell align="right">{row.memberSeatOffice}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}
// interface TablePaginationActionsProps {
//     count: number;
//     page: number;
//     rowsPerPage: number;
//     onPageChange: (
//       event: React.MouseEvent<HTMLButtonElement>,
//       newPage: number,
//     ) => void;
//   }
  
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        {/* <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton> */}
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        {/* <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton> */}
      </Box>
    );
  }
export default OracleTable
