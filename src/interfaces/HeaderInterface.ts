import {ITask} from "./TaskInterface";

export interface IHeader {
    name: string,
    tabs: {text: string, id: string, tasks?: ITask[]}[],
    type: string
    org?: any
    project?: any
}