import React, {FC, useContext} from 'react';
import {IHeader} from "../interfaces/HeaderInterface";
import {AiOutlineSearch, BsChevronDown, IoMdNotificationsOutline} from 'react-icons/all';
import {NavLink, useHistory, useRouteMatch} from "react-router-dom";
import {User} from "../context/user";
import { Menu, Dropdown } from 'antd';
import {CurrentOrg} from "../context/currentOrg";

const { SubMenu } = Menu;

const Header: FC<IHeader> = ({name, tabs, type}) => {
    const {url} = useRouteMatch();
    const {user}: any = useContext(User);
    const history = useHistory();
    const {currentOrg} = useContext(CurrentOrg);
    const menu = (
        <Menu>
            {type === 'ORG' &&
            <>
                <Menu.Item>
                    Edit name & description
                </Menu.Item>
                <Menu.Item>
                    Edit members
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    Enter Full Screen
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={() => history.push(`/c?org_id=${currentOrg}&&type=project`)}>
                    Add Project
                </Menu.Item>
                <Menu.Item>
                    Manage subscription
                </Menu.Item>
                <Menu.Item>
                    Manage developer apps
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item>
                    Export
                </Menu.Item>
                <SubMenu title="sub menu">
                    <Menu.Item>3rd menu item</Menu.Item>
                    <Menu.Item>4th menu item</Menu.Item>
                </SubMenu>
                <Menu.Divider />
                <Menu.Item>
                    Options
                </Menu.Item>
            </>
            }
        </Menu>
    );
    return <header className='main-header d-flex flex-column justify-content-between'>
        <div className="up d-flex align-items-center justify-content-between">
            <div className="left d-flex gap-1 align-items-center ">
                <h5 className='name m-0'>{name}</h5>
                <Dropdown className='pointer d-flex align-items-center' overlay={menu} trigger={['click']}>
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