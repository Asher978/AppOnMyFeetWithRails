import React from 'react';

const RegisterForm = props => {
    return (
        <div className="ui equal width form">
            <div className="fields">
                <div className="field error">
                    <label>Username</label>
                    <input type="text" placeholder="Username" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" />
                </div>
            </div>
            <div className="equal width fields">
                <div className="field">
                    <label>First name</label>
                    <input type="text" placeholder="First Name" />
                </div>
                <div className="field">
                    <label>Middle name</label>
                    <input type="text" placeholder="Middle Name" />
                </div>
                <div className="field">
                    <label>Last name</label>
                    <input type="text" placeholder="Last Name" />
                </div>
            </div>
        </div>
    )
}

export default RegisterForm;