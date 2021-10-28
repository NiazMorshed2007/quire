import React, {FC, useEffect} from 'react';
import WorkSpaceSubMenu from "./submenus/WorkSpaceSubMenu";

interface Props {
    expand: boolean,
    expandSubMenu: boolean,
    setExpandSubmenu: (set: boolean) => void,
    activeMenu: number | null
}

const SubMenu: FC<Props> = ({expand, expandSubMenu, setExpandSubmenu, activeMenu}) => {
    const SubMenuItems = [{text: 'WorkSpace', id: 1, render: <WorkSpaceSubMenu />}]
    const item = SubMenuItems.filter((e, i) => i === activeMenu);
    useEffect(() => {
        !expand ? setExpandSubmenu(false) : setExpandSubmenu(true);
    }, [expand, setExpandSubmenu])
    return <div style={{left: expandSubMenu ? '60px' : '0px', transform: `translateX(${expandSubMenu ? '0%' : '-100%'})`}} className={`sub-menu position-absolute bg-white h-100`}>
        this is the sub menu
        {item.map((el) => (
            <div key={el.id}>
                <h4>{el.text}</h4>
                {el.render}
            </div>
        ))}
    </div>
}

export default SubMenu;