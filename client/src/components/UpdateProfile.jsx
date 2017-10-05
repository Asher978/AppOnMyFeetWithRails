import React from 'react';
import { Redirect } from 'react-router-dom';

const UpdateProfile = props => {
        return (
            <div className="login">
            <div className="container">
                <ol className="breadcrumb main-color-bg">
                    <li>Update your profile below!</li>
                </ol>
            </div>  
            <form className="container" onSubmit={props.handleUpdateProfile}>
                <div className='form-group'>
                    <span className='input-group'>
                        <span className='input-group-addon main-color-bg'>Half Marathons</span>
                        <input 
                        className='form-control' 
                        type="number"
                        name="half_marathons"
                        value={props.half_marathons}
                        onChange={props.handleInputChange}
                        required />
                    </span>
                </div>
                <div className='form-group'>
                    <span className='input-group'>
                        <span className='input-group-addon main-color-bg'>Full Marathons</span>
                        <input 
                        className='form-control' 
                        type="number"
                        name="full_marathons"
                        value={props.full_marathons}
                        onChange={props.handleInputChange}
                        required />
                    </span>
                </div>
                <input type="submit" value="Update Profile!" className="main-color-bg btn-lg btn-block" />
            </form>
            {(props.shouldFireRedirect) ? <Redirect to="/profile" />: ''}
        </div>
    )
}

export default UpdateProfile;