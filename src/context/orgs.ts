import {createContext, Dispatch} from "react";
import {IOrg} from "../interfaces/OrgInterface";

interface GlobalOrgs {
    orgs: IOrg[],
    setOrgs: Dispatch<IOrg[]>
}

export const Orgs = createContext<GlobalOrgs>({orgs: [], setOrgs: () => {}});