import React, {Dispatch, FC} from 'react';
import {animated} from "react-spring";

interface Props {
    changeRender: Dispatch<boolean>
    render: boolean,
    useStyle: any
}

const MyModal: FC<Props> = ({children, changeRender, render, useStyle}) => {

    const handleModal = (e: Event): void => {
        if((e.target as Element).className === 'my-modal-wrapper') {
            changeRender(false);
        }
    }

    window.addEventListener('click', handleModal);

    return <div className='my-modal-wrapper'>
        <animated.div style={useStyle} className="my-modal-content d-flex">{children}</animated.div>
    </div>
}

export default MyModal;