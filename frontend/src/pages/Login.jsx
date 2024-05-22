import '@styles/pages/Login.css';
import { usePasswordToggle } from '@hooks/usePasswordToggle.js'

const Login = () => {

    const { Icon, InputType, toggleVisibility } = usePasswordToggle();
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
                        <input type={InputType} name="password" id="password" required />
                        <label>Password</label>
                        <span className="password-toggle-icon" ><img src={Icon} height="20px" width="20px" alt="" onClick={toggleVisibility} /></span>


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
