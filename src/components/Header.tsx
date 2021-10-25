import React, {FC} from 'react';
import {IHeader} from "../interfaces/HeaderInterface";
import {BsChevronDown, AiOutlinePlus, AiOutlineSearch, IoMdNotificationsOutline} from 'react-icons/all';
import {NavLink, useRouteMatch} from "react-router-dom";

const Header: FC<IHeader> = ({name, image, tabs}) => {
    const {url} = useRouteMatch();
    return <header className='main-header d-flex flex-column justify-content-between'>
        <div className="up d-flex align-items-center justify-content-between">
            <div className="left d-flex gap-1 align-items-center ">
                <h5 className='name m-0'>{name}</h5>
                <i>
                    <BsChevronDown/>
                </i>
            </div>
            <div className="right d-flex align-items-center gap-3">
                <i>
                    <AiOutlinePlus/>
                </i>
                <i>
                    <AiOutlineSearch/>
                </i>
                <i>
                    <IoMdNotificationsOutline/>
                </i>
                <div className="img-wrapper">
                    <img src={image} alt=""/>
                </div>
            </div>
        </div>
        <div className="down d-flex gap-1">
            {tabs.map((tab) => (
                <NavLink key={tab.id} activeClassName='active-tab' className='text-decoration-none tab text-black bg-white' to={`${url}/${tab.id}`}>
                    <p className='m-0'>{tab.text}</p>
                </NavLink>
            ))}
        </div>
    </header>
}

export default Header;