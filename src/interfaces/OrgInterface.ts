import {IProject} from "./ProjectInterface";

export interface IOrg {
    org_name: string,
    org_id: string,
    org_avatar_txt?: string,
    org_avatar_back?: string,
    projects?: IProject[]
}