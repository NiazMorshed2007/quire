import {createContext, Dispatch} from "react";

type Object = {
    logged: boolean,
    setLogged: Dispatch<boolean>
}

export const IsLogged = createContext<Object | null>(null);