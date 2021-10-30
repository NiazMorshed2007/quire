import React, {FC, useContext, useEffect, useRef} from 'react';
import {OpenModal} from "../../context/modalContext";
import useClickOutside from "../../hooks/useClickOutside";
import {TweenMax, Power2} from 'gsap';

interface Props {
    changeRender: any
}

const MyModal: FC<Props> = ({children,changeRender }) => {
    const {showModal, setShowModal} = useContext(OpenModal);
    let contentRef = useRef(null);
     contentRef = useClickOutside(() => {
        setShowModal(false);
        changeRender(false);
    })
useEffect(() => {
    TweenMax.to(contentRef.current, .6, {y: '0%', ease: Power2.easeOut})
}, [])
    return <div className={`modal-wrapper ${showModal && 'active-modal'}`}>
        <div ref={contentRef} className="modal-content shadow">{children}</div>
    </div>
}

export default MyModal;