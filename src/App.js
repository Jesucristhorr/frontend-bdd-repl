import React from 'react';
import { Paper, Grid, TextField, FormControl, InputLabel, Input, InputAdornment, IconButton, Button, Typography } from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff, VpnKey } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import Codefilia from './assets/Codefilia.svg' 
import JAR from './assets/JAR.svg'
import './App.css';

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

  gray:{
    color: "#404040"
  },

  textField: {
    width: '23ch',
  },

  button: {
    width: '28ch'
  }

}));


function App() {
  
  const classes = useStyles();
  
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  
  return (
    <div>
      <Paper className= {classes.paper} elevation= {3} >
        <Grid container justify="center" direction="column">
          <Grid item container justify="center">
            <img src={Codefilia} alt="logo" width="250px" height="70px"/>
            <div className={classes.margin}>
              <Grid 
              container 
              className={classes.gray} 
              spacing={1} 
              alignItems="flex-end"
              >
                <Grid item>
                  <AccountCircle/>
                </Grid>
                <Grid item>
                  <TextField id= "user" label= "Usuario" size="small"/>
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
                  <VpnKey/>
                </Grid>
                <Grid item>
                  <FormControl className={(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                    <Input
                      id="password"
                      type={values.showPassword ? 'text' : 'password'}
                      value={values.password}
                      onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
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
                style={{ background: "#7FBDFF", color: "white"}}
                >
                  INGRESAR
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid item container justify="center">
            <Typography style={{fontSize:"10px", color:"#404040"}}>
              Developed by:
            </Typography>
          </Grid>
          <Grid item container justify="center">
            <img src={JAR} alt="logo2" width="125px" height="35px"/>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default App;