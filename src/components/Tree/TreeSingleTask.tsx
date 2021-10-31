import React, {FC, useContext} from 'react';
import {ITask} from "../../interfaces/TaskInterface";
import {Orgs} from "../../context/orgs";
import {Dropdown, Menu} from "antd";

interface TaskProps {
    tasks: ITask[]
    name: string,
    id: string,
}

const TreeSingleTask: FC<TaskProps> = ({name, id, tasks}) => {
    const {orgs, setOrgs} = useContext(Orgs);
    return <>
        <Dropdown overlay={(<Menu>
            <Menu.Item>kadsgf</Menu.Item>
        </Menu>)} trigger={['contextMenu']}>
            <div className='single-task pointer px-3'>
                {name}
            </div>
        </Dropdown>
    </>
}

export default TreeSingleTask;