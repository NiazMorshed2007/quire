import React, {FC} from 'react';
import {Select} from "antd";

const {Option} = Select;

interface Props {
    setListContents: any
    buttons: any
}

const SublistModal: FC<Props> = ({setListContents, buttons}) => {
    return <div className='sublist-modal shadow'>
        <h4>Create Sublist</h4>
        <div className='primary-info d-flex align-items-center pt-1 justify-content-between'>
            <div>
                <h6>Name</h6>
                <label className='d-flex'>
                    {setListContents}
                </label>
            </div>
            <div>
                <h6>Share with</h6>
                <Select defaultValue={'project members'}>
                    <Option value='project members'>Project members</Option>
                    <Option value='only me'>Only me</Option>
                </Select>
            </div>
        </div>
        <div className="btn-wrapper">
            {buttons}
        </div>
    </div>
}

export default SublistModal;