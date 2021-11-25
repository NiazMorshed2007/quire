import {ITask} from "./TaskInterface";

export interface IHeader {
    name: string,
    tabs: {text: string, id: string, tasks?: ITask[]}[],
    type: 'ORG' | 'PRJ' | 'USER'
    org?: any
    project?: any
}