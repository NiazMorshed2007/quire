import React, {FC, useContext} from "react";
import {useParams} from "react-router-dom";
import {ITabs} from "../../interfaces/TabInterface";
import {
    AiOutlineUser,
    BsCalendar3,
    BsListTask,
    FiFilter,
    FiPieChart,
    FiSettings,
    FiUsers,
    MdArrowDropDown
} from "react-icons/all";
import {Dropdown, Menu} from "antd";
import {ITask} from "../../interfaces/TaskInterface";
import {Orgs} from "../../context/orgs";

interface Props {
    org: any
    project: any
    tabs: ITabs[],
    sublists: ITabs[]
}

const TasksPage: FC<Props> = ({org, project, tabs, sublists}) => {
    const {subListId}: any = useParams();
    const {orgs, setOrgs} = useContext(Orgs);
    const sublist: any = sublists.find(({id}) => id === subListId);
    const listTab: any = tabs.find(({id}) => id === 'lists');
    const tasks: ITask[] = sublist ? sublist.tasks : listTab.tasks;
    const handleAdd = (): void => {
        const new_task: ITask = {
            task_name: 'new' + Math.floor(Math.random()),
            task_id: 'new' + Math.random(),
        }
        tasks.push(new_task);
        setOrgs([...orgs]);
    }
    return <div className='task-page overflow-auto custom-scrollbar position-relative'>
        <header className='d-flex align-items-center justify-content-between position-fixed'>
            <Dropdown overlay={(
                <Menu>
                    <Menu.Item icon={<FiPieChart />}>
                        Active Tasks
                    </Menu.Item>
                    <Menu.Item icon={<BsListTask />}>
                        All Tasks
                    </Menu.Item>
                    <Menu.Item icon={<AiOutlineUser />}>
                        My Tasks
                    </Menu.Item>
                    <Menu.Item icon={<FiUsers />}>
                        Group by assigne
                    </Menu.Item>
                    <Menu.Item icon={<BsCalendar3 />}>
                        Group by date
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item icon={<FiSettings />}>
                        Customize
                    </Menu.Item>
                </Menu>
            )} trigger={['click']}>
            <div className='filter pointer'>
                <FiFilter />
                <MdArrowDropDown />
            </div>
            </Dropdown>
        </header>
        <div className="main-wrapper pt-5">
            <div className="inner-main">
                    <button onClick={handleAdd} className='ant-primary-btn'>Create List</button>
                {tasks.map((task) => (
                    <li key={task.task_id}>
                        {task.task_name}
                    </li>
                ))}
             </div>
        </div>
    </div>
}

export default TasksPage;