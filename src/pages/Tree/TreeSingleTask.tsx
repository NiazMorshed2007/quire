import React, {FC, useState} from 'react';
import {Dropdown, Menu} from "antd";
import {
    AiOutlinePlus,
    AiOutlineUser,
    BsArrowUp,
    BsCalendar4Week,
    BsCircle, BsFillCheckCircleFill,
    BsTag,
    RiPlayListAddLine
} from "react-icons/all";

interface TaskProps {
    name: string,
    dltfunc: () => void
    completedFunc: () => void
    status: string
}

const TreeSingleTask: FC<TaskProps> = (props) => {
    const {name, dltfunc, completedFunc, status} = props;
    const [completedIc, setCompletedIc] = useState<boolean>(false);
    return <>
        <Dropdown overlay={(<Menu>
            <Menu.Item>kadsgf</Menu.Item>
            <Menu.Item onClick={dltfunc}>Delete</Menu.Item>
        </Menu>)} trigger={['contextMenu']}>
            <div className={`single-task ${status === 'completed' && 'completed-task'} pointer px-3 position-relative`}>
                <div className="main-single-task d-flex align-items-center justify-content-between">
                    <div className="task-name">
                        {status === 'completed' ?
                            <del>{name}</del> :
                        <p className='m-0'>{name}</p>
                        }
                    </div>
                    <div className="others d-flex align-items-center gap-5 px-2">
                        <BsTag/>
                        <BsCalendar4Week/>
                        <AiOutlineUser/>
                    </div>
                </div>
                <div className='before-list d-flex gap-1 position-absolute'>
                    <i onClick={completedFunc} className='completed-icon' onMouseOver={() => setCompletedIc(true)}
                       onMouseLeave={() => setCompletedIc(false)}>
                        {status === 'completed' ?
                            <BsFillCheckCircleFill style={{color: '#79ab16'}}/> :
                            <>{completedIc ? <BsFillCheckCircleFill style={{color: '#79ab16'}}/> : <BsCircle/>}</>
                        }
                    </i>
                    <i className='priority'>
                        <BsArrowUp/>
                    </i>
                </div>
                <div className="after-list d-flex gap-1 position-absolute">
                    <RiPlayListAddLine/>
                    <AiOutlinePlus/>
                </div>
            </div>
        </Dropdown>
    </>
}

export default TreeSingleTask;