import React, {FC, useContext} from 'react';
import Header from "../../components/Header";
import {User} from "../../context/user";
import {Route} from "react-router-dom";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";

const UserSpace: FC = ({children}) => {
    const {user}: any = useContext(User);
    return <>
    <Header type='USER' name={user.user.displayName} tabs={[{text: 'My Tasks', id: 'my_tasks'},{text: 'Overview', id:'overview'}]} />
        <Route path='/u/overview'>
            <Overview>
                <BaseInfo type='USER' title={user.user.displayName}/>
            </Overview>
        </Route>
    </>
}

export default UserSpace;