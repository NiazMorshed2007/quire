import React, {FC, useState} from 'react';
import SideBar from "./components/Sidebar";
import Login from "./pages/Login";

const App: FC = () => {
    const [logged, setLogged] = useState<boolean>(false);
    return <>
        <div className="app">
            {logged ? <div className='main'>
                <SideBar />
                this is the home page</div> : <Login/>}
        </div>
    </>
}

export default App;