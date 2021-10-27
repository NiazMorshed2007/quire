import React, {FC, useContext} from 'react';
import {Orgs} from "../../../context/orgs";

const WorkSpaceSubMenu: FC = () => {
    const {orgs} = useContext(Orgs);
    return <>this is the submenu of workspace
        {orgs.map((org) => (
            <li id={org.org_id}>{org.org_name}</li>
        ))}
    </>
}

export default WorkSpaceSubMenu;