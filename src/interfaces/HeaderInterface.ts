import {ITabs} from "./TabInterface";

export interface IHeader {
    name: string,
    tabs: {text: string, id: string}[],
    type: string
    org?: any
    project?: any
}