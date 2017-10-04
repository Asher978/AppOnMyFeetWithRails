import React from 'react';
import { Redirect } from 'react-router-dom';

const RunCreate = props => {
    return (
        <div className="register">
        <div className="container">
            <ol className="breadcrumb main-color-bg">
                <li>Please enter the required info to log your run!</li>
            </ol>
        </div>
        <form className="container" onSubmit={props.handleRunSubmit}>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Date of Run</span>
                <input 
                className='form-control' 
                type="date"
                name="runDate"
                placeholder="Date of Run"
                value={props.runDate}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Miles Ran</span>
                <input 
                className='form-control' 
                type="number"
                placeholder="Miles Ran"
                name="runMiles"
                value={props.runMiles}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Starting Point</span>
                <input 
                className='form-control' 
                type="address"
                placeholder="Must be an intersection - e.g; (e 11th st and 2nd ave)"
                name="runStart"
                value={props.runStart}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Starting City</span>
                <input 
                className='form-control' 
                type="text"
                placeholder="Must be your Starting City"
                name="runStartCity"
                value={props.runStartCity}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Ending Point</span>
                <input 
                className='form-control' 
                type="address"
                placeholder="Must be an intersection - e.g; (w 23th st and 8th ave)"
                name="runEnd"
                value={props.runEnd}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>End City</span>
                <input 
                className='form-control' 
                type="text"
                placeholder="Must be your Ending City"
                name="runEndCity"
                value={props.runEndCity}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <input type="submit" value="Submit your run!" className="main-color-bg btn-lg btn-block" />
        </form>
        {(props.shouldFireRedirect) ? <Redirect to="/profile" />: ''}
    </div>
    )
}

export default RunCreate;