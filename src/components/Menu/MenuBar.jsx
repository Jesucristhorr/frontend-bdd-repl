import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, List, ListItem, ListItemIcon, ListItemText, Drawer, Divider, Avatar } from '@material-ui/core';
import { Menu, Home, ExitToApp } from '@material-ui/icons';
import Codefilia from '../../assets/Codefilia.svg';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Deposit from '../../assets/cheque.svg';
import Withdraw from '../../assets/retirar.svg';
import Transfer from '../../assets/transferir.svg';

const useStyle = makeStyles(() => ({
    links: {
      textDecoration: "none",
      color: "inherit",
    },

}));

function MenuBar() {

    const classes = useStyle();

    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const drawer = (
        <div>
          <List style={{ background: "#404040", color: "#ffffff", width:"230px" }}>
            <ListItem>
              <Avatar>R</Avatar>
              <Typography style={{padding:"1rem"}}>Raúl Cedeño</Typography>
            </ListItem>
          </List>
          <Divider/>
          <List style={{ background: "#ffffff", color: "#404040" }}>
            <Link to={{ pathname: "/Home" }} className={classes.links}>
              <ListItem button>
                <ListItemIcon style={{ color: "#404040" }}>
                  {" "}
                  <Home />{" "}
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            <Link to={{ pathname: "/Deposit" }} className={classes.links}>
              <ListItem button>
                <ListItemIcon style={{ color: "#404040" }}>
                  {" "}
                  <img src={Deposit} alt="logo" width="25px" height="25px"/>{" "}
                </ListItemIcon>
                <ListItemText primary="Depósito" />
              </ListItem>
            </Link>
            <Link to={{ pathname: "/Withdraw" }} className={classes.links}>
              <ListItem button>
                <ListItemIcon style={{ color: "#404040" }}>
                  {" "}
                  <img src={Withdraw} alt="logo" width="25px" height="25px"/>{" "}
                </ListItemIcon>
                <ListItemText primary="Retiro" />
              </ListItem>
            </Link>
            <Link to={{ pathname: "/Transfer" }} className={classes.links}>
              <ListItem button>
                <ListItemIcon style={{ color: "#404040" }}>
                  {" "}
                  <img src={Transfer} alt="logo" width="25px" height="25px"/>{" "}
                </ListItemIcon>
                <ListItemText primary="Transferencias" />
              </ListItem>
            </Link>
            <Link to={{ pathname: "/" }} className={classes.links}>
              <ListItem button>
                <ListItemIcon style={{ color: "#404040" }}>
                  {" "}
                  <ExitToApp/>{" "}
                </ListItemIcon>
                <ListItemText primary="Cerrar Sesión" />
              </ListItem>
            </Link>
          </List>
        </div>
    );

    return ( 
        <div>
            <AppBar position = "static" style = {{ background:"#ffffff", color:"#404040" }}>
                <Toolbar>
                    <IconButton onClick={handleDrawerOpen} edge = "start" aria-label = "menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant = "h5" style={{ flexGrow: 1, textAlign: "center" }}> 
                        BANCO
                    </Typography>
                    <img src={Codefilia} alt="logo" width="150px" height="70px" />
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
                {drawer}
            </Drawer>                
        </div>
    );
}
 
export default MenuBar;