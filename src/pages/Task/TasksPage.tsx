import React, {FC} from "react";
import {NavLink, useLocation, useParams, useRouteMatch} from "react-router-dom";
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
import Tree from "../Tree/Tree";
import Board from "../Board/Board";

interface Props {
    type: string
    tabs?: ITabs[],
    sublists?: ITabs[],
}

const TasksPage: FC<Props> = ({tabs, sublists, type}) => {
    const {subListId}: any = useParams();
    const {url} = useRouteMatch();
    const location = useLocation();
    const sublist: any = sublists && sublists.find(({id}) => id === subListId);
    const listTab: any = tabs && tabs.find(({id}) => id === 'lists');
    const tasks: ITask[] = sublist ? sublist.tasks : listTab && listTab.tasks;
    const params = new URLSearchParams(location.search);
    const currentView: any = params.get('view');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  // const redirectFunc = () => {
  //     if(currentView === 'tree') {
  //           return <Redirect to={`/u`} />
  //     }
  // }
  //
  // useEffect(() => {
  //     redirectFunc();
  // }, [redirectFunc])

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
            <div className="views-wrapper d-flex gap-2">

                <NavLink to={`${url}?view=tree`}>
                    <i>
                        <svg width="149" height="68" viewBox="0 0 149 68" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect width="149" height="68" fill="none"/>
                            <rect width="129" height="5" fill="black"/>
                            <rect y="42" width="129" height="5" fill="black"/>
                            <rect x="34" y="21" width="95" height="5" fill="black"/>
                            <rect x="34" y="63" width="95" height="5" fill="black"/>
                        </svg>
                    </i>
                </NavLink>

                <NavLink to={`${url}?view=board`}>
                    <i>
                        <svg className='board-icon' width="529" height="387" viewBox="0 0 529 387" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <rect width="510" height="387" fill="none"/>
                            <rect id='back' width="529" height="387" fill="none"/>
                            <rect className='board-icon-part' x="176.5" y="85.5" width="39" height="218" stroke="black"
                                  strokeWidth="10"/>
                            <rect className='board-icon-part' x="243.5" y="85.5" width="39" height="154" stroke="black"
                                  strokeWidth="10"/>
                            <rect className='board-icon-part' x="319.5" y="85.5" width="39" height="218" stroke="black"
                                  strokeWidth="10"/>
                        </svg>
                    </i>
                </NavLink>
            </div>
        </header>
        <div className="main-wrapper pt-5">
            <div className="inner-main">
                {currentView === 'tree' && <Tree type={type} tasks={tasks && tasks}/>}
                {currentView === 'board' && <Board/>}
            </div>
        </div>
    </div>
}

export default TasksPage;