import React, {FC, useContext} from 'react';
import {
    AiOutlinePlus,
    AiOutlineSearch,
    AiOutlineUser,
    BsSunFill,
    FiSettings,
    MdDarkMode,
    MdPeopleOutline,
    MdWorkspacesOutline
} from 'react-icons/all';
import {IsDarkMode} from "../../context/isDarkMode";


interface Props {
    expand: boolean,
    setExpand: (set: boolean) => void,
    expandSubMenu: boolean,
    setExpandSubMenu: (set: boolean) => void,
    setActiveMenu: (index: number | null) => void
}

const Menu: FC<Props> = ({expand, setExpand, expandSubMenu, setExpandSubMenu, setActiveMenu}) => {
    const {isDarkMode, setIsDarkMode}: any = useContext(IsDarkMode);
    const firstItems = [{class: 'userspace', icon: <AiOutlineUser />}, {class: 'workspace', icon: <MdWorkspacesOutline />}, {class: 'create', icon: <AiOutlinePlus />}, {class: 'members', icon: <MdPeopleOutline />}]
    const toggleDarkMode = (): void => {
        setIsDarkMode(!isDarkMode);
    }
    return <div style={{width: expand ? '280px' : '60px',}} className={`menu ${isDarkMode && 'dark'} d-flex align-items-center justify-content-between flex-column h-100 position-relative shadow`}>

       <div className="first">
        <div onClick={() => setExpand(!expand)} className="burger-wrapper">
            <div className="burger">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

           {firstItems.map((el, i) => (
               <div className={`${el.class}`} onClick={() => {!expand && setExpandSubMenu(!expandSubMenu); setActiveMenu(i)}} key={el.class}>
                   <i>
                       {el.icon}
                   </i>
               </div>
           ))}
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

export default Menu;
