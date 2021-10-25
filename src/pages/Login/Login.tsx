import React, {FC, useContext} from 'react';
import logo from '../../assets/logo.png';
import {FcGoogle} from 'react-icons/fc';
import {IsLogged} from "../../context/isLogged";
import {firebase} from '../../firebase/firebase';
import {Redirect, useHistory} from "react-router-dom";
import {User} from '../../context/user';

const Login: FC = () => {
    const {logged, setLogged}: any = useContext(IsLogged);
    const {setUser}: any = useContext(User);
    const history = useHistory();
    const authenticate = (): void => {
        const google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
            .then((re) => {
                localStorage.setItem('logged', 'true');
                localStorage.setItem('user', JSON.stringify(re));
                setUser(re);
                setLogged(true);
                history.push('/u/overview');
            }).catch((err) => {
            console.log(err);
        })
    }
    if(logged) {
        return <Redirect to='/u' />
    }
    return <div className='login-page vw-100 vh-100 overflow-hidden position-relative'>
        <div className="header position-absolute top-0">
            <div className="logo-wrapper">
                <img src={logo} alt=""/>
            </div>
        </div>
        <div className="main w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Sign in to Quire</h2>
            <h5>Unfold Your Ideas</h5>
            <div
                onClick={authenticate}
                className="login-button d-flex gap-3 px-3 mt-3 shadow-sm align-items-center justify-content-between"
            >
                <i className="h-100 d-flex align-items-center justify-content-center">
                    <FcGoogle/>
                </i>
                <div className="h-100 w-100 d-flex align-items-center justify-content-center">
                    <p className="m-0">Sign in with Google</p>
                </div>
            </div>
        </div>
    </div>
}

export default Login;