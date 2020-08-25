import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "./Account/Home"
import Deposit from "./Deposit/Deposit";
import Withdraw from "./Withdraw/Withdraw"
import Transfer from "./Transfer/Transfer"

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={App}/>
                <Route exact path="/Home" component={Home}/>
                <Route exact path="/Deposit" component={Deposit}/>
                <Route exact path="/Withdraw" component={Withdraw}/>
                <Route exact path="/Transfer" component={Transfer}/>
            </Switch>    
        </BrowserRouter>
    );
}
 
export default Router;
