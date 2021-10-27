import {createContext} from "react";

interface GlobalLogged {
    logged: boolean,
    setLogged: (set: boolean) => void
}

export const IsLogged = createContext<GlobalLogged>({logged: false, setLogged: () => {}});