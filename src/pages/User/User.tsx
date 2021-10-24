import React, {FC, useContext} from 'react';
import Header from "../../components/Header";
import {User} from "../../context/user";

const UserSpace: FC = ({children}) => {
    const {user}: any = useContext(User);
    return <>
    <Header name={user.user.displayName} image={user.user.photoURL} tabs={[{text: 'My Tasks', id: 'my_tasks'},{text: 'Overview', id:'overview'}]} />
        <main className='main-content'>
            {children}
        </main>
    </>
}

export default UserSpace;