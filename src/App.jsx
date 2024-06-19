import './App.css'

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import Navbar from './components/Navbar';
import React from 'react';
import Signup from './components/Auth/Signup'

function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signup" />
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  )
}

export default App
