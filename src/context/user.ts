import {createContext, Dispatch} from "react";

interface GlobalUser {
    user: [],
    setUser: Dispatch<[]>
}

export const User = createContext<GlobalUser>({user: [], setUser: () => {}});