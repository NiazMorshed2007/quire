import {createContext} from "react";

interface GlobalAppearance {
    isDarkMode: boolean,
    setIsDarkMode: (set: boolean) => void
}

export const IsDarkMode = createContext<GlobalAppearance>({isDarkMode: false, setIsDarkMode: () => {}});