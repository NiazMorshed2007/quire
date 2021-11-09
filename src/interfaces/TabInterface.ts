import {ITask} from "./TaskInterface";

export interface ITabs {
    text: string,
    id: string,
    tasks: ITask[],
    statuses: {name: string, id: string,}[],
    iconIndex?: any,
}