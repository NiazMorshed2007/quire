import React, {FC, useContext} from 'react';
import logo from '../../assets/logo.png';
import {FcGoogle} from 'react-icons/fc';
import {IsLogged} from "../../context/isLogged";
import {firebase} from '../../firebase/firebase';
import {Redirect, useHistory} from "react-router-dom";
import {User} from '../../context/user';
import {Orgs} from "../../context/orgs";
import {setId} from "../../functions/SetId";

const Login: FC = () => {
    const {logged, setLogged}: any = useContext(IsLogged);
    const {setUser}: any = useContext(User);
    const {orgs, setOrgs} = useContext(Orgs);
    const history = useHistory();
    const authenticate = (): void => {
        const google_provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google_provider)
            .then((re) => {
                localStorage.setItem('logged', 'true');
                localStorage.setItem('user', JSON.stringify(re));
                setUser(JSON.parse(localStorage.getItem('user') as string));
                setLogged(true);
                history.push('/u/overview');
                const user = JSON.parse(localStorage.getItem('user') as string);
                setOrgs([{
                    org_name: user.user.displayName + "'s Organization",
                    org_id: setId(user.user.displayName, "'s_organization"),
                }, ...orgs]);
                localStorage.setItem('orgs', JSON.stringify(orgs));
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
                <img className='fitimage' src={logo} alt=""/>
            </div>
        </div>
        <div className="main w-100 h-100 d-flex flex-column align-items-center justify-content-center">
            <h2>Sign in to Quire</h2>
            <h5 className='text-silver'>Unfold Your Ideas</h5>
            <div
                onClick={authenticate}
                className="login-button pointer d-flex gap-3 px-3 mt-3 shadow-sm align-items-center justify-content-between"
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