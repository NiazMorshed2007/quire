import React, {FC, useContext} from 'react';
import BaseInfo from "../../components/BaseInfo";
import {User} from "../../context/user";

const Overview: FC = () => {
    const {user}: any = useContext(User);
    return <div className='overview'>
        <BaseInfo img={user.user.photoURL} />
    </div>
}

export default Overview;