import React, { Component } from 'react';
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
import Profile from './components/Profile';
import RunCreate from './components/RunCreate';

class App extends Component {
  constructor () {
    super();
    this.state = {
      auth: Auth.isUserAuthenticated(),
      shouldFireRedirect: false,
      loginUserName: '',
      loginPassword: '',
      registerUserName: '',
      registerPassword: '',
      registerEmail: '',
      registerFirstName: '',
      registerLastName: '',
      user: '',
      runDate: '',
      runMiles: '',
      runStart: '',
      runStartCity: '',
      runEnd: '',
      runEndCity: '',
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleRunSubmit = this.handleRunSubmit.bind(this);
    this.resetFireRedirect = this.resetFireRedirect.bind(this);
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
      if (res.data.token) {
        Auth.authenticateToken(res.data.token);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUserName: '',
          loginUserPassword: '',
          user: res.data.user, //TODO save the user in session storage so on page refresh we dont lose the user from the state
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

  handleRunSubmit(e) {
    e.preventDefault();
    axios('/runs', {
      method: 'POST',
      data: {
        run: {
          run_date: this.state.runDate,
          miles: this.state.runMiles,
          starting_point: this.state.runStart,
          starting_city: this.state.runStartCity,
          ending_point: this.state.runEnd,
          ending_city: this.state.runEndCity,
        }
      },
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      this.setState({
        shouldFireRedirect: true,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  resetFireRedirect() {
    if (this.state.shouldFireRedirect) {
      this.setState({
        shouldFireRedirect: false,
      })
    }
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav logoutUser={this.logoutUser} user={this.state.user} />
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
                <Redirect to="/profile" />
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
                <Redirect to="/profile" />
              )}
           />
           <Route
            exact
            path="/profile"
            render={() =>
              this.state.auth ? <Profile auth={this.state.auth} /> : <Redirect to="/login" />}
          />
          <Route
            exact
            path="/newrun"
            render={() =>
              this.state.auth ? (
                <RunCreate
                  runDate={this.state.runDate}
                  runMiles={this.state.runMiles}
                  runStart={this.state.runStart}
                  runStartCity={this.state.runStartCity}
                  runEnd={this.state.runEnd}
                  runEndCity={this.state.runEndCity}
                  handleInputChange={this.handleInputChange}
                  handleRunSubmit={this.handleRunSubmit}
                  shouldFireRedirect={this.state.shouldFireRedirect}
                />
              ) : (
                <Redirect to="/login" />
              )}
          />
        </div>
      </Router>
    );
  }
}

export default App;
