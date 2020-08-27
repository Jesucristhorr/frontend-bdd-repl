import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '../Menu/MenuBar';
import { Paper, Typography, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      width: 250,
      minHeight: "auto",
      display: "flex"
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

function Deposit(){ 

    const classes = useStyles();

    return ( 
        <div>
            <Menu/>
            <Paper className={classes.paper} elevation={3}>
                <Grid className={classes.gray} container justify="center" direction="column">
                    <Grid item container justify="center">
                        <Typography>
                            Ingresa el número de cuenta:
                        </Typography>
                        <Grid item>
                            <TextField id="depositAcount" label="Cuenta a depositar" placeholder="Ej.: 1234567890" size="" required/>
                        </Grid>
                    </Grid>

                </Grid>
            </Paper>        
        </div>

    );
}
 
export default Deposit;