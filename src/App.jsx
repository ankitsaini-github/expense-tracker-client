import "./App.css";

import React, { useEffect, useState } from "react";
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import Footer from "./components/Footer";
import ForgotPassword from "./components/Auth/ForgotPassowrd";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import Login from "./components/Auth/Login";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import Reports from "./components/Reports/Reports";
import Signup from "./components/Auth/Signup";
import { useSelector } from "react-redux";

function App() {
  const isLogin = useSelector((state) => state.auth.isloggedin);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/forgot-password" component={ForgotPassword} />
        {isLogin && (
          <>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route path="/reports">
              <Reports />
            </Route>
          </>
        )}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
