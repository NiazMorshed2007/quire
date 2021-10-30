import {createContext} from "react";

interface GlobalModal {
    showModal: boolean,
    setShowModal: (set: boolean) => void
}

export const OpenModal = createContext<GlobalModal>({showModal: false, setShowModal: () => {}});