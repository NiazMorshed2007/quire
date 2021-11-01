import React, {FC} from "react";
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
import Tree from "../../components/Tree/Tree";

interface Props {
    type: string
    tabs?: ITabs[],
    sublists?: ITabs[],
}

const TasksPage: FC<Props> = ({tabs, sublists, type}) => {
    const {subListId}: any = useParams();
    const sublist: any = sublists && sublists.find(({id}) => id === subListId);
    const listTab: any = tabs && tabs.find(({id}) => id === 'lists');
    const tasks: ITask[] = sublist ? sublist.tasks : listTab && listTab.tasks;

    return <div className='task-page overflow-auto custom-scrollbar position-relative'>
        <header className='d-flex align-items-center justify-content-between position-fixed'>
            <Dropdown overlay={(
                <Menu>
                    <Menu.Item icon={<FiPieChart/>}>
                        Active Tasks
                    </Menu.Item>
                    <Menu.Item icon={<BsListTask/>}>
                        All Tasks
                    </Menu.Item>
                    <Menu.Item icon={<AiOutlineUser/>}>
                        My Tasks
                    </Menu.Item>
                    <Menu.Item icon={<FiUsers/>}>
                        Group by assigne
                    </Menu.Item>
                    <Menu.Item icon={<BsCalendar3/>}>
                        Group by date
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item icon={<FiSettings/>}>
                        Customize
                    </Menu.Item>
                </Menu>
            )} trigger={['click']}>
                <div className='filter pointer'>
                    <FiFilter/>
                    <MdArrowDropDown/>
                </div>
            </Dropdown>
        </header>
        <div className="main-wrapper pt-5">
            <div className="inner-main">
                <Tree type={type} tasks={tasks && tasks} />
            </div>
        </div>
    </div>
}

export default TasksPage;