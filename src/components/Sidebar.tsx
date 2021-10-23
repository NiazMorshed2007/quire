import React, {FC, useState} from 'react';
import {AiOutlinePlus, MdWorkspacesOutline, AiOutlineUser, MdPeopleOutline} from 'react-icons/all';

const SideBar: FC = () => {
    const [expand, setExpand] = useState<boolean>(false);
    return <div style={{width: expand ? '280px' : '60px',}} className={`sidebar d-flex align-items-center flex-column overflow-hidden h-100 position-relative shadow`}>
        <div className="burger-wrapper">
            <div onClick={() => setExpand((expand) => (!expand))} className="burger">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

        <div className="userspace">
            <i>
                <AiOutlineUser />
            </i>
        </div>
        <div className="workspace">
            <i>
                <MdWorkspacesOutline />
            </i>
        </div>
        <div className="create d-flex align-items-center">
            <i>
                <AiOutlinePlus />
            </i>
        </div>
        <div className="members">
            <i>
                <MdPeopleOutline />
            </i>
        </div>
        {expand ? <></> : <>
        </>}
    </div>
}

export default SideBar;