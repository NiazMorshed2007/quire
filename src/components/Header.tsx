import React, {FC, useContext} from 'react';
import {IHeader} from "../interfaces/HeaderInterface";
import {
    AiOutlineAppstore,
    AiOutlineFile,
    AiOutlinePlus,
    AiOutlineSearch,
    AiOutlineUser, BiMessageDetail,
    BsChevronDown, BsCircle,
    BsCreditCard2Front, BsEye,
    BsFullscreen, BsHouse, BsJournalBookmark,
    BsPencil, BsPrinter, BsTag,
    BsThreeDots,
    FiSettings,
    GoTrashcan, GrDocumentCsv,
    IoMdNotificationsOutline, RiFolderReceivedLine
} from 'react-icons/all';
import {NavLink, useHistory, useRouteMatch} from "react-router-dom";
import {User} from "../context/user";
import {Dropdown, Menu} from 'antd';
import {CurrentOrg} from "../context/currentOrg";
import {Orgs} from "../context/orgs";
import {IProject} from "../interfaces/ProjectInterface";

const { SubMenu } = Menu;

const Header: FC<IHeader> = ({name, tabs, type, project}) => {
    const {url} = useRouteMatch();
    const {user}: any = useContext(User);
    const history = useHistory();
    const {currentOrg} = useContext(CurrentOrg);
    const {orgs, setOrgs} = useContext(Orgs);
    const org: any = orgs.find(({org_id}) => org_id === currentOrg);
    const projects: IProject[] = org.projects;
    const handleDelete = (): void => {
        if(type === 'ORG') {
            const org_index: number = orgs.findIndex(({org_id}) => org_id === currentOrg);
            orgs.splice(org_index, 1);
            history.push('/u')
            setOrgs([...orgs]);
        } else if(type === 'PRJ') {
            const project_index: number = projects.findIndex(({project_name}) => project_name === name);
            projects.splice(project_index, 1);
            history.push(`/w/o/${currentOrg}/overview`);
            setOrgs([...orgs]);
        }
    }
    return <header className='main-header d-flex flex-column justify-content-between'>
        <div className="up d-flex align-items-center justify-content-between">
            <div className="left d-flex gap-1 align-items-center ">
                <h5 className='name m-0'>{name}</h5>
                <Dropdown className='pointer d-flex align-items-center' overlay={(

                    <Menu className='ant-menu'>
                        {type === 'ORG' &&
                        <>
                            <Menu.Item key={1} icon={<BsPencil />}>
                                Edit name & description
                            </Menu.Item>
                            <Menu.Item key={2} icon={<AiOutlineUser />}>
                                Edit members
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key={3} icon={<BsFullscreen />}>
                                Enter Full Screen
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key={4} icon={<AiOutlinePlus />} onClick={() => history.push(`/c?org_id=${currentOrg}&type=project`)}>
                                Add Project
                            </Menu.Item>
                            <Menu.Item key={5} icon={<BsCreditCard2Front />}>
                                Manage subscription
                            </Menu.Item>
                            <Menu.Item key={6} icon={<AiOutlineAppstore />}>
                                Manage developer apps
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key={7} icon={<AiOutlineFile />}>
                                Export
                            </Menu.Item>
                            <SubMenu key={8} icon={<BsThreeDots />} title='More'>
                                <Menu.Item onClick={handleDelete} icon={<GoTrashcan />} key={'delete'}>Delete...</Menu.Item>
                            </SubMenu>
                            <Menu.Divider />
                            <Menu.Item key={9} icon={<FiSettings />}>
                                Options
                            </Menu.Item>
                        </>
                        }
                        {type === 'PRJ' &&
                        <>
                            <Menu.Item onClick={() => history.push(`/w/o/${currentOrg}/overview`)} key={1} icon={<BsHouse />}>
                                Go to {org.org_name}
                            </Menu.Item>
                            <Menu.Item key={2} icon={<BsJournalBookmark />}>
                                Go to other projects...
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key={3} icon={<BsPencil />}>
                                Edit name & description
                            </Menu.Item>
                            <Menu.Item key={4} icon={<AiOutlineUser />}>
                                Edit members
                            </Menu.Item>
                            <Menu.Item key={5} icon={<BsCircle />}>
                                Edit statuses
                            </Menu.Item>
                            <Menu.Item key={'edit'} icon={<BsTag />}>
                                Edit tags
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key={6} icon={<BsFullscreen />}>
                                Enter Full Screen
                            </Menu.Item>
                            <Menu.Divider />
                            <Menu.Item key={7} icon={<BsEye />}>
                                Follow
                            </Menu.Item>
                            <Menu.Item key={8} icon={<BiMessageDetail />}>
                                Comment
                            </Menu.Item>
                            <Menu.Item key={9} icon={<BsPrinter />}>
                                Print...
                            </Menu.Item>
                            <Menu.Divider />
                            <SubMenu key={10} icon={<RiFolderReceivedLine />} title='Import'>
                                <Menu.Item icon={<GrDocumentCsv />} key={'csv'}>CSV</Menu.Item>
                            </SubMenu>
                            <SubMenu key={11} icon={<BsThreeDots />} title='More'>
                                <Menu.Item onClick={handleDelete} icon={<GoTrashcan />} key={'delete'}>Delete...</Menu.Item>
                            </SubMenu>
                            <Menu.Divider />
                            <Menu.Item key='options' icon={<FiSettings />}>
                                Options
                            </Menu.Item>
                        </>
                        }
                    </Menu>
                )} trigger={['click']}>
                        <BsChevronDown />
                </Dropdown>
            </div>
            <div className="right d-flex align-items-center gap-3">
                <i>
                    <AiOutlineSearch/>
                </i>
                <i>
                    <IoMdNotificationsOutline/>
                </i>
                <div className="img-wrapper">
                    <img src={user.user.photoURL} alt=""/>
                </div>
            </div>
        </div>
        <div className="down d-flex gap-1">
            {tabs.map((tab) => (
                <NavLink key={tab.id} activeClassName='active-tab'
                         className='text-decoration-none tab text-black bg-white' to={`${url}/${tab.id}`}>
                    <p className='m-0'>{tab.text}</p>
                </NavLink>
            ))}
        </div>
    </header>
}

export default Header;