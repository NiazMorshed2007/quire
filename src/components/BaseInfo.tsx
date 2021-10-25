import React, {FC, useContext} from 'react';
import {IbaseInfo} from "../interfaces/IbaseInfo";
import {User} from '../context/user';
import {FiMail, MdOutlineModeEditOutline} from 'react-icons/all';

const BaseInfo: FC<IbaseInfo> = ({img}) => {
    const {user}: any = useContext(User);
    return <div className='base-info d-flex align-items-center gap-3'>
        <div className="avatar-wrapper user">
            <img src={user.user.photoURL} alt=""/>
        </div>
        <div className="content-wrapper">
            <div className="up d-flex justify-content-between">
                <h5 className='category m-0'>User</h5>
                <i>
                    <MdOutlineModeEditOutline/>
                </i>
            </div>
            <h2>{user.user.displayName}</h2>
            <p className="m-0">Joined on Oct 25, 2021</p>
            <p className='m-0 mail d-flex gap-1 align-items-center'>
                <FiMail/>
                <span>{user.user.email}</span>
            </p>
        </div>
    </div>
}

export default BaseInfo;