import React, {FC, useEffect, useRef} from 'react';
import useClickOutside from "../../hooks/useClickOutside";
import {Power2, TweenMax} from 'gsap';

interface Props {
    changeRender: any
}

const MyModal: FC<Props> = ({children,changeRender }) => {
    let contentRef = useRef(null);
     contentRef = useClickOutside(() => {
        changeRender(false);
    })
useEffect(() => {
    TweenMax.to(contentRef.current, .6, {y: '0%', ease: Power2.easeOut})
}, [])
    return <div className='my-modal-wrapper'>
        <div ref={contentRef} className="my-modal-content d-flex">{children}</div>
    </div>
}

export default MyModal;