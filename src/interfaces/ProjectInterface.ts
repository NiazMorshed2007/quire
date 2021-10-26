import {ITabs} from "./TabInterface";

export interface IProject {
    project_name: string,
    project_id: string,
    project_avatar_txt?: string,
    project_avatar_back?: string,
    tabs: ITabs[]
}