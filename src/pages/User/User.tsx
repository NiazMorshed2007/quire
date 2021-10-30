import React, {FC, useContext} from 'react';
import Header from "../../components/Header";
import {User} from "../../context/user";
import {Route} from "react-router-dom";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";
import {Acroname} from "../../functions/Acroname";
import {setRandomAvatarBack} from "../../functions/SetRandomAvatarBack";
import {Orgs} from "../../context/orgs";

const UserSpace: FC = ({children}) => {
    const {user}: any = useContext(User);
    const {orgs, setOrgs} = useContext(Orgs);
    return <>
    <Header type='USER' name={user.user.displayName} tabs={[{text: 'My Tasks', id: 'my_tasks'},{text: 'Overview', id:'overview'}]} />
        {/*<main className='main-content'>*/}
        {/*    */}
        {/*</main>*/}
        <Route path='/u/overview'>
            <Overview>
                <BaseInfo type='USER' title={user.user.displayName}/>
                <button onClick={() => {
                    setOrgs([{
                        org_name: 'new Org',
                        org_id: Math.random().toString(),
                        org_avatar_txt: Acroname('new org'),
                        org_avatar_back: setRandomAvatarBack(),
                        projects: []
                    }, ...orgs])
                }
                }>create
                </button>
            </Overview>
        </Route>
    </>
}

export default UserSpace;