import React, { Component } from 'react';
import './reset.css';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';

import Auth from './modules/Auth';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Nav from './components/Nav';

class App extends Component {
  constructor () {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      loginUserName: '',
      loginPassword: '',
      registerUserName: '',
      registerPassword: '',
      registerEmail: '',
      registerFirstName: '',
      registerLastName: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();
    axios.post('/login', {
      username: this.state.loginUserName,
      password: this.state.loginPassword,
    }).then(res => {
      console.log(res);
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUserName: '',
          loginUserPassword: '',
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  handleRegisterSubmit(e) {
    e.preventDefault();
    axios.post('/users', {
      user: {
        username: this.state.registerUserName,
        password: this.state.registerPassword,
        email: this.state.registerEmail,
        firstname: this.state.registerFirstName,
        lastname: this.state.registerLastName,
      }
    }).then(res => {
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }

  logoutUser() {
    axios.delete('/logout', {
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      Auth.deauthenticateUser();
      this.setState({
        auth: Auth.isUserAuthenticated(),
        loginUserName: '',
        loginPassword: '',
      })
    })
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav logoutUser={this.logoutUser} />
          <Route exact path='/register'
          render={() =>
              !this.state.auth ? (
                <RegisterForm
                  auth={this.state.auth}
                  registerUserName={this.state.registerUsername}
                  registerPassword={this.state.registerPassword}
                  registerEmail={this.state.registerEmail}
                  registerName={this.state.registerName}
                  handleInputChange={this.handleInputChange}
                  handleRegisterSubmit={this.handleRegisterSubmit}
                />
              ) : (
                <Redirect to="/" />
              )}
          />
          <Route exact path='/login' 
          render={() =>
              !this.state.auth ? (
                <LoginForm
                  auth={this.state.auth}
                  loginUserName={this.state.loginUsername}
                  loginPassword={this.state.loginPassword}
                  handleInputChange={this.handleInputChange}
                  handleLoginSubmit={this.handleLoginSubmit}
                />
              ) : (
                <Redirect to="/" />
              )}
           />
        </div>
      </Router>
    );
  }
}

export default App;
