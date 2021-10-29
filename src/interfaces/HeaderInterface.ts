import {IProject} from "./ProjectInterface";

export interface IHeader {
    name: string,
    tabs: {text: string, id: string}[],
    type: string
    project?: IProject[]
}