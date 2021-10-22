import React, {FC} from 'react';
import logo from '../assets/logo.png';

const Login: FC = () => {
    return <div className='login-page vw-100 vh-100 overflow-hidden position-relative'>
        <div className="header position-absolute top-0">
            <div className="logo-wrapper">
                <img src={logo} alt=""/>
            </div>
        </div>
        <div className="main w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Sign in to Quire</h2>
            <h5>Unfold Your Ideas</h5>
        </div>
    </div>
}

export default Login;