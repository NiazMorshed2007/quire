import React, {FC, useState} from 'react';
import SideBar from "./components/Sidebar";
import Login from "./pages/Login";
import {IsLogged} from "./context/isLogged";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import UserSpace from "./pages/User/User";

const App: FC = () => {
    const loggedData = (): boolean => {
        return !!localStorage.getItem('logged');
    }
    const [logged, setLogged] = useState<boolean>(loggedData());
    return <>
        <Router>
            {!logged && <Redirect to='/login' />}
        <IsLogged.Provider value={{logged, setLogged}}>
            <div className="app vh-100 vw-100 overflow-hidden">
                <Route path='/login'>
                    <Login />
                </Route>
                <Route path='/'>
                    <div className="user-work-wrapper d-flex w-100 h-100 position-relative">
                        <SideBar />
                        <div className="main">
                            <Route path='/u' exact>
                                <UserSpace />
                            </Route>
                        </div>
                    </div>
                </Route>
            </div>
        </IsLogged.Provider>
        </Router>
    </>
}

export default App;