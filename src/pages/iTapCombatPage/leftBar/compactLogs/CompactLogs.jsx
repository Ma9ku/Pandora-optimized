import React, {useState, useEffect} from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
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
import TablePagination from '@mui/material/TablePagination';
import defaultURL from '../../../../data/baseURL';
import '../spinner.scss'

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

function createData(date, body, depth, limit, relations, type) {
  return {
    date,
    body,
    depth,
    limit,
    relations,
    type,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.body}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Данные
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Лимит</TableCell>
                    <TableCell align="right">Уровень</TableCell>
                    <TableCell>Связи</TableCell>
                    <TableCell align="right">Тип</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.limit}</TableCell>
                    <TableCell align="right">{row.depth}</TableCell>
                    <TableCell>{row.relations}</TableCell>
                    <TableCell align="right">{row.type}</TableCell>
                  </TableRow>

                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


const rows = [
  createData('25.10.2023', '040205551504', '1', '20', 'BERKUT', 'flfl'),
];

export default function CompactLogs() {
  const [page, setPage] = React.useState(0);
  const [rows, setRows] = React.useState([])
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [loading, setLoading] = useState(true)
  const userSession = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + userSession.accessToken
    axios.get(`${defaultURL}/main/getCurrUserDetails`).then(res=> {
        console.log(res.data.logs)
        const array = res.data.logs.map(x => {
            return {
                requestData: x.obwii,
                date: x.date.slice(0, 10)
            }
        })
        console.log(array)
        setLoading(false)
        setRows(array)
    })
  }, [])
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
  };
  if (loading) {

    return (
      <div className="history-loader-wrapper">
          <span class="history-loader"></span>
          <a>Подождите...</a>
      </div>
    )
  } else {
    return (
      <Paper sx={{ width: '100%', margin: '0 auto', overflow: 'visible', backgroundColor: '#F2F0EE', boxShadow: 'none' }}>
        <TableContainer sx={{ maxHeight: 800 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={{backgroundColor: '#0D0f11'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                        <TableCell sx={{backgroundColor: '#0D0f11'}}>
                            {row.requestData}
                        </TableCell>
                        <TableCell sx={{backgroundColor: '#0D0f11'}}>
                            {row.date}
                        </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination sx={{backgroundColor: '#0D0f11'}}
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}
const columns = [
  { id: 'requestData', label: 'Объект', maxWidth: 40 },
  { id: 'date', label: 'Дата', minWidth: 40 },
];

