import React, { Component } from 'react';
import './reset.css';
import './App.css';

import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/register' component={RegisterForm} />
          <Route exact path='/login' component={LoginForm} />
        </div>
      </Router>
    );
  }
}

export default App;
