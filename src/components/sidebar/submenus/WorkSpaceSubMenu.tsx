import React, {FC, useContext} from 'react';
import {Orgs} from "../../../context/orgs";
import {NavLink} from "react-router-dom";

const WorkSpaceSubMenu: FC = () => {
    const {orgs} = useContext(Orgs);
    return <>this is the submenu of workspace
        <div className='d-flex flex-column'>

        {orgs.map((org) => (
            <NavLink to={`/w/${org.org_id}/overview`} key={org.org_id}>{org.org_name}</NavLink>
        ))}
        </div>
    </>
}

export default WorkSpaceSubMenu;