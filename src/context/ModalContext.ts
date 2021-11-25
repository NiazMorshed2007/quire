import {createContext, Dispatch} from "react";

interface GlobalModal {
    renderModal: boolean,
    setRenderModal: Dispatch<boolean>
}

export const ModalContext = createContext<GlobalModal>({renderModal: false, setRenderModal: () => {}});