import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';
import moment from 'moment';



class RunsList extends Component {
    constructor () {
        super();
        this.state = {
            runsData: null,
            runsDataLoaded: false,
        }
    }


    componentDidMount() {
        this.props.resetFireRedirect()
        axios('/runs', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${Auth.getToken()}`,
              token: `${Auth.getToken()}`,
            }
        }).then(res => {
            console.log(res)
            this.setState({
              runsData: res.data.runs,
              runsDataLoaded: true,
            })
        })
    }

    renderMap (x, y, p, c) {
        const position = [x, y];        
        return (
            <Map center={position} zoom={18}>
                <TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>
                        <span>{p}<br/>{c}.</span>
                    </Popup>
                </Marker>
            </Map>
        )
    }

    renderRunsList () {
        if(this.state.runsDataLoaded && this.state.runsData.length > 0) {
            return this.state.runsData.map(run => {
                return (
                    <div className="col-sm-6 col-md-4" key={run.id}>
                        <div className="thumbnail">
                            {this.renderMap(run.latitude, run.longitude, run.starting_point, run.starting_city)}
                        <div className="caption">
                            <h3 className="main-color-bg rundate">{`${moment(run.run_date).format('MMM D, Y')}`}</h3>
                            <p>{run.miles} miles</p>
                            <p>Your run was from {run.starting_point} to {run.ending_point}.</p>
                            <a href="" className="btn main-color-bg" role="button">View this Run!</a>
                        </div>
                        </div>
                    </div>
                )
            })
        } else if (this.state.runsDataLoaded && this.state.runsData.length === 0) {
            return (
                <div className="row runslistHeader">
                    <h3>Looks like you haven't logged any runs yet...</h3>
                    <center><Link to="/newrun" className="btn main-color-bg">Log your first run here!</Link></center>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <h1>Loading...</h1>
                </div>
            )
        }
    }

    render () {
        return (
            <div className="container">
            <div className="row runslistHeader">
                <div className="col-md-12">
                    <h1>Detail of your Runs</h1>
                </div>
            </div>
                {this.renderRunsList()}
            </div>
        )
    }
 } 

 export default RunsList;