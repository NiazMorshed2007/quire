import {useRef, useEffect} from "react";

let useClickOutside = (handler: () => void) => {
    let DOMnode: any = useRef<HTMLElement>();

    useEffect(() => {
        let check = (event: Event) => {
            if (!DOMnode.current.contains(event.target)) {
                handler();
            }
        };

        document.addEventListener("mousedown", check);

        return () => {
            document.removeEventListener("mousedown", check);
        };
    });

    return DOMnode;
};

export default useClickOutside;