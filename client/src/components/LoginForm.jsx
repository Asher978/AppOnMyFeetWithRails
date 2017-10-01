import React from 'react';
import { Link } from 'react-router-dom';


const LoginForm = props => {
    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <h2 className="ui image header">
                <div className="content">
                    Log-in to your account
                </div>
                </h2>
                <form className="ui large form" onSubmit={props.handleLoginSubmit}>
                <div className="ui stacked secondary  segment">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>
                            <input 
                                type="text" 
                                name="loginUserName" 
                                placeholder="UserName"
                                value={props.loginUserName}
                                onChange={props.handleInputChange}    
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="lock icon"></i>
                            <input 
                                type="password" 
                                name="loginPassword" 
                                placeholder="Password"
                                value={props.loginPassword} 
                                onChange={props.handleInputChange}    
                            />
                        </div>
                    </div>
                    <div className="ui fluid large green submit button">Login</div>
                </div>

                <div className="ui error message"></div>

                </form>

                <div className="ui message">
                New to us? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>

    )
}

export default LoginForm;