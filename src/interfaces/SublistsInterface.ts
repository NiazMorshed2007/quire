import {ITask} from "./TaskInterface";
import {IStatuses} from "./statusesInterface";

export interface ISubilsts {
    text: string,
    id: string,
    tasks: ITask[],
    statuses: IStatuses[],
    iconIndex: number,
    color: string
}