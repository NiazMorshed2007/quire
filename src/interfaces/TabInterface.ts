import {ITask} from "./TaskInterface";
import {Component} from "react";

export interface ITabs {
    text: string,
    id: string,
    tasks: ITask[],
    icon?: Component
}