import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, TextField, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import Menu from '../Menu/MenuBar';
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
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: '25ch',
    },
  
}));

function Withdraw(){ 
    
    const classes = useStyles();
    const [account, setAccount] = React.useState('');

    const handleChange = (event) => {
        setAccount(event.target.value);
    };

    return ( 
        <div>
            <Menu/>
            <Paper className={classes.paper} elevation={3}>
                <Grid container justify="center" direction="column">
                    <Grid item container justify="center">
                        <Grid item>
                            <Typography className={classes.gray} variant="h6">Escoge tu cuenta:</Typography>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="account">Cuenta</InputLabel>
                                <Select
                                    labelId="selectAccount-label"
                                    id="selectAccount"
                                    value={account}
                                    onChange={handleChange}
                                >
                                    <MenuItem>Ahorros</MenuItem>
                                    <MenuItem>Corriente</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <TextField 
                                style={{width:"15ch"}}
                                id="withdrawAmount"
                                label="Cantidad"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment>
                                            <AttachMoney className={classes.gray} />
                                        </InputAdornment>
                                    )
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
                                    style={{ background: "#54FFA2", color: "white"}}
                                >
                                    RETIRAR
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>        
        </div>
    );
}
 
export default Withdraw;