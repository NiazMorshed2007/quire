import {createContext, Dispatch} from "react";

interface GlobalAppearance {
    isDarkMode: boolean,
    setIsDarkMode: Dispatch<boolean>
}

export const IsDarkMode = createContext<GlobalAppearance>({isDarkMode: false, setIsDarkMode: () => {}});