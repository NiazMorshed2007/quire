import React, {FC, useState} from 'react';
import SideBar from "./components/Sidebar";
import Login from "./pages/Login";
import {IsLogged} from "./context/isLogged";

const App: FC = () => {
    const [logged, setLogged] = useState<boolean>(false);
    return <>
        <IsLogged.Provider value={{logged, setLogged}}>
            <div className="app">
                <div className="main">
                    {logged ? 'this is the home page' : <Login />}
                </div>
            </div>
        </IsLogged.Provider>
    </>
}

export default App;