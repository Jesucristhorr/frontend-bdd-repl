import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Grid, TextField, InputAdornment, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { AttachMoney } from '@material-ui/icons';
import Menu from '../Menu/MenuBar';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: "auto",
      maxWidth: 350,
      minWidth: 250,
      minHeight: "auto",
      display: "flex"
    },
  
    gray:{
      color: "#404040"
    },
  
    textField: {
        margin: theme.spacing(1),
        color: "#404040",
        width: '30ch'
    },
  
    button: {
      width: '30ch'
    },

    formControl: {
        margin: theme.spacing(1),
        minWidth: '30ch',
    },
  
}));

function Transfer(){
    
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
                        <Grid>
                            <Typography style={{color:"#7FBDFF", marginTop:"1rem"}} variant="h6">Beneficiario</Typography>
                        </Grid>
                        <Grid item container justify="center">
                            <TextField 
                                className={classes.textField}
                                id="beneficiaryId"
                                label="Cédula"
                                placeholder="Ej.: 1301234560"
                            />
                            <TextField 
                                className={classes.textField}
                                id="beneficiaryAccount"
                                label="Nro. de cuenta"
                                placeholder="Ej.: 1234567890"
                            />
                            <Typography style={{color:"#404040", marginTop:"0.5rem", fontStyle:"italic"}}>Concepto (opcional)</Typography>
                            <TextField 
                                className={classes.textField}
                                id="transferConcept"
                                placeholder="Máx. 120 caracteres"
                                multiline
                            />
                        </Grid>
                        <Grid item>
                            <TextField 
                                style={{width:"15ch", marginTop:"0.5rem"}}
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
                                    TRANSFERIR
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>        
        </div>
    );
}
 
export default Transfer;