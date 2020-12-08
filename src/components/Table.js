import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  idTechnician,
  idService,
  week,
  normalHours,
  nightHours,
  sundayHours,
  normalHoursEx,
  sundayHoursEx,
  total
) {
  return {
    idTechnician,
    idService,
    week,
    normalHours,
    nightHours,
    sundayHours,
    normalHoursEx,
    sundayHoursEx,
    total,
  };
}

const CalculatorTable = () => {
  const classes = useStyles();

  const [state, setState] = useState({
    search: '',
    data: [],
  });

  useEffect(() => {
    receiveData();
  }, []);

  const receiveData = async () => {
    let resp = await fetch('http://localhost:4000/api/show');
    const data = await resp.json();
    validData(data);
    setState({
      ...state,
      data: data,
    });
  };

  const validData = (data) => {
    
    const finalData = data.map((item) => {
      console.log(item);
      const initDate = moment(item.initialDate);
      const endDate = moment(item.finalDate);
      const duration = moment.duration(initDate.diff(endDate));
      const finalObject = {};
      const workHours = endDate.diff(initDate, 'hours');
      console.log('MOment: ', duration.asHours());
      console.log('Otroo: ', initDate.diff(endDate, 'hours'));
      console.log('Cambio: ', endDate.diff(initDate, 'hours'));
      console.log('Day: ', endDate.day());
      console.log('Week: ', endDate.week());
      console.log('Hour: ', endDate.hour());

      // Dias normales
      if (initDate.day() >= 1 && endDate.day() <= 6) {
        if (workHours <= 13 && initDate.hour() != 20) {
          finalObject['normalHours'] = 13;
        } else {
          if (initDate.hour() == 20) {
            finalObject['nightHours'] = endDate.diff(initDate, 'hours');
          }
        }
      } else {
        if (initDate.day() == 0) {
          finalObject['sundayHours'] = endDate.diff(initDate, 'hours');
        }
      }
      finalObject['week'] = initDate.week();
      return finalObject;
    });

    console.log('DataFinal: ', finalData);
  };
  const handleChange = (e) => {
    let search = state.data.filter((item) => {
      if (item.idService.toString().includes(e.target.value)) {
        return item;
      }
    });
    setState({
      ...state,
      data: search,
    });
  };

  return (
    <>
      <div class="row mb-3">
        <div className="col-3">
          <input className="form-control" onKeyUp={handleChange} type="text" />
        </div>
        <div className="col-4">
          <button className="btn btn-info">Buscar</button>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          size="medium"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID tecnico</TableCell>
              <TableCell align="right">ID servicio</TableCell>
              <TableCell align="right">week</TableCell>
              <TableCell align="right">Horas normales</TableCell>
              <TableCell align="right">Horas Nocturanas</TableCell>
              <TableCell align="right">Horas Dominicales</TableCell>
              <TableCell align="right">Horas Normales Extras</TableCell>
              <TableCell align="right">Horas Dominicales Extras</TableCell>
              <TableCell align="right">Total horas</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.data.map((row) => (
              <TableRow key={row.idTechnician}>
                <TableCell align="left">{row.idTechnician}</TableCell>
                <TableCell align="right">{row.idService}</TableCell>
                <TableCell align="right">{row.week}</TableCell>
                <TableCell align="right">{row.normalHours}</TableCell>
                <TableCell align="right">{row.nightHours}</TableCell>
                <TableCell align="right">{row.sundayHours}</TableCell>
                <TableCell align="right">{row.normalHoursEx}</TableCell>
                <TableCell align="right">{row.sundayHoursEx}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CalculatorTable;
