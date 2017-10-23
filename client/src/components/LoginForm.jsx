import React from 'react';



const LoginForm = props => {
    return (
        <div className="login">
            <div className="container">
                <ol className="breadcrumb main-color-bg">
                    <li>Please enter your credentials to Login!</li>
                </ol>
            </div>  
            <form className="container" onSubmit={props.handleLoginSubmit}>
                <div className='form-group'>
                    <span className='input-group'>
                        <span className='input-group-addon main-color-bg'>UserName</span>
                        <input 
                        className='form-control' 
                        type="text"
                        name="loginUserName"
                        placeholder="User Name"
                        value={props.loginUserName}
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
                        name="loginPassword"
                        placeholder="Password"
                        value={props.loginPassword}
                        onChange={props.handleInputChange}
                        required />
                    </span>
                </div>
                <input type="submit" value="Log In!" className="main-color-bg btn-lg btn-block" />
            </form>
        </div>
    )
}

export default LoginForm;