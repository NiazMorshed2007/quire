import {ITask} from "./TaskInterface";

export interface ITabs {
    text: string,
    id: string,
    tasks: ITask[],
    iconIndex?: any
}