import {createContext} from "react";

interface GlobalUser {
    user: [],
    setUser: (user: []) => void
}

export const User = createContext<GlobalUser>({user: [], setUser: () => {}});