import {createContext, Dispatch} from "react";
import {ITask} from "../interfaces/TaskInterface";

interface GlobalMyTask {
    myTasks: ITask[],
    setMyTasks: Dispatch<ITask[]>
}

export const MyTasks = createContext<GlobalMyTask>({myTasks: [], setMyTasks: () => {}});