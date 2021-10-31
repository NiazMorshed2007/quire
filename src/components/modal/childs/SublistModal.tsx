import React, {FC} from 'react';

interface Props {
    setListContents: any
    buttons: any
}

const SublistModal: FC<Props> = ({setListContents, buttons}) => {
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
        <div className="btn-wrapper">
        {buttons}
        </div>
    </div>
}

export default SublistModal;