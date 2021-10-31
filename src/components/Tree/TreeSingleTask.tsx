import React, {FC} from 'react';
import {ITask} from "../../interfaces/TaskInterface";
import {Dropdown, Menu} from "antd";
import {AiOutlinePlus, BsArrowUp, BsCircle, RiPlayListAddLine} from "react-icons/all";

interface TaskProps {
    tasks: ITask[]
    name: string,
    id: string,
    dltfunc:() => void
}

const TreeSingleTask: FC<TaskProps> = ({name, id, tasks, dltfunc}) => {
    // const {orgs, setOrgs} = useContext(Orgs);
    return <>
        <Dropdown overlay={(<Menu>
            <Menu.Item>kadsgf</Menu.Item>
            <Menu.Item onClick={dltfunc}>Delete</Menu.Item>
        </Menu>)} trigger={['contextMenu']}>
            <div className='single-task pointer px-3 position-relative'>
                {name}
                <div className="before-list d-flex gap-1 position-absolute">
                    <BsArrowUp />
                    <BsCircle />
                </div>
                <div className="after-list d-flex gap-1 position-absolute">
                    <RiPlayListAddLine />
                    <AiOutlinePlus />
                </div>
            </div>
        </Dropdown>
    </>
}

export default TreeSingleTask;