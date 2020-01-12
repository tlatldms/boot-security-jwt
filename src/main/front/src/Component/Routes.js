import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NewUser from './NewUser';
import Header from './Header';

export default () => (
    <Router>
      <Header />      
      <Route path="/new" component={NewUser} /> 
    </Router>
  )