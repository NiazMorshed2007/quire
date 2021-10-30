import React, {FC, JSXElementConstructor} from 'react';

interface Props {
    setListContents: any
}

const SublistModal: FC<Props> = ({setListContents}) => {
    return <div className='sublist-modal shadow'>
        <h4>Create Sublist</h4>
        <div className='d-flex align-items-center justify-content-between'>
            <div>
                <h6>Name</h6>
                <label className='d-flex'>
                    {setListContents}
                </label>
            </div>
            <label>

            </label>
        </div>
    </div>
}

export default SublistModal;