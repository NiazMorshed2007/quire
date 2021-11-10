import React, {Dispatch, FC, useState} from 'react';
import {Dropdown, Menu} from "antd";
import {
    AiOutlinePlus,
    AiOutlineUser,
    BsArrowDown,
    BsArrowUp,
    BsCalendar4Week,
    BsCircle,
    BsFillCheckCircleFill,
    BsTag,
    RiPlayListAddLine
} from "react-icons/all";
import {IconType} from "react-icons";

interface TaskProps {
    name: string,
    dltfunc: () => void
    completedFunc: () => void
    handlePriority: () => void,
    setPriority: Dispatch<string>
    status: string,
    priority: string,
}

const TreeSingleTask: FC<TaskProps> = (props) => {
    const {name, dltfunc, completedFunc, handlePriority, status, priority, setPriority} = props;
    const [completedIc, setCompletedIc] = useState<boolean>(false);
    const prioriyItems: { name: string, icon: IconType, color: string }[] = [{
        name: 'Urgent',
        icon: BsArrowUp,
        color: "red"
    },{
        name: 'High',
        icon: BsArrowUp,
        color: "orange"
    },{
        name: 'None',
        icon: BsArrowUp,
        color: 'silver'
    },{
        name: 'Low',
        icon: BsArrowDown,
        color: "#1ac3e3"
    }]
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
                    <Dropdown trigger={['click']} overlay={(<Menu className='priority-dropdown'>
                        {prioriyItems.map((item) => (
                            <Menu.Item onClick={() => {
                                setPriority(item.name.toLowerCase());
                                handlePriority();
                            }} key={item.name.toLowerCase()} icon={(<item.icon style={{color: item.color}}/>)}>
                                {item.name}
                            </Menu.Item>
                        ))}
                    </Menu>)}>
                        <i className={`priority ${priority !== 'none' && 'has-priority'}`}>
                            {priority === 'urgent' && <BsArrowUp style={{color: prioriyItems[0].color}} />}
                            {priority === 'high' && <BsArrowUp style={{color: prioriyItems[1].color}} />}
                            {priority === 'none' && <BsArrowUp style={{color: prioriyItems[2].color}} />}
                            {priority === 'low' && <BsArrowDown style={{color: prioriyItems[3].color}} />}
                        </i>
                    </Dropdown>
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