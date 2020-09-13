import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "20rem",
    maxWidth: "50rem",
  },
  tableT: {
    minWidth: "20rem",
    maxWidth: "70rem",
    maxHeight: "40rem",
  },
  tableContainer: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  tableTContainer: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  greetingContainer: {
    paddingTop: theme.spacing(8),
    paddingLeft: theme.spacing(16),
    paddingBottom: theme.spacing(3),
    color: "rgb(40, 40, 40)",
  },
  movContainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(3),
    textAlign: "center",
    color: "rgb(40, 40, 40)",
  },
}));

function Home(props) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [cuentas, setCuentas] = useState([]);
  const [transacciones, setTransacciones] = useState([]);

  useEffect(() => {
    const fetchCuentas = async (cedula) => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/accounts/${cedula}`
      );

      setCuentas(response.data.body);
    };

    const fetchTransacciones = async (cedula) => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/transactions/${cedula}`
      );

      setTransacciones(response.data.body);
    };

    const localUser = JSON.parse(window.localStorage.getItem("user"));

    setUser(localUser);

    fetchCuentas(localUser.cedula);
    fetchTransacciones(localUser.cedula);
  }, []);

  return (
    <React.Fragment>
      <div className={classes.greetingContainer}>
        <Typography variant="h4" compontent="p">
          ¡Bienvenido de vuelta, {user.nombres}!
        </Typography>
      </div>
      <div className={classes.tableContainer}>
        <TableContainer className={classes.table} component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Número de cuenta</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Saldo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cuentas.map(({ numCuenta, tipo, saldo }) => (
                <TableRow hover key={numCuenta}>
                  <TableCell component="th" scope="row">
                    {numCuenta}
                  </TableCell>
                  <TableCell align="right">{tipo}</TableCell>
                  <TableCell align="right">${saldo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className={classes.movContainer}>
        <Typography variant="h4" compontent="p">
          Movimientos
        </Typography>
      </div>
      <div className={classes.tableTContainer}>
        <TableContainer className={classes.tableT} component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Número de cuenta</TableCell>
                <TableCell align="right">Tipo</TableCell>
                <TableCell align="right">Usuarios afectados</TableCell>
                <TableCell align="right">Cuentas afectadas</TableCell>
                <TableCell align="right">Concepto</TableCell>
                <TableCell align="right">Monto</TableCell>
                <TableCell align="right">Fecha</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transacciones.map(
                ({
                  idTransaccion,
                  numCuenta,
                  tipo,
                  nombresUsuariosAfectados,
                  numCuentasAfectadas,
                  concepto,
                  monto,
                  fechaTransaccion,
                }) => (
                  <TableRow hover key={idTransaccion}>
                    <TableCell component="th" scope="row">
                      {idTransaccion}
                    </TableCell>
                    <TableCell align="right">{numCuenta}</TableCell>
                    <TableCell align="right">{tipo}</TableCell>
                    <TableCell align="right">
                      {nombresUsuariosAfectados}
                    </TableCell>
                    <TableCell align="right">{numCuentasAfectadas}</TableCell>
                    <TableCell align="right">{concepto}</TableCell>
                    <TableCell align="right">${monto}</TableCell>
                    <TableCell align="right">
                      {new Date(fechaTransaccion).toLocaleString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour12: false,
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZone: "America/Guayaquil",
                      })}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}

export default Home;
