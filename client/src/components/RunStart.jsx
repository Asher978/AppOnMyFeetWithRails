import React, { Component } from 'react';
import { Map, Marker, Polyline, TileLayer } from 'react-leaflet';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Auth from '../modules/Auth';



class RunStart extends Component {
  constructor () {
    super();
    this.state = {
      lat: null,
      lng: null,
      posReceived: false,
      runData: [],
      runID: null,
    }

    this.handleStartRun = this.handleStartRun.bind(this);
    this.handleStopRun = this.handleStopRun.bind(this);
  }


  // getPosition () {
  //   navigator.geolocation.getCurrentPosition((pos) => {
  //     console.log(pos);
  //     if(pos.coords) {
  //       this.setState({
  //         lat: pos.coords.latitude,
  //         lng: pos.coords.longitude,
  //         posReceived: true,
  //       })
  //     }
  //   })
  // }

  // error (err) {
  //   console.warn('ERROR(' + err.code + '): ' + err.message);
  // }

  componentDidMount () {
    console.log('did mount')
    this.ID = navigator.geolocation.watchPosition((pos) => {
      if(pos.coords) {
        this.setState({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          posReceived: true,
        })
      }
    })
  } 

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.ID);
  }



  renderMap () {
    if (this.state.posReceived) {
      const mapId = 'mapbox.streets';
      const access_token = 'pk.eyJ1IjoiYXNoZXI5NzgiLCJhIjoiY2o1eTVmNXlnMGJ2NjJ5cWRxMTRtY2hsMSJ9.y7O2ehEprrX26JpPyZatrQ';
      const { lat: latt, lng: lngg } = this.state;
      return (
        <div>
          <Map center={[latt, lngg]} zoom={15}>
              <TileLayer
              url={`https://api.tiles.mapbox.com/v4/${mapId}/{z}/{x}/{y}.png?access_token=${access_token}`}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[latt, lngg]}>
                  {/* <Popup>
                      <span>{p}<br/>{c}.</span>
                  </Popup> */}
              </Marker>
          </Map>
        <button className='btn main-color-bg' onClick={this.handleStartRun}>Start Running!</button>
        <button className='btn main-color-bg' onClick={this.handleStopRun}>Stop Running!</button>
        {(this.props.shouldFireRedirect) ? <Redirect to="/profile" />: ''}     
        </div>
      )
    }
  }

  handleStartRun () {
    let watchId;
    let run = [];
    console.log('start run clicked!')
    watchId = navigator.geolocation.watchPosition((pos) => {
      run.push([pos.coords.latitude, pos.coords.longitude])
      this.setState({ runData: run, runID: watchId })
      console.log('from start run', this.state.runData)
    })
  }

  handleStopRun (e) {
    e.preventDefault();
    const entireRun = [...this.state.runData]
    console.log('from stop run', entireRun)
    navigator.geolocation.clearWatch(this.state.runID);
    this.setState({ runID: null }) 
    axios('/trackruns', {
      method: 'POST',
      data: {
        trackrun: {
          rundata: entireRun
        }
      },
      headers: {
        'Authorization': `Token ${Auth.getToken()}`,
        token: Auth.getToken(),
        contentType: 'application/json',
      }
    }).then(res => {
      console.log(res)
      this.setState({
        shouldFireRedirect: true,
      });
    }).catch(err => {
      console.log(err);
    });
  }

  render () {
    return (
      <div>
        { this.renderMap() }
        <br />
      </div>
    )
  }
}

export default RunStart;