import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import Menu from "./Menu/MenuBar";

const Router = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/menu" component={Menu} />
        {/* <Route exact path="/menu/home" component={Home} />
        <Route exact path="/menu/deposit" component={Deposit} />
        <Route exact path="/menu/withdraw" component={Withdraw} />
        <Route exact path="/menu/transfer" component={Transfer} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
