import {createContext} from "react";

interface GlobalCurrentOrg {
    currentOrg: string,
    setCurrentOrg: (c: string) => void
}

export const CurrentOrg = createContext<GlobalCurrentOrg>({currentOrg: '', setCurrentOrg: () => {}});