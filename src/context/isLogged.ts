import {createContext, Dispatch} from "react";

interface GlobalLogged {
    logged: boolean,
    setLogged: Dispatch<boolean>
}

export const IsLogged = createContext<GlobalLogged>({logged: false, setLogged: () => {}});