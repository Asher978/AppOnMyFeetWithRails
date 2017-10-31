import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer, Polyline } from 'react-leaflet';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';
import axios from 'axios';
import moment from 'moment';
import Run from './Run';



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
        axios('/trackruns', {
            method: 'GET',
            headers: {
              'Authorization': `Token ${Auth.getToken()}`,
              token: `${Auth.getToken()}`,
            }
        }).then(res => {
            console.log(res.data.trackruns)
            this.setState({
              runsData: res.data.trackruns,
              runsDataLoaded: true,
            })
        })
    }

    renderMap (runArray) {
        
        // array prep for Polyline
        const polyPos = [];
        polyPos.push(runArray)

        // position prep for Map center
        const centerPos = runArray[runArray.length-1];

        // Map prep
        const mapId = 'mapbox.streets';
        const access_token = 'pk.eyJ1IjoiYXNoZXI5NzgiLCJhIjoiY2o1eTVmNXlnMGJ2NjJ5cWRxMTRtY2hsMSJ9.y7O2ehEprrX26JpPyZatrQ';
        const options = {
            color: 'red',
            weight: 7,
            opacity: .7,
            dashArray: '5,1',
            lineJoin: 'round'
        }

        return (
            <Map center={centerPos} zoom={15}>
                <TileLayer
                    url={`https://api.tiles.mapbox.com/v4/${mapId}/{z}/{x}/{y}.png?access_token=${access_token}`}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={runArray[0]}>
                    {/* <Popup>
                        <span>{p}<br/>{c}.</span>
                    </Popup> */}
                </Marker>
                <Polyline positions={polyPos} color={'red'}/>
            </Map>
        )
    }

    renderRunsList () {
        if(this.state.runsDataLoaded && this.state.runsData.length > 0) {
            return this.state.runsData.map(run => {
                return (
                    <div className="col-sm-6 col-md-4">
                    <Run key={run.id}
                            id={run.id}
                            rundata={run.rundata.rundata}
                            renderMap={this.renderMap}
                            created={run.created_at}
                            miles={run.miles}
                            start={run.starting_point}
                            end={run.ending_point}
                     />
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