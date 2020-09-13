import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Avatar,
} from "@material-ui/core";
import { Menu, Home, ExitToApp } from "@material-ui/icons";
import Codefilia from "../../assets/Codefilia.svg";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Route } from "react-router-dom";
import Deposit from "../../assets/cheque.svg";
import Withdraw from "../../assets/retirar.svg";
import Transfer from "../../assets/transferir.svg";
import HomeR from "../Account/Home";
import DepositR from "../Deposit/Deposit";
import WithdrawR from "../Withdraw/Withdraw";
import TransferR from "../Transfer/Transfer";

const useStyle = makeStyles(() => ({
  links: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function MenuBar(props) {
  const classes = useStyle();

  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem("user"));

    if (!localUser) {
      props.history.push("/");
    } else {
      setUser(localUser);
    }
  }, [props.history]);

  const cerrarSesion = (e) => {
    window.localStorage.removeItem("user");
    props.history.push("/");
  };

  const drawer = (
    <div>
      <List style={{ background: "#404040", color: "#ffffff", width: "230px" }}>
        <ListItem>
          <Avatar>{user.nombres ? user.nombres.charAt(0) : "U"}</Avatar>
          <Typography style={{ padding: "1rem" }}>
            {user.nombres ? user.nombres : "Usuario"}
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <List style={{ background: "#ffffff", color: "#404040" }}>
        <Link
          to={{
            pathname: "/menu/home",
          }}
          className={classes.links}
        >
          <ListItem button onClick={() => setOpen(false)}>
            <ListItemIcon style={{ color: "#404040" }}>
              {" "}
              <Home />{" "}
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>
        </Link>
        <Link
          to={{
            pathname: "/menu/deposit",
          }}
          className={classes.links}
        >
          <ListItem button onClick={() => setOpen(false)}>
            <ListItemIcon style={{ color: "#404040" }}>
              {" "}
              <img src={Deposit} alt="logo" width="25px" height="25px" />{" "}
            </ListItemIcon>
            <ListItemText primary="Depósito" />
          </ListItem>
        </Link>
        <Link
          to={{
            pathname: "/menu/withdraw",
          }}
          className={classes.links}
        >
          <ListItem button onClick={() => setOpen(false)}>
            <ListItemIcon style={{ color: "#404040" }}>
              {" "}
              <img src={Withdraw} alt="logo" width="25px" height="25px" />{" "}
            </ListItemIcon>
            <ListItemText primary="Retiro" />
          </ListItem>
        </Link>
        <Link
          to={{
            pathname: "/menu/transfer",
          }}
          className={classes.links}
        >
          <ListItem button onClick={() => setOpen(false)}>
            <ListItemIcon style={{ color: "#404040" }}>
              {" "}
              <img src={Transfer} alt="logo" width="25px" height="25px" />{" "}
            </ListItemIcon>
            <ListItemText primary="Transferencias" />
          </ListItem>
        </Link>
        <ListItem button onClick={cerrarSesion}>
          <ListItemIcon style={{ color: "#404040" }}>
            {" "}
            <ExitToApp />{" "}
          </ListItemIcon>
          <ListItemText primary="Cerrar sesión" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: "#ffffff", color: "#404040" }}
      >
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} edge="start" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h5" style={{ flexGrow: 1, textAlign: "center" }}>
            Banco distribuido
          </Typography>
          <img src={Codefilia} alt="logo" width="150px" height="70px" />
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
        {drawer}
      </Drawer>
      <Route path={`${props.match.path}/home`} component={HomeR} />
      <Route path={`${props.match.path}/deposit`} component={DepositR} />
      <Route path={`${props.match.path}/withdraw`} component={WithdrawR} />
      <Route path={`${props.match.path}/transfer`} component={TransferR} />
      {/* <Route path="*" component={Beyondmaricon} /> */}
    </div>
  );
}

export default MenuBar;
