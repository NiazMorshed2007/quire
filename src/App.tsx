import React, {FC, useState} from 'react';
import SideBar from "./components/Sidebar";
import Login from "./pages/Login/Login";
import {IsLogged} from "./context/isLogged";
import {IsDarkMode} from "./context/isDarkMode";
import {User} from './context/user';
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import UserSpace from "./pages/User/User";
import Overview from "./pages/overview/Overview";
import {Orgs} from "./context/orgs";
import {IOrg} from "./interfaces/OrgInterface";
import Organization from "./pages/Organization/Organization";
import {setId} from "./functions/SetId";

const App: FC = () => {
    const loggedData = (): boolean => {
        return !!localStorage.getItem('logged');
    }
    const appearanceData = (): boolean => {
        return !!localStorage.getItem('isDarkMode');
    }
    const getUser = (): [] => {
        if (localStorage.getItem('user')) {
            return JSON.parse(localStorage.getItem('user') as string);
        } else {
            return [];
        }
    }
    const [logged, setLogged] = useState<boolean>(loggedData());
    const [isDarkMode, setIsDarkMode] = useState<boolean>(appearanceData());
    const [user, setUser] = useState<{} | []>(getUser());
    const [orgs, setOrgs] = useState<IOrg[]>([]);
    console.log(orgs);
    return <>
        <Router>
            <Route path='/' exact>
                <Redirect to='/u'/>
            </Route>
            <Route path='/u'>
                <Redirect to='/u/overview'/>
            </Route>
            {!logged && <Redirect to='/login'/>}
            <IsLogged.Provider value={{logged, setLogged}}>
                <User.Provider value={{user, setUser}}>
                    <IsDarkMode.Provider value={{isDarkMode, setIsDarkMode}}>
                        <Orgs.Provider value={{orgs, setOrgs}}>
                            <div className="app vh-100 vw-100 overflow-hidden">
                                <Route path='/login'>
                                    <Login/>
                                </Route>
                                {logged &&
                                <>
                                    <div
                                        className={`dark-mode-layer position-absolute vh-100 vw-100 bg-dark ${isDarkMode && 'expand-dark-mode'}`}>{''}</div>
                                    <div
                                        className={`user-work-wrapper d-flex w-100 h-100 position-relative ${isDarkMode && 'text-white'}`}>
                                        <SideBar/>
                                        <div className="main d-flex w-100 flex-column">
                                            <Route path='/u'>
                                                <UserSpace>
                                                    <Route path='/u/overview'>
                                                        <Overview/>
                                                        <button onClick={() => {
                                                        setOrgs([{
                                                            org_name: 'gsdd',
                                                            org_id: setId('sdjf asdf', "'s_organization"),
                                                        }, ...orgs]);
                                                        console.log(orgs);
                                                        }
                                                        }>create</button>
                                                    </Route>
                                                </UserSpace>
                                            </Route>
                                            <Route path='/w/:orgId'>
                                                <Organization/>
                                            </Route>
                                        </div>
                                    </div>
                                </>
                                }
                            </div>
                        </Orgs.Provider>
                    </IsDarkMode.Provider>
                </User.Provider>
            </IsLogged.Provider>
        </Router>
    </>
}

export default App;