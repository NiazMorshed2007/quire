import React, {FC, useState} from 'react';
import SubMenu from "./SubMenu";
import SidebarMenu from "./SidebarMenu";

const SideBar: FC = () => {
    const [activeMenu, setActiveMenu] = useState<null | number>(null);
    const [expand, setExpand] = useState<boolean>(false);
    const [expandSubMenu, setExpandSubMenu] = useState<boolean>(false);
    return <div className="sidebar bg-dark">
        <SubMenu expand={expand} expandSubMenu={expandSubMenu} setExpandSubmenu={setExpandSubMenu} activeMenu={activeMenu} />
        <SidebarMenu expand={expand} setExpand={setExpand} setExpandSubMenu={setExpandSubMenu} expandSubMenu={expandSubMenu} setActiveMenu={setActiveMenu} />
    </div>
}

export default SideBar;