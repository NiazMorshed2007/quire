import React, {useContext} from "react";
import logo from "../../assets/logo.png";
import {Link} from 'react-router-dom';
import {Orgs} from "../../context/orgs";

const GlobalError: React.FC = () => {
    const {orgs} = useContext(Orgs);
    return (
        <div className="global-error vw-100 vh-100">
            <header className="position-fixed">
                <div className="img-wrapper">
                    <img className='fitimage' src={logo} alt=""/>
                </div>
            </header>
            <main className="d-flex w-100 h-100 gap-5 align-items-center justify-content-center">
                <div className="left pb-5">
                    <h1 className='fw-bold mb-3'>The page you are looking for cannot be found.</h1>
                    <h5>If you need assistance, please contact us.</h5>
                        <p className='m-0 mt-4 pt-2'>
                        There are a few links that maybe helpful:
                        </p>
                    <div className="links d-flex flex-column">
                        <Link className='text-decoration-none primary-color' to='/u/overview'>Home</Link>
                        <Link className='text-decoration-none primary-color' to={`/w/o/${orgs && orgs[0].org_id}/overview`}>{orgs && orgs[0].org_name}</Link>
                    </div>
                </div>
                <div className="right">
                    <video width='300px' autoPlay loop muted>
                        <source src="video/error.mp4" type="video/mp4"/>
                    </video>
                </div>
            </main>
        </div>
    );
};

export default GlobalError;
