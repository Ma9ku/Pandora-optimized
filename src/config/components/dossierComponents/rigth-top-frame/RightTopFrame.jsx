import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './rightTopFrame.scss'

import {Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ButtonGroup } from '@mui/material';
import {Button} from '@mui/material';
import queryString from 'query-string';


function RightTopFrame(props) {
  const soc = ''
  const [relatives, setRelatives] = useState([])
  useEffect(() => {
    setRelatives(props.relatives)
  }, [soc])


    const displayData = () => {
        return (
            <div >
                <span>Нет данных</span>
            </div>
        )
    }
    return ( 
        
        <div className="right-top-section">
            <div className="other-line">
                <div>
                    <label htmlFor="born-city" style={{fontSize: '16px', fontWeight: '500', color: "#FFFFFF"}}>Родственники <span className='schema-button' onClick={() => {props.setHierarchy(true)}}>Схема</span></label>
          
                    <TableContainer sx={{marginTop: '10px'}}>
                        <Table aria-label="collapsible table" className="uitable">
                            <TableHead>
                            <TableRow className="uitableHead"  style={{borderBottom: 'hidden'}}>
                                <TableCell sx={{padding: 1}} style={{ width: '5%',fontSize: '12px', color: "#6D6D6D"}} align="left"><a>№</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '50%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a className="bumber">ФИО</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '20%', fontSize: '12px', color: "#6D6D6D" }} align="left"><a className="bumber">ИИН</a></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '15%', color: "#6D6D6D" }} align="left"></TableCell>
                                <TableCell sx={{padding: 1}} style={{ width: '10%', color: "#6D6D6D" }} align="left"></TableCell>
                            </TableRow>
                            </TableHead> 
                            <TableBody style={{borderBottom: 'hidden'}}>
                            { relatives?.length>0 ? relatives.map((row, index) => (
                                <Row row={row} index={index} />
                            )): <TableCell  className="zeroResult" align="center" colSpan={4} style={{borderBottom: 'hidden'}}><a>Нет данных</a></TableCell>}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>  
        </div>

    );
}
function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <>
        <TableRow className="uitablerow" sx={{height:'10px',}} style={{borderBottom: 'hidden'}}>
          <TableCell sx={{padding: 1}} style={{fontSize: '12px', fontWeight: 500, color: "#FFFFFF"}}><a>{props.index + 1}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{ width: '60%', paddingLeft: '18px', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }} align="left"><a>{row.parent_fio}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{ paddingLeft: '18px', fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }}><a>{row.parent_iin || '---'}</a></TableCell>
          <TableCell sx={{padding: 1}} style={{fontSize: '12px', fontWeight: 500, color: "#FFFFFF" }}>
            {row.parent_iin ? (

              <ButtonGroup size="small"
              variant='text'
              aria-label='outlined-button-group'>
                    <Button size="small" onClick={() => {
                      const url = `/profiler/person/` + row.parent_iin
                      window.open(url, '_blank', 'noopener,noreferrer')
                    }}>Profile</Button>
                    <Button size="small" onClick={() => {
                      const string = queryString.stringify({object: row.parent_iin, type: "iin"})
                      const url = `/itap?${string}`
                      window.open(url, '_blank', 'noopener,noreferrer')
                    }}>Relations</Button>
              </ButtonGroup>
            ) : (
              <></>
            )}
          </TableCell>
          <TableCell sx={{padding: 1}}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon style={{ fill: '#ffffff' }}/> : <KeyboardArrowDownIcon style={{ fill: '#ffffff' }}/>}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow style={{borderBottom: 'hidden'}}>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, marginLeft: '3.5%' }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D" }}  align="left"><a>ИИН</a></TableCell>
                      <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.iin}</a></TableCell>
                    </TableRow>
                    <TableRow style={{borderBottom: 'hidden'}}>
                      <TableCell style={{ width: '30%', fontSize: '12px', color: "#6D6D6D"}}  align="left"><a>Тип родства</a></TableCell>
                      <TableCell style={{ width: '70%', fontSize: '12px', color: "#FFFFFF" }} align="left"><a>{row.relative_type}</a></TableCell>
                    </TableRow>
                  </TableHead>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  }

function withParams(Component) {
    return props => <Component {...props} username={useParams()} />;
}

export default withParams(RightTopFrame);

// export default RightTopFrame;