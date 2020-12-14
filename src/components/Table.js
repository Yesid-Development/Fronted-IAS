import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import _ from 'lodash';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const CalculatorTable = ({ receiveData, state, search, setSearch }) => {
  const classes = useStyles();

  useEffect(() => {
    receiveData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    if (_.isEmpty(e.target.value)) {
      setSearch({
        ...search,
        data: state.data,
      });
    } else {
      let searchData = state.data.filter((item) => {
        if (item.idTechnician.toString().includes(e.target.value)) {
          return item;
        } else {
          return null;
        }
      });
      setSearch({
        ...search,
        data: searchData,
      });
    }
  };

  return (
    <>
      <div className="row mb-3">
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
            {search.data.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left">{row.idTechnician}</TableCell>
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
