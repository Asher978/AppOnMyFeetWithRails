import React, { Component } from 'react';
import axios from 'axios';
import Auth from '../modules/Auth';
import logo from '../Mypic.jpeg';
import { Link } from 'react-router-dom';


class Profile extends Component {
    constructor () {
        super();
        this.state = {
            profileData: null,
            runsData: null,
            profileDataLoaded: false,
        }
    }

    componentDidMount() {
        this.props.resetFireRedirect()
        axios('/profile', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${Auth.getToken()}`,
              token: `${Auth.getToken()}`,
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
              profileData: res.data.user,
              runsData: res.data.runs,
              profileDataLoaded: true,
            })
        })
    }

    renderRuns () {
        if (this.state.profileDataLoaded) {
            return (
                this.state.runsData.map(run => {
                    return (
                        <tr key={run.id}>
                            <td>{run.run_date}</td>
                            <td>{run.miles}</td>
                            <td>{run.starting_point}, {run.starting_city}</td>
                            <td>{run.ending_point}, {run.ending_city}</td>
                        </tr>
                    )
                })
            )
        }
    }

    renderProfile () {
        if (this.state.profileDataLoaded) {
            return (
                <div>
                    <header id="header">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10">
                                    <h1>Hello {this.state.profileData.firstname}<img className="pic" src={logo} alt={this.state.profileData.firstname}/></h1>
                                    <h4>Welcome to your running Profile</h4>
                                </div>
                                <div className="col-md-2">
                                    <div className="dropdown create">
                                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                            Manage Profile
                                            <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                                            <li><a href="">Update Profile</a></li>
                                            <li><a href="">Add Profile Picture</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <section id="breadcrumb">
                        <div className="container">
                            <ol className="breadcrumb">
                                <li>Your Running History</li>
                            </ol>
                        </div>
                    </section>
                    <section id="main">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-3">
                                <div className="list-group">
                                    <a href="" className="list-group-item active main-color-bg">
                                    <span className="glyphicon glyphicon-hand-right" aria-hidden="true"></span> Last Run
                                    </a>
                                    <Link to="/runslist" className="list-group-item"><span className="glyphicon glyphicon-random" aria-hidden="true"></span>&nbsp;All Runs <span className="badge">{this.state.runsData.length}</span></Link>
                                    <a href="" className="list-group-item"><span className="glyphicon glyphicon-adjust" aria-hidden="true"></span>&nbsp;Half Marathons <span className="badge">2</span></a>
                                    <a href="" className="list-group-item"><span className="glyphicon glyphicon-cd" aria-hidden="true"></span>&nbsp;Full Marathons <span className="badge">1</span></a>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                <div className="panel panel-default">
                                    <div className="panel-heading main-color-bg">
                                        <h3 className="panel-title">Running History Overview</h3>
                                    </div>
                                    <div className="panel-body">
                                        <div className="col-md-4">
                                            <div className="well dash-box">
                                                <h2><span className="glyphicon glyphicon-random" aria-hidden="true"></span> {this.state.runsData.length}</h2>
                                                <h4>All Runs</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="well dash-box">
                                                <h2><span className="glyphicon glyphicon-adjust" aria-hidden="true"></span> 2</h2>
                                                <h4>Half Marathon</h4>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="well dash-box">
                                                <h2><span className="glyphicon glyphicon-cd" aria-hidden="true"></span> 1</h2>
                                                <h4>Full Marathons</h4>
                                            </div>
                                        </div>
                                    </div>
                                    </div>

                                    {/* RUNS OVERVIEW */}
                                    <div className="panel panel-default">
                                        <div className="panel-heading main-color-bg">
                                            <h3 className="panel-title">Runs Snapshot</h3>
                                        </div>
                                        <div className="panel-body">
                                            <table className="table table-striped table-hover">
                                                <tbody>
                                                <tr>
                                                    <th>Run Date</th>
                                                    <th>Miles Covered</th>
                                                    <th>Starting Location</th>
                                                    <th>Ending Location</th>
                                                </tr>
                                                {this.renderRuns()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )
        }
    }
    

    render () {
        return (
            <div>
                {this.renderProfile()}
                
            </div>
        )
    }
}


export default Profile;