import React from "react";
import { Switch, Route } from "react-router-dom";
import Sidebar  from "./components/Sidebar";
import Cryptocurrencies from "./components/Cryptocurrencies"
import CryptoDetails from "./components/CryptoDetails";
import News from "./components/News";
import Home from "./components/Home";
import Trades from "./components/Trades";
import Charts from "./components/Charts"
import CCalendar from "./components/CCalendar.jsx"

import "./App.css";

function App() {
  return (
    <div className="d-flex">
      <Sidebar />

      <Switch>
        <div id="content" className="w-100">
          <Route exact path='/'>
            <Home />
          </Route>
        
          <Route exact path='/news'>
            <News />
          </Route>

          <Route exact path='/cryptocurrencies'>
            <Cryptocurrencies />
          </Route>

          <Route exact path='/crypto/:coinId'>
            <CryptoDetails />
          </Route>

          <Route exact path='/charts'>
            <Charts />
          </Route>

          <Route exact path='/trades'>
            <Trades />
          </Route>

          <Route exact path='/calendar'>
            <CCalendar />
          </Route>

        </div>
      </Switch>

    </div>
  );
}

export default App;
