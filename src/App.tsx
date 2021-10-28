import React, {FC, useEffect, useState} from 'react';
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
import SideBar from "./components/sidebar/SideBar";
import BaseInfo from "./components/BaseInfo";
import {Acroname} from "./functions/Acroname";
import {setRandomAvatarBack} from "./functions/SetRandomAvatarBack";
import ErrorPage from "./pages/404/Error";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";

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
    const getOrgs = (): [] => {
        if (localStorage.getItem('orgs')) {
            return JSON.parse(localStorage.getItem('orgs') as string);
        } else {
            return []
        }
    }
    const [logged, setLogged] = useState<boolean>(loggedData());
    const [isDarkMode, setIsDarkMode] = useState(appearanceData());
    const [user, setUser] = useState<any>(getUser());
    const [orgs, setOrgs] = useState<IOrg[]>(getOrgs);
    useEffect(() => {
        if (logged) {
            localStorage.setItem("orgs", JSON.stringify(orgs));
        }
    }, [orgs, logged]);
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
                                                        <Overview>
                                                            <BaseInfo type='USER' title={user.user.displayName} />
                                                            <button onClick={() => {
                                                                setOrgs([{org_name: 'new Org', org_id: Math.random().toString(), org_avatar_txt: Acroname('new org'), org_avatar_back: setRandomAvatarBack(), projects: []}, ...orgs])
                                                            }
                                                            }>create
                                                            </button>
                                                        </Overview>
                                                    </Route>
                                                </UserSpace>
                                            </Route>
                                            <Route path='/w/o/:orgId'>
                                                <Organization/>
                                            </Route>
                                            <Route path='/w/p/:orgId/:projectId'>
                                                <Project />
                                            </Route>
                                            <Route path='/c'>
                                                <Create />
                                            </Route>
                                            <Route path='/error'>
                                                <ErrorPage />
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