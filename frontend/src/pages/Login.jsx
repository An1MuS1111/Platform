import React, { useState } from 'react';
import '@styles/pages/Login.css';

const Login = () => {


    const [visibility, setVisibility] = useState(true);

    const toggleVisibility = () => setVisibility(visibility => !visibility);


    const Icon = <img src={visibility ? "images/hide.png" : "images/view.png"} height="20px" width="20px" alt="" onClick={toggleVisibility} />

    return (
        <div className="login__container">
            <div className="login-box">
                <h2>Login</h2>
                <form action="" method="post">
                    <div className="user-box">
                        <input type='name' name="username" required />
                        <label>Username</label>
                    </div>
                    <div className="user-box">
                        <input type={visibility ? "text" : "password"} name="password" id="password" required />
                        <label>Password</label>
                        <span className="password-toggle-icon" >{Icon}</span>


                    </div>
                    <button type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
