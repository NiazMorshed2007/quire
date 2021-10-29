import React, {FC, useContext} from 'react';
import {
    AiOutlinePlus,
    AiOutlineUser,
    BsSunFill,
    FiSettings,
    MdDarkMode,
    MdPeopleOutline,
    MdWorkspacesOutline
} from 'react-icons/all';
import {IsDarkMode} from "../../context/isDarkMode";
import {Link, useHistory} from "react-router-dom";
import {Dropdown, Menu} from 'antd';
import {CurrentOrg} from "../../context/currentOrg";


interface Props {
    expand: boolean,
    setExpand: (set: boolean) => void,
    expandSubMenu: boolean,
    setExpandSubMenu: (set: boolean) => void,
    setActiveMenu: (index: number | null) => void
}


const SidebarMenu: FC<Props> = ({expand, setExpand, expandSubMenu, setExpandSubMenu, setActiveMenu}) => {
    const history = useHistory();
    const {currentOrg} = useContext(CurrentOrg);
    console.log(currentOrg);
    const {isDarkMode, setIsDarkMode}: any = useContext(IsDarkMode);
    const firstItems = [{
        class: 'workspace',
        icon: <MdWorkspacesOutline/>
    }, {class: 'members', icon: <MdPeopleOutline/>}]
    const toggleDarkMode = (): void => {
        setIsDarkMode(!isDarkMode);
    }
    const createDropdown = (
        <Menu>
            <Menu.Item key="0">
                <Link className='text-decoration-none' to={`/c?org_id=${currentOrg}&&type=project`}>
                    Add Project
                </Link>
            </Menu.Item>
            <Menu.Item key="1">
                <Link className='text-decoration-none' to={`/c?type=org`}>
                    Add Organization
                </Link>
            </Menu.Item>
        </Menu>
    );
    return <div style={{width: expand ? '280px' : '60px',}}
                className={`menu ${isDarkMode && 'dark'} d-flex align-items-center justify-content-between flex-column h-100 position-relative shadow`}>
        <div className="first">
            <div onClick={() => setExpand(!expand)} className="burger-wrapper">
                <div className="burger">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <Dropdown overlay={createDropdown} trigger={['click']}>
                <div>
                    <i>
                        <AiOutlinePlus/>
                    </i>
                </div>
            </Dropdown>

            <div onClick={() => history.push('/u/overview')} className='create'>
                <i>
                    <AiOutlineUser/>
                </i>
            </div>
            {firstItems.map((el, i) => (
                <div className={`${el.class}`} onClick={() => {
                    !expand && setExpandSubMenu(!expandSubMenu);
                    setActiveMenu(i)
                }} key={el.class}>
                    <i>
                        {el.icon}
                    </i>
                </div>
            ))}

        </div>
        <div className="second">
            <div className="settings">
                <i>
                    <FiSettings/>
                </i>
            </div>
            <div onClick={toggleDarkMode} className="night-mode">
                <i>
                    {isDarkMode ? <BsSunFill/> : <MdDarkMode/>}
                </i>
            </div>
        </div>
    </div>
}

export default SidebarMenu;
