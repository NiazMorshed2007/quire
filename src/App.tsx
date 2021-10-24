import React, {FC, useState} from 'react';
import SideBar from "./components/Sidebar";
import Login from "./pages/Login/Login";
import {IsLogged} from "./context/isLogged";
import {IsDarkMode} from "./context/isDarkMode";
import {User} from './context/user';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import UserSpace from "./pages/User/User";
import Overview from "./components/Overview";

const App: FC = () => {
    const loggedData = (): boolean => {
        return !!localStorage.getItem('logged');
    }
    const appearanceData = ():boolean => {
        return !!localStorage.getItem('isDarkMode');
    }
    const getUser = ():[] => {
        if(localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user') as string);
        } else {
            return [];
        }
    }
    const [logged, setLogged] = useState<boolean>(loggedData());
    const [isDarkMode, setIsDarkMode] = useState<boolean>(appearanceData());
    const [user, setUser] = useState<{} | []>(getUser());
    return <>
        <Router>
            {!logged && <Redirect to='/login' />}
        <IsLogged.Provider value={{logged, setLogged}}>
            <User.Provider value={{user, setUser}}>
            <IsDarkMode.Provider value={{isDarkMode, setIsDarkMode}}>
            <div className="app vh-100 vw-100 overflow-hidden">
                <Route path='/login'>
                    <Login />
                </Route>
                {logged &&
                <Route path='/'>
                    <div className={`dark-mode-layer position-absolute vh-100 vw-100 bg-dark ${isDarkMode && 'expand-dark-mode'}`}>{''}</div>
                    <div className={`user-work-wrapper d-flex w-100 h-100 position-relative ${isDarkMode && 'text-white'}`}>
                        <SideBar />
                        <div className="main d-flex w-100 flex-column">
                            <Route path='/u'>
                                <UserSpace>
                                    <Route path='/u/overview'>
                                        <Overview />
                                    </Route>
                                </UserSpace>
                            </Route>
                        </div>
                    </div>
                </Route>
                }
            </div>
            </IsDarkMode.Provider>
            </User.Provider>
        </IsLogged.Provider>
        </Router>
    </>
}

export default App;