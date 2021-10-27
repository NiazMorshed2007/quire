import {createContext} from "react";
import {IOrg} from "../interfaces/OrgInterface";

interface GlobalOrgs {
    orgs: IOrg[],
    setOrgs: (org: []) => void
}

export const Orgs = createContext<GlobalOrgs>({orgs: [], setOrgs: () => {}});