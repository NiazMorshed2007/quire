import React, {FC, useContext, useState} from 'react';
import {AiOutlinePlus, MdWorkspacesOutline, AiOutlineUser, MdPeopleOutline, MdDarkMode, FiSettings, BsSunFill, AiOutlineSearch} from 'react-icons/all';
import {IsDarkMode} from "../context/isDarkMode";

const SideBar: FC = () => {
    const [expand, setExpand] = useState<boolean>(false);
    const {isDarkMode, setIsDarkMode}: any = useContext(IsDarkMode);
    const toggleDarkMode = (): void => {
        setIsDarkMode(!isDarkMode);
    }
    return <div style={{width: expand ? '280px' : '60px',}} className={`sidebar ${isDarkMode && 'dark'} d-flex align-items-center justify-content-between flex-column overflow-hidden h-100 position-relative shadow`}>
       <div className="first">
        <div onClick={() => setExpand((expand) => (!expand))} className="burger-wrapper">
            <div className="burger">
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
       </div>
        <div className="second">
            <div className="search">
                <i>
                    <AiOutlineSearch />
                </i>
            </div>
            <div className="settings">
                <i>
                    <FiSettings />
                </i>
            </div>
            <div onClick={toggleDarkMode} className="night-mode">
                <i>
                    {isDarkMode ? <BsSunFill /> : <MdDarkMode />}
                </i>
            </div>
        </div>
    </div>
}

export default SideBar;
