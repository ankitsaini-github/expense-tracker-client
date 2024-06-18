import './App.css'

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Login from './components/Auth/Login';
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
      </Switch>
    </Router>
  )
}

export default App
