import React from "react";
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  VpnKey,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Codefilia from "./assets/Codefilia.svg";
import JAR from "./assets/JAR.svg";
import "./App.css";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    mariginTop: "auto",
    margin: "auto",
    maxWidth: 300,
    minWidth: 200,
    minHeight: "auto",
  },

  margin: {
    margin: theme.spacing(1),
  },

  gray: {
    color: "#404040",
  },

  textField: {
    width: "23ch",
  },

  button: {
    width: "28ch",
  },

  container: {
    display: "flex",
    minHeight: "100vh",
    justifyContent: "center",
    alignContent: "center",
  },
}));

function App(props) {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    user: "",
    password: "",
    showPassword: false,
    errors: {
      user: "",
      password: "",
    },
  });

  React.useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    if (localUser) {
      props.history.push({
        pathname: "/menu/home",
        state: { user: localUser },
      });
    }
  }, [props.history]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const errors = values.errors;
    switch (name) {
      case "user":
        errors.user = !value.match(/^[a-zA-Z0-9]{4,}/i)
          ? "Mínimo 4 caracteres y/o números."
          : "";
        break;
      case "password":
        errors.password = !value.match(/[.\s\S\d\D\w\W]{4,}/i)
          ? "Contraseña mayor o igual a 4 dígitos."
          : "";
        break;
      default:
        break;
    }

    setValues({ ...values, errors, [name]: value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateForm(values.errors)) {
        const response = await Axios.post(
          "http://localhost:3000/api/v1/users/login",
          {
            username: values.user,
            password: values.password,
          }
        );

        window.localStorage.setItem("user", JSON.stringify(response.data.body));

        props.history.push({
          pathname: "/menu/home",
          state: { user: response.data.body },
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={classes.container}>
      <Paper className={classes.paper} elevation={3}>
        <Grid container justify="center" direction="column">
          <Grid item container justify="center">
            <img src={Codefilia} alt="logo" width="250px" height="70px" />
            <form onSubmit={handleSubmit}>
              <div className={classes.margin}>
                <Grid
                  container
                  className={classes.gray}
                  spacing={1}
                  alignItems="flex-end"
                >
                  <Grid item>
                    <AccountCircle />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="user"
                      name="user"
                      onChange={handleChange}
                      error={values.errors.user.length > 0 ? true : false}
                      helperText={values.errors.user}
                      label="Usuario"
                      size="small"
                    />
                  </Grid>
                </Grid>
              </div>

              <div className={classes.margin}>
                <Grid
                  container
                  className={classes.gray}
                  spacing={1}
                  alignItems="flex-end"
                >
                  <Grid item>
                    <VpnKey />
                  </Grid>
                  <Grid item>
                    <FormControl
                      className={(classes.margin, classes.textField)}
                    >
                      <InputLabel htmlFor="password">Contraseña</InputLabel>
                      <Input
                        id="password"
                        name="password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        error={values.errors.password.length > 0 ? true : false}
                        onChange={handleChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </div>
              <Grid item>
                <div style={{ margin: "1rem" }}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    name="login"
                    size="large"
                    type="submit"
                    style={{ background: "#7FBDFF", color: "white" }}
                  >
                    INGRESAR
                  </Button>
                </div>
              </Grid>
            </form>
          </Grid>
          <Grid item container justify="center">
            <Typography style={{ fontSize: "10px", color: "#404040" }}>
              Developed by:
            </Typography>
          </Grid>
          <Grid item container justify="center">
            <img src={JAR} alt="logo2" width="125px" height="35px" />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;
