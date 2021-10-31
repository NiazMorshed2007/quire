import React, {FC, FormEvent, useContext, useState} from 'react';
import TreeSingleTask from "./TreeSingleTask";
import useClickOutside from "../../hooks/useClickOutside";
import {ITask} from "../../interfaces/TaskInterface";
import {setId} from "../../functions/SetId";
import {Orgs} from "../../context/orgs";

interface Props {
    tasks: ITask[]
}

const Tree: FC<Props> = ({tasks}) => {
    const {orgs, setOrgs} = useContext(Orgs);
    const [taskText, setTaskText] = useState<string>('');
    const handleAdd = (e: FormEvent): void => {
        e.preventDefault();
        if (taskText !== '') {
            const new_task: ITask = {
                task_name: taskText,
                task_id: setId(taskText),
            }
            tasks.push(new_task);
            setOrgs([...orgs]);
        }
        setTaskText('');
    }
    const handleDelete = (id: string): void => {
        const delete_index: number = tasks.findIndex(({task_id}) => task_id === id);
        tasks.splice(delete_index, 1);
        setOrgs([...orgs]);
    }
    let addingRef = useClickOutside(() => {
        setShowAddingOptionInput(false);
    })
    const [showAddingOptionInput, setShowAddingOptionInput] = useState<boolean>(false);
    return <div className="tree">
        <div className="tasks-wrapper pb-3 d-flex flex-column">
            {tasks.map((task, i) => (
                <TreeSingleTask dltfunc={()=> handleDelete(task.task_id)} tasks={tasks} name={task.task_name} id={task.task_id} key={task.task_id + '-' + i}/>
            ))}
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