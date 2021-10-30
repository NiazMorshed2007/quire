import React, {FC} from 'react';

interface Props {
    type: string
    name: string
    changeRender: any
}

const DeleteModal: FC<Props> = ({children, type, name, changeRender}) => {
    return <div className='delete-modal shadow'>
        <h4>Delete {type}</h4>
        <p className='m-0'>You are about to <strong>permanently delete</strong> the {type} <span onClick={() => changeRender(false)} className={`${type !== 'sublist' && 'primary-color pointer'}`}>{name}</span></p>
        {children}
    </div>
}

export default DeleteModal;