import {ITask} from "./TaskInterface";
import {IStatuses} from "./statusesInterface";

export interface ITabs {
    text: string,
    id: string,
    tasks: ITask[],
    statuses?: IStatuses[],
    iconIndex?: any,
}