import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewUser from './NewUser';
import Header from './Header';
import Manage from './Manage';
import Login from './Login';

export default () => (
    <Router>
      <Header />      
      <Route path="/new" component={NewUser} /> 
      <Route path="/manage" component={Manage} />
      <Route path="/login" component={Login} />
    </Router>
  )