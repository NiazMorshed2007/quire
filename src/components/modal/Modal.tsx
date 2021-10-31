import React, {FC} from 'react';
import useClickOutside from "../../hooks/useClickOutside";
import {animated} from "react-spring";

interface Props {
    changeRender: any
    render: boolean,
    useStyle: any
}

const MyModal: FC<Props> = ({children,changeRender, render , useStyle}) => {
     let contentRef = useClickOutside(() => {
        changeRender(false);
    })
    return <div className='my-modal-wrapper'>
        <animated.div style={useStyle} ref={contentRef} className="my-modal-content d-flex">{children}</animated.div>
    </div>
}

export default MyModal;