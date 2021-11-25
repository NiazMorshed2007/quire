import {createContext, Dispatch} from "react";

interface GlobalCurrentOrg {
    currentOrg: string,
    setCurrentOrg: Dispatch<string>
}

export const CurrentOrg = createContext<GlobalCurrentOrg>({currentOrg: '', setCurrentOrg: () => {}});