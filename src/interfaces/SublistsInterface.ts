import {ITask} from "./TaskInterface";

export interface ISubilsts {
    text: string,
    id: string,
    tasks: ITask[],
    statuses: {name: string, id: string,}[],
    iconIndex: number,
    color: string
}