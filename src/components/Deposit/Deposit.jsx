import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Menu from '../Menu/MenuBar';
import { Paper, Typography, Grid, TextField, InputAdornment, Button } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      width: 300,
      minHeight: "auto",
      display: "flex"
    },
  
    gray:{
      color: "#404040"
    },
  
    textField: {
        margin: theme.spacing(1),
        color: "#404040"
    },
  
    button: {
      width: '27ch'
    }
  
}));


function Deposit(){ 

    const classes = useStyles();

    return ( 
        <div>
            <Menu/>
            <Paper className={classes.paper} elevation={3}>
                <Grid container justify="center" direction="column">
                    <Grid item container justify="center">
                        <Typography className={classes.gray}>Ingresa la cuenta a depositar:</Typography>
                        <Grid item>
                            <TextField 
                                className={classes.textField} 
                                id="depositAcount" 
                                placeholder="Ej.: 1234567890"  
                                required/>
                        </Grid>
                        <Grid item>
                            <TextField 
                                style={{width:"15ch"}}
                                id="depositAmount"
                                label="Cantidad"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment className={classes.gray} >
                                            <AttachMoney/>
                                        </InputAdornment>
                                    )
                                }}
                                placeholder="0,00"
                                size="normal"                        
                            />
                        </Grid>
                        <Grid item>
                            <div style={{ margin: "1rem" }}>
                                <Button
                                    className={classes.button} 
                                    variant="contained" 
                                    name="deposit" 
                                    size="small" 
                                    style={{ background: "#54FFA2", color: "white", fontStyle:"bold"}}
                                >
                                    DEPOSITAR
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>        

        </div>

    );
}
 
export default Deposit;