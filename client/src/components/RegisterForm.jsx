import React from 'react';

const RegisterForm = props => {
    return (
        <div className="ui middle aligned center aligned grid">
            <div className="column">
                <h2 className="ui image header">
                <div className="content">
                    Join App On My Feet Today!
                </div>
                </h2>
            <form className="ui form attached fluid segment" onSubmit={props.handleRegisterSubmit}>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="id badge icon"></i>
                        <input 
                            placeholder="Username" 
                            type="text" 
                            name="registerUserName"
                            value={props.registerUserName}
                            onChange={props.handleInputChange}
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon"></i>    
                        <input 
                            type="password" 
                            placeholder="Password"
                            name="registerPassword"
                            value={props.registerPassword}
                            onChange={props.handleInputChange}
                        />
                    </div>
                </div>
                <div className="two fields">
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>                        
                            <input 
                                placeholder="First Name" 
                                type="text" 
                                name="registerFirstName"
                                value={props.registerFirstName}
                                onChange={props.handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="ui left icon input">
                            <i className="user icon"></i>  
                            <input 
                                placeholder="Last Name" 
                                type="text" 
                                name="registerLastName"
                                value={props.registerLastName}
                                onChange={props.handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="mail icon"></i>  
                        <input 
                            placeholder="Email Addrress" 
                            type="email" 
                            name="registerEmail"
                            value={props.registerEmail}
                            onChange={props.handleInputChange}
                        />
                    </div>
                </div>
                <input className="ui fluid large green submit button" type="submit" value="Regsiter!" />
            </form>
        </div>
    </div>
    
    )
}

export default RegisterForm;