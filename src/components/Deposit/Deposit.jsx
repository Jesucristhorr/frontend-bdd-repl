import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  Button,
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

  container: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    minHeight: "90vh",
  },

  gray: {
    color: "#404040",
  },

  textField: {
    margin: theme.spacing(1),
    color: "#404040",
  },

  button: {
    width: "27ch",
  },
}));

function Deposit(props) {
  const classes = useStyles();
  const [user, setUser] = useState({});
  const [openS, setOpenS] = React.useState(false);
  const [openE, setOpenE] = React.useState(false);
  const [btnDisabled, setBtnDisabled] = React.useState(false);
  const [form, setForm] = useState({
    cuenta: "",
    monto: 0,
  });

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    setUser(localUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setBtnDisabled(true);
      await axios.post(`http://localhost:3000/api/v1/transactions/`, {
        cedula: user.cedula,
        numCuenta: form.cuenta,
        tipo: "DEPÓSITO",
        monto: form.monto,
      });

      setOpenS(true);

      setForm({
        cuenta: "",
        monto: 0,
      });

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
          El depósito se realizó con éxito.
        </Alert>
      </Snackbar>

      <Snackbar open={openE} autoHideDuration={6000} onClose={handleCloseE}>
        <Alert onClose={handleCloseE} severity="error">
          El depósito no se pudo realizar.
        </Alert>
      </Snackbar>
      <Paper className={classes.paper} elevation={3}>
        <Grid container justify="center" direction="column">
          <form onSubmit={handleSubmit}>
            <Grid item container justify="center">
              <Grid item>
                <Typography className={classes.gray} variant="h6">
                  Ingresa la cuenta a depositar:
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.textField}
                  id="cuenta"
                  name="cuenta"
                  value={form.cuenta}
                  placeholder="Ej.: 1234567890"
                  onChange={handleChange}
                  required
                />
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
                    style={{
                      background: "#54FFA2",
                      color: "white",
                      fontStyle: "bold",
                    }}
                  >
                    DEPOSITAR
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </div>
  );
}

export default Deposit;
