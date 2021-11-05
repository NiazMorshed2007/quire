import React from 'react';
import logo from '../../assets/logo.png';

const GlobalError: React.FC = () => {
    return <div className='global-error'>
        <header className='position-fixed'>
            <img src={logo} alt=""/>
        </header>
        <main className='d-flex align-items-center justify-content-center'>
            <div className="left"></div>
            <div className="right">
                <video autoPlay loop src='video/error.mp4'></video>
            </div>
        </main>
    </div>
}

export default GlobalError;