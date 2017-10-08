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
import RunsList from './components/RunsList';
import UpdateProfile from './components/UpdateProfile';
import UploadPic from './components/UploadPic';

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
      userName: Auth.getUserName(),
      runDate: '',
      runMiles: '',
      runStart: '',
      runStartCity: '',
      runEnd: '',
      runEndCity: '',
      full_marathons: '',
      half_marathons: '',
      uploadedPic: null,
    }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.handleRunSubmit = this.handleRunSubmit.bind(this);
    this.resetFireRedirect = this.resetFireRedirect.bind(this);
    this.handleUpdateProfile = this.handleUpdateProfile.bind(this);
    
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
      console.log(res)
      if (res.data.token) {
        Auth.authenticateToken(res.data.token, res.data.user.firstname);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          loginUserName: '',
          loginUserPassword: '',
          userName: Auth.getUserName(),
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
        Auth.authenticateToken(res.data.token, res.data.user.firstname);
        this.setState({
          auth: Auth.isUserAuthenticated(),
          userName: Auth.getUserName(),
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
        userName: Auth.getUserName(),
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
        run_date: '',
        miles: '',
        starting_point: '',
        starting_city: '',
        ending_point: '',
        ending_city: '',
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

  

  handleUpdateProfile (e) {
    e.preventDefault();
    axios('/profile', {
      method: 'PUT',
      data: {
        profile: {
          half_marathons: this.state.half_marathons,
          full_marathons: this.state.full_marathons,
        }
      },
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
      }
    }).then(res => {
      this.setState({
        shouldFireRedirect: true,
        half_marathons: '',
        full_marathons: '',
      });
    }).catch(err => {
      console.log(err);
    });
    e.target.reset();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Nav logoutUser={this.logoutUser} userName={this.state.userName} />
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
              this.state.auth ? <Profile auth={this.state.auth} resetFireRedirect={this.resetFireRedirect} /> : <Redirect to="/login" />}
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
          <Route
            exact
            path="/runslist"
            render={() =>
              this.state.auth ? <RunsList resetFireRedirect={this.resetFireRedirect} /> : <Redirect to="/login" />}
          />
          <Route 
            exact
            path="/updateprofile"
            render={() => 
              this.state.auth ? (
                <UpdateProfile
                  half_marathons={this.state.half_marathons}
                  full_marathons={this.state.full_marathons}
                  handleInputChange={this.handleInputChange}
                  handleUpdateProfile={this.handleUpdateProfile}
                  shouldFireRedirect={this.state.shouldFireRedirect}
                /> 
              ) : (
                <Redirect to="/login" />
              )}
          />
          <Route 
            exact
            path="/uploadpic"
            render={() => 
              this.state.auth ? (
                <UploadPic shouldFireRedirect={this.state.shouldFireRedirect} />
              ) : (
                <Redirect to="/login" />
              )
            } 
          />
        </div>
      </Router>
    );
  }
}

export default App;
