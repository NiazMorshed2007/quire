import React, {FC, FormEvent, useContext, useState} from 'react';
import TreeSingleTask from "./TreeSingleTask";
import useClickOutside from "../../hooks/useClickOutside";
import {ITask} from "../../interfaces/TaskInterface";
import {setId} from "../../functions/SetId";
import {Orgs} from "../../context/orgs";
import {MyTasks} from "../../context/myTask";

interface Props {
    tasks: ITask[],
    type: string
}

const Tree: FC<Props> = ({tasks, type}) => {
    const {orgs, setOrgs} = useContext(Orgs);
    const [taskText, setTaskText] = useState<string>('');
    const {myTasks, setMyTasks} = useContext(MyTasks);
    const handleAdd = (e: FormEvent): void => {
        e.preventDefault();
        if (taskText !== '') {
            const new_task: ITask = {
                task_name: taskText,
                task_id: setId(taskText),
                status: 'todo'
            }
            if (type === 'PRJ') {
                tasks.push(new_task);
                setOrgs([...orgs]);
            } else if (type === 'USER') {
                myTasks.push(new_task);
                setMyTasks([...myTasks]);
            }
        }
        setTaskText('');
    }

    const handleCompleted = (index: string): void => {
        if(type === 'PRJ') {
            tasks.filter((task) => {
                if (task.task_id === index) {
                    task.status === 'completed' ? task.status = 'todo' : task.status = 'completed'
                }
            });
        } else if(type === 'USER') {
            myTasks.filter((task) => {
                if (task.task_id === index) {
                    task.status === 'completed' ? task.status = 'todo' : task.status = 'completed'

                }
            });
        }
        setOrgs([...orgs]);
    }

    const handleDelete = (id: string): void => {
        const delete_index: number = tasks ? tasks.findIndex(({task_id}) => task_id === id) : myTasks && myTasks.findIndex(({task_id}) => task_id === id);
        if (type === 'PRJ') {
            tasks.splice(delete_index, 1);
            setOrgs([...orgs]);
        } else if (type === 'USER') {
            myTasks.splice(delete_index, 1);
            setMyTasks([...myTasks]);
        }

    }
    let addingRef = useClickOutside(() => {
        setShowAddingOptionInput(false);
    })
    const [showAddingOptionInput, setShowAddingOptionInput] = useState<boolean>(false);
    return <div className="tree">
        <div className="tasks-wrapper pb-3 d-flex flex-column">
            {type === 'PRJ' ?
                <>
                    {tasks.map((task, i) => (
                        <TreeSingleTask completedFunc={() => handleCompleted(task.task_id)}
                                        dltfunc={() => handleDelete(task.task_id)} name={task.task_name}
                                        status={task.status}
                                        key={task.task_id + '-' + i}/>
                    ))}
                </> :
                <>
                    {myTasks.map((task, i) => (
                        <TreeSingleTask completedFunc={() => handleCompleted(task.task_id)}
                                        dltfunc={() => handleDelete(task.task_id)} name={task.task_name}
                                        status={task.status}
                                        key={task.task_id + '-' + i}/>
                    ))}
                </>
            }
        </div>
        <div ref={addingRef} className="adding-option">
            {showAddingOptionInput ?
                <form onSubmit={handleAdd} className='w-100'>
                    <input value={taskText} onChange={(e) => setTaskText(e.target.value)}
                           className='h-100' placeholder='Enter your task name' type="text"/>
                </form> :
                <p onClick={() => setShowAddingOptionInput(true)}
                   className="m-0 pb-2 px-2 text-silver pointer">Click here to add task</p>
            }
        </div>
    </div>
}

export default Tree;