import React, { useEffect, useRef, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { DesktopDateTimePicker } from '@mui/lab'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';

import axios from 'axios';
import { dossierURL } from '../../data/dossier';
import SideBar from '../../components/side-bar';
import './Calendar.scss'

import { grey } from '@mui/material/colors';


const initialFormData = {
  title: '',
  description: '',
  start: dayjs(''),
  end: dayjs('')
};


function CalendarPage(props) {

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };


  const handleSave = async () => {
    const { title, description, start, end } = formData;
    const event = {
      desc:description,
      title,
      start,
      end
    };
    // TODO: Handle saving the eventObject or perform further processing
    console.log(event);
    setFormData(initialFormData);
    axios.post(dossierURL + 'events', event)
    get()
    handleClose();
  };

  const deleteEvent = async (id) => {
    axios.delete(dossierURL + 'event', {params: {id}})
  }
  //dialog window-----------
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setFormData({title: '',
      description: '',
      start: dayjs(''),
      end: dayjs('')});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //------------------------
  let fc_today, fc_next, fc_prev;

  const calendarRef = useRef(null);
  const [events, setEvents] = useState([])
  const [showEvent, setShowEvent] = useState(true)

  const [id, setId] = useState(0)
  const [eventTitle, setEventTitle] = useState("")
  const [eventStart, setEventStart] = useState("")
  const [eventEnd, setEventEnd] = useState("")
  const [eventDesc, setEventDesc] = useState("")

  const get = async () => {
    axios.get(dossierURL + 'events').then(res => {
      setEvents(res.data)
    })
  }
  useEffect(() => {

    get()

    // setEvents(
    //   [
    //     {
    //       id: 1,
    //       start: "2023-05-19",
    //       end: "2023-05-19",
    //       date: "2023-05-19",
    //       title: "One",
    //       desc: "lorem Ipsum lorem ipsum dolor sit amet"
    //     },
    //     {
    //       id: 2,
    //       start: "2023-05-20",
    //       end: "2023-05-21",
    //       title: "ttoooday",
    //       desc: "lorem Ipsum lorem ipsum dolor sit amet"
    //     },
    //   ]
    // );

  }, [])

  const handleDateClick = (arg) => { 
    console.log("dateClick", arg)

    console.log(calendarRef)
  }

  const handleEvents = (events) => {
  }

  const handleEventClick = (e) => {
    let id = e.event.id - 0

    let event = events.filter(item => {
      return item.id === id
    })[0]

    console.log(event)
    setId(event.id)
    setEventTitle(event.title)
    setEventDesc(event.desc)
    setEventStart(event.start)
    setEventEnd(event.end)
  }

  const handleEventDrop = (e) => {
    console.log(e)
  }

  return (
    <div style={{display: 'flex'}}>
      <div style={{}} className='calendarPage'>
        <Dialog open={open} onClose={handleClose}>
          <div style={{padding: '10px', backgroundColor: '#0D0F11', borderRadius: '2px', border: '0.5px solid rgba(134, 134, 134, 0.31)'}}>
            <DialogTitle><a style={{fontWeight: 700, fontSize: '25px'}}>Создать событие</a></DialogTitle>
            <DialogContent>
              <div style={{marginTop: '10px'}}>
                <input
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  name="title"
                  className="dialogInput"
                  placeholder="Название события"/>
                <input
                  type="text"
                  className="dialogInput"
                  name="description"
                  placeholder="Допольнительный текст"
                  value={formData.description}
                  onChange={handleChange}/>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                <div style={{flex: '1'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                        <a style={{fontSize: '16px', color: '#868686'}}>Дата и время начала</a>
                        <MobileDateTimePicker
                          ampm={false}
                          format='YYYY-MM-DD HH:mm'
                          value={formData.start}
                          onChange={(value) => (
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              start: value,
                            }))
                            )
                          } />
                      </div>
                    </LocalizationProvider>
                </div>
                <div  style={{flex: '1'}}>
                    
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
                        <a style={{fontSize: '16px', color: '#868686'}}>Дата и время конца</a>
                        <MobileDateTimePicker
                          ampm={false}
                          format='YYYY-MM-DD HH:mm'
                          value={formData.end}
                          onChange={(value) =>
                            setFormData((prevFormData) => ({
                              ...prevFormData,
                              end: value,
                            }))
                          } />
                      </div>
                    </LocalizationProvider>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Отмена</Button>
              <Button onClick={handleSave}>Сохранить</Button>
            </DialogActions>
          </div>
        </Dialog>
        <div className='calendar-container'>
          <FullCalendar
          
            ref={calendarRef}
            events={events}
            eventsSet={() => handleEvents(events)}
            locale={'ru-RU'}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventContent={renderEventContent}

            headerToolbar={{
              left: "prev,today,next",
              center: "",
              right: "title"
            }}
            buttonText={{
              today: "Сегодня",
              month: "Месяц",
              week: "Неделя",
              day: "День",
              list: "Список"
            }}
            eventDrop={handleEventDrop}
            editable={true}
            // selectMirror={true}
            dayMaxEvents={true}
            weekends={true}
          />
        </div>

        {showEvent ? <div className="events-block">
          <div>
            <Box sx={{
              display: open ? 'none': 'flex',
              // position: 'fixeed',
              // bottom: '20px',
              // right: '20px',
              zIndex: '9999',
              transform: 'translateZ(0px)',
            }}>
              <IconButton style={{fontSize: "50px"}} onClick={handleClickOpen} aria-label="delete" size="large">
                <AddCircleIcon fontSize="inherit" />
              </IconButton>
            </Box>
          </div>

          <div className='event-info'>
            <div className='event-header'>
              <div className='event-date'>
                {eventStart != '' ? 'с ' + eventStart + ' до ' +  eventEnd : '' }
              </div>
              <div className='event-title' style={{paddingTop: '10px'}}><a style={{fontWeight: '700'}}>{eventTitle}</a></div>
            </div>
            <div className="event-body">
              <div className="event-desc"><a style={{fontWeight: '300'}}>{eventDesc}</a></div>
            </div>
            <div className="event-footer">
              {id != 0 ?
                <Button onClick={() => deleteEvent(id)}>Удалить событие</Button> : ""
              }
            </div>
          </div>
        </div> : ""}
      </div>
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      {/* <b>{eventInfo.timeText}</b> */}
      <a>{eventInfo.event.title}</a>
    </>
  )
}

export default CalendarPage;
