import React, {FC, useContext} from 'react';
import {IHeader} from "../interfaces/HeaderInterface";
import {
    AiOutlineAppstore, AiOutlineFile,
    AiOutlinePlus,
    AiOutlineSearch,
    AiOutlineUser,
    BsChevronDown, BsCreditCard2Front, BsFullscreen,
    BsPencil,
    BsThreeDots, FiSettings, GoTrashcan,
    IoMdNotificationsOutline
} from 'react-icons/all';
import {NavLink, useHistory, useRouteMatch} from "react-router-dom";
import {User} from "../context/user";
import {Dropdown, Menu} from 'antd';
import {CurrentOrg} from "../context/currentOrg";
import {Orgs} from "../context/orgs";

const { SubMenu } = Menu;

const Header: FC<IHeader> = ({name, tabs, type}) => {
    const {url} = useRouteMatch();
    const {user}: any = useContext(User);
    const history = useHistory();
    const {currentOrg} = useContext(CurrentOrg);
    const {orgs, setOrgs} = useContext(Orgs);
    const handleDelete = (): void => {
        if(type === 'ORG') {
            const org_index = orgs.findIndex(({org_id}) => org_id === currentOrg);
            orgs.splice(org_index, 1);
            history.push('/u')
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