import React, {FC, useContext} from 'react';
import {ITask} from "../../interfaces/TaskInterface";
import {IStatuses} from "../../interfaces/statusesInterface";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {Orgs} from "../../context/orgs";

interface props {
    statuses: IStatuses[],
    tasks: ITask[]
    type: string,
}

const Board: FC<props> = (props) => {
    const {type, statuses, tasks} = props;
    const {orgs, setOrgs} = useContext(Orgs);
    return <>
        <div className="board h-100 custom-scrollbar">
            <DragDropContext onDragEnd={(...param) => {
                const srcI: number = param[0].source.index;
                const desI: any = param[0].destination?.index;
            }}>
                <Droppable droppableId={'droppable-1'}>
                    {provided => (
                        <div ref={provided.innerRef} className="statuses-wrapper d-flex align-items-center gap-5">
                            {statuses.map((status, i) => (
                                <Draggable key={status.id} draggableId={'draggable-' + status.id} index={i}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} className='single-status border p-2 shadow-sm' {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <div className="status-head d-flex gap-2 align-items-center">
                                                <h2>{status.name}</h2>
                                                <span>{tasks.filter((task) => task.task_status === status.id).length}</span>
                                            </div>
                                            <div className="status-lists-wrapper">
                                                <div className="status-inner-lists">
                                                    {tasks.filter((task) => {
                                                        return task.task_status === status.id
                                                    }).map((task) => (
                                                        <div key={task.task_id}>{task.task_name}</div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    </>
}

export default Board;