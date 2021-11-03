import {ITask} from "./TaskInterface";

export interface ISubilsts {
    text: string,
    id: string,
    tasks: ITask[],
    iconIndex: number,
    color: string
}