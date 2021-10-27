import React, {FC, useState} from 'react';
import Menu from "./Menu";
import SubMenu from "./SubMenu";

const SideBar: FC = () => {
    const [activeMenu, setActiveMenu] = useState<null | number>(null);
    const [expand, setExpand] = useState<boolean>(false);
    const [expandSubMenu, setExpandSubMenu] = useState<boolean>(false);
    return <div className="sidebar">
        <SubMenu expand={expand} expandSubMenu={expandSubMenu} setExpandSubmenu={setExpandSubMenu} activeMenu={activeMenu} />
        <Menu expand={expand} setExpand={setExpand} setExpandSubMenu={setExpandSubMenu} expandSubMenu={expandSubMenu} setActiveMenu={setActiveMenu} />
    </div>
}

export default SideBar;