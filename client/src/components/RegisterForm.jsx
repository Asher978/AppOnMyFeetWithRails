import React from 'react';

const RegisterForm = props => {
    return (
    <div className="register">
        <div className="container">
            <ol className="breadcrumb main-color-bg">
                <li>Please enter the required info to register with us!</li>
            </ol>
        </div>
        <form className="container" onSubmit={props.handleRegisterSubmit}>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>UserName</span>
                <input 
                className='form-control' 
                type="text"
                name="registerUserName"
                placeholder="User Name"
                value={props.registerUserName}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Password</span>
                <input 
                className='form-control' 
                type="password"
                placeholder="Password"
                name="registerPassword"
                value={props.registerPassword}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Email</span>
                <input 
                className='form-control' 
                type="email"
                placeholder="Email"
                name="registerEmail"
                value={props.registerEmail}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>First Name</span>
                <input 
                className='form-control' 
                type="text"
                placeholder="First Name"
                name="registerFirstName"
                value={props.registerFirstName}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <div className='form-group'>
            <span className='input-group'>
                <span className='input-group-addon main-color-bg'>Last Name</span>
                <input 
                className='form-control' 
                type="text"
                placeholder="Last Name"
                name="registerLastName"
                value={props.registerLastName}
                onChange={props.handleInputChange}
                required />
            </span>
            </div>
            <input type="submit" value="Register!" className="main-color-bg btn-lg btn-block" />
        </form>
    </div>
    
    
    )
}

export default RegisterForm;