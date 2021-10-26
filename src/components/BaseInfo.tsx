import React, {FC, useContext} from 'react';
import {IbaseInfo} from "../interfaces/IbaseInfo";
import {User} from '../context/user';
import {FiMail, MdOutlineModeEditOutline} from 'react-icons/all';

const BaseInfo: FC<IbaseInfo> = ({img}) => {
    const {user}: any = useContext(User);
    return <div className='base-info d-flex align-items-center gap-3'>
        <div className="avatar-wrapper user overflow-hidden">
            <img src={user.user.photoURL} className='fitimage' alt=""/>
        </div>
        <div className="content-wrapper">
            <div className="up d-flex justify-content-between text-silver">
                <h5 className='category pt-1 uppercase'>User</h5>
                <i className='pointer'>
                    <MdOutlineModeEditOutline/>
                </i>
            </div>
            <h1 className='mt-0'>{user.user.displayName}</h1>
            <p className="m-0 text-silver">Joined on Oct 25, 2021</p>
            <p className='m-0 mt-2 mail d-flex gap-2 align-items-center'>
                <FiMail className='text-silver' />
                <span>{user.user.email}</span>
            </p>
        </div>
    </div>
}

export default BaseInfo;