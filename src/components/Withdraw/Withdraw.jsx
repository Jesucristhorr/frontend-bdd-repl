import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";
import axios from "axios";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    width: 300,
    minHeight: "auto",
    display: "flex",
  },

  gray: {
    color: "#404040",
  },

  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    minHeight: "90vh",
  },

  textField: {
    margin: theme.spacing(1),
    color: "#404040",
  },

  button: {
    width: "27ch",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: "25ch",
  },
}));

function Withdraw() {
  const classes = useStyles();
  const [user, setUser] = React.useState({});
  const [cuentas, setCuentas] = React.useState([]);
  const [openS, setOpenS] = React.useState(false);
  const [openE, setOpenE] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [form, setForm] = React.useState({
    cuenta: "",
    monto: 0,
  });

  const fetchCuentas = async (cedula) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/accounts/${cedula}`
    );

    setCuentas(response.data.body);
  };

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    setUser(localUser);

    fetchCuentas(localUser.cedula);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);
      await axios.post(`http://localhost:3000/api/v1/transactions/`, {
        cedula: user.cedula,
        numCuenta: form.cuenta,
        tipo: "RETIRO",
        monto: form.monto,
      });

      setOpenS(true);

      setForm({
        cuenta: "",
        monto: 0,
      });

      fetchCuentas(user.cedula);

      setBtnDisabled(false);
    } catch (err) {
      console.error(err);

      setOpenE(true);

      setBtnDisabled(false);
    }
  };

  const handleCloseS = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenS(false);
  };

  const handleCloseE = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenE(false);
  };

  return (
    <div className={classes.container}>
      <Snackbar open={openS} autoHideDuration={6000} onClose={handleCloseS}>
        <Alert onClose={handleCloseS} severity="success">
          El retiro se realizó con éxito.
        </Alert>
      </Snackbar>

      <Snackbar open={openE} autoHideDuration={6000} onClose={handleCloseE}>
        <Alert onClose={handleCloseE} severity="error">
          El retiro no se pudo realizar.
        </Alert>
      </Snackbar>
      <Paper className={classes.paper} elevation={3}>
        <form onSubmit={handleSubmit}>
          <Grid container justify="center" direction="column">
            <Grid item container justify="center">
              <Grid item>
                <Typography className={classes.gray} variant="h6">
                  Escoge tu cuenta:
                </Typography>
              </Grid>
              <Grid item>
                <FormControl className={classes.formControl}>
                  <InputLabel id="account">Cuenta</InputLabel>
                  <Select
                    labelId="selectAccount-label"
                    id="cuenta"
                    name="cuenta"
                    value={form.cuenta}
                    onChange={handleChange}
                  >
                    {cuentas.map(({ numCuenta, tipo, saldo }) => (
                      <MenuItem key={numCuenta} value={numCuenta}>
                        {tipo} - {numCuenta} | ${saldo}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  style={{ width: "15ch" }}
                  id="monto"
                  name="monto"
                  label="Cantidad"
                  value={form.monto}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <AttachMoney className={classes.gray} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="0,00"
                  size="medium"
                />
              </Grid>
              <Grid item>
                <div style={{ margin: "1rem" }}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    name="deposit"
                    size="medium"
                    type="submit"
                    disabled={btnDisabled}
                    style={{ background: "#54FFA2", color: "white" }}
                  >
                    RETIRAR
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default Withdraw;
