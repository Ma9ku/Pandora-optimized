import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigation } from 'react-router-dom';
import { ButtonGroup } from '@mui/material';
import {Button} from '@mui/material';

import queryString from 'query-string';


const tdStyle = {
    color: "#fff",
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '10px'
}

const thStyle = {
    fontFamily: 'Ubuntu',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: "15px",
    lineHeight: "10px",
    color: "#6D6D6D",

    border: 0,
}

function SearchedTable(props) {
  // const history = useHistory()

  const hanC = (iin) => {
    const string = queryString.stringify({iin: iin})
    const url = `/itap?${string}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const resultDisplay = () => {
    if (props.result == null || props.result.length == 0) {
        return (
          <TableRow
            sx={{ 'td, th': { border: 0},}}
          >
            <TableCell className="zeroResult" colSpan={4} align='center' style={{ borderBottom: 'hidden'}}><a style={{fontSize: '14px',  fontWeight: 400, color: 'white'}}>Нет результатов</a></TableCell>
          </TableRow>
          
        )
    } else {
      return props.result.map((row, index) => (
        <TableRow hover
          size="small"
          key={index}
          sx={{ 'td, th': { border: 0 }, height: '0px'}}
          onClick={() => props.selectPhoto(row.photo)}
        >
          <TableCell sx={tdStyle} style= {{ borderRadius: '3px 0px 0 3px '}}component="td" scope="row">
            {index+1}
          </TableCell>
          <TableCell sx={tdStyle} align="left">{row.last_name} {row.first_name} {row.patronymic}</TableCell>
          <TableCell sx={tdStyle} align="left">{row.iin}</TableCell>
          <TableCell sx={tdStyle} align="left" style={{
              // display: 'flex',
              // flexDirection: 'row',
              // gap: '10px',
              // alignItems: 'center',
              borderRadius: '0 3px 3px 0'
          }}>
            {row.iin != '' && row.iin != null ? (
              <ButtonGroup
              variant='outlined'
              aria-label='outlined-button-group'>
                    <Button onClick={() => {
                      const url = `/profiler/person/` + row.iin
                      window.open(url, '_blank', 'noopener,noreferrer')
                    }}>Профиль</Button>
                    <Button onClick={() => {
                      const string = queryString.stringify({object: row.iin, type: "fl"})
                      const url = `/itap?${string}`
                      window.open(url, '_blank', 'noopener,noreferrer')
                    }}>Связи</Button>
              </ButtonGroup>
              ) : (
                <></>
              )}
            </TableCell>
        </TableRow>
      ))
    }
  }
    return (
        <TableContainer component={Paper} sx={{border: 0, boxShadow: 'none', borderRadius: 0, backgroundColor: "#6D6D6D"}}>
          <Table sx={{minWidth: 650, background: "#0D0F11"}} style={{borderBottom: 'hidden'}} aria-label="simple table">
            <TableHead>
              <TableRow style={{height: '40px'}}>
                <TableCell sx={thStyle} style={{width: '5%', fontWeight: 500, color: "#6D6D6D" }}>№</TableCell>
                <TableCell sx={thStyle} style={{width: '60%', fontWeight: 500, color: "#6D6D6D"  }} align="left"><span>ФИО</span></TableCell>
                <TableCell sx={thStyle} style={{width: '15%', fontWeight: 500, color: "#6D6D6D" }} align="left"><span>ИИН</span></TableCell>
                <TableCell sx={thStyle} style={{width: '20%', fontWeight: 500, color: "#6D6D6D" }} align="left"><span>Действие</span></TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{}}>
              {resultDisplay()}
            </TableBody>
          </Table>
        </TableContainer>
    );
}

export default SearchedTable;