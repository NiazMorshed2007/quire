import React, {FC, useContext} from 'react';
// import BaseInfo from "../../components/BaseInfo";
// import {User} from "../../context/user";

const Overview: FC = ({children}) => {
    // const {user}: any = useContext(User);
    return <div className='overview'>
        {children}
    </div>
}

export default Overview;