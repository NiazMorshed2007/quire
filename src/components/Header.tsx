import React, {FC, useContext, useState} from 'react';
import {IHeader} from "../interfaces/HeaderInterface";
import {
    AiOutlineAppstore,
    AiOutlineFile,
    AiOutlinePlus, AiOutlinePushpin,
    AiOutlineSearch,
    AiOutlineUser,
    BiMessageDetail, BsArchive,
    BsChevronDown,
    BsCircle,
    BsCreditCard2Front,
    BsEye,
    BsFullscreen,
    BsHouse,
    BsJournalBookmark,
    BsPencil,
    BsPlusCircleFill,
    BsPrinter,
    BsTag,
    BsThreeDots, BsTrash,
    FiSettings,
    GoTrashcan,
    GrDocumentCsv,
    IoMdArrowDropdown,
    IoMdNotificationsOutline,
    RiFolderReceivedLine,
    VscListSelection
} from 'react-icons/all';
import {NavLink, useHistory, useRouteMatch} from "react-router-dom";
import {User} from "../context/user";
import {Button, Dropdown, Menu} from 'antd';
import {CurrentOrg} from "../context/currentOrg";
import {Orgs} from "../context/orgs";
import {IProject} from "../interfaces/ProjectInterface";
import {ITabs} from "../interfaces/TabInterface";
import MyModal from "./modal/Modal";
import DeleteModal from "./modal/childs/DeleteModal";
import SublistModal from "./modal/childs/SublistModal";
import {setId} from "../functions/SetId";
import {useTransition} from "react-spring";

const {SubMenu} = Menu;

const Header: FC<IHeader> = ({name, tabs, type, org, project}) => {
    const {url} = useRouteMatch();
    const {user}: any = useContext(User);
    const history = useHistory();
    const {currentOrg} = useContext(CurrentOrg);
    const {orgs, setOrgs} = useContext(Orgs);
    let [renderModal, setRenderModal] = useState<boolean>(false);
    const [sublistText, setSubListText] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const animateModal = useTransition(renderModal, {
        from: {opacity: 0, y: '-100%'},
        enter: {opacity: 1, y: '0%'},
        leave: {opacity: 0, y: '-100%'}
    });
    const [deleteModalType, setDeleteModalType] = useState<{ type: string, name: string, }>({
        type: '',
        name: '',
    });
    const projects: IProject[] = org && org.projects;
    const sublists: ITabs[] = project && project.sublists;
    const handleAddSublist = (): void => {
        const newSubList: ITabs = {
            text: sublistText,
            id: setId(sublistText),
            tasks: []
        }
        sublists.push(newSubList);
        setOrgs([...orgs]);
        history.push(`${url}/tasks/${setId(sublistText)}`);
        setSubListText('');
        setRenderModal(false);
    }
    const handleDelete = (): void => {
        if (deleteModalType.type === 'organization') {
            const org_index: number = orgs.findIndex(({org_id}) => org_id === currentOrg);
            orgs.splice(org_index, 1);
            history.push('/u')
            setOrgs([...orgs]);
        } else if (deleteModalType.type === 'project') {
            const project_index: number = projects.findIndex(({project_name}) => project_name === name);
            projects.splice(project_index, 1);
            history.push(`/w/o/${currentOrg}/overview`);
            setOrgs([...orgs]);
        }
    }
    return <header className='main-header d-flex flex-column justify-content-between'>
        {/*modal start*/}
        {animateModal((style, item) =>
            item &&
            <MyModal useStyle={style} render={renderModal}
                             changeRender={(renderModal: boolean | ((prevState: boolean) => boolean)) => setRenderModal(renderModal)}>
                    {modalType === 'delete' && <DeleteModal changeRender={(renderModal: boolean | ((prevState: boolean) => boolean)) => setRenderModal(renderModal)}
                                                            type={deleteModalType.type} name={deleteModalType.name}>
                        <label className='d-flex gap-1 align-items-center pt-2'>
                            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
                            I am aware that I <strong>cannot undo</strong> this.
                        </label>
                        <hr/>
                        <p className="des">
                            If you choose to upgrade your subscription plan, the deleted organization can be restored within 7 days.
                        </p>
                        <div className="btn-wrapper d-flex gap-2 align-items-center justify-content-end pt-3">
                            <Button className={`${checked &&  'ant-danger-btn'}`} onClick={handleDelete} disabled={!checked}>
                                Delete
                            </Button>
                            <Button onClick={() => setRenderModal(false)} className='ant-default-btn'>
                                Cancel
                            </Button>
                        </div>
                    </DeleteModal>}
                    {modalType === 'sublist' &&
                    <SublistModal buttons={<>
                        <Button onClick={() => {
                            handleAddSublist();
                        }} className={`${sublistText !== '' &&  'ant-primary-btn'}`} disabled={sublistText === ''}>
                            Create
                        </Button>
                        <Button onClick={() => setRenderModal(false)} className='ant-default-btn'>
                            Cancel
                        </Button>
                    </>} setListContents={<>
                        <span className='customization d-flex gap-1 align-items-center'><VscListSelection />
                        <Dropdown trigger={['click']} overlay={(<Menu>
                            <Menu.Item>afd</Menu.Item>
                        </Menu>)}>
                            <IoMdArrowDropdown />
                        </Dropdown>
                        </span>
                        <input value={sublistText} onChange={(e) => setSubListText(e.target.value)} type="text"/>
                    </>} />
                    }
                </MyModal>
        )}
        {/*modal items end*/}
        <div className="up d-flex align-items-center justify-content-between">
            <div className="left d-flex gap-1 align-items-center ">
                <h5 className='name m-0'>{name}</h5>
                <Dropdown className='pointer d-flex align-items-center' overlay={(

                    <Menu className='ant-menu'>
                        {type === 'ORG' &&
                        <>
                            <Menu.Item key={1} icon={<BsPencil/>}>
                                Edit name & description
                            </Menu.Item>
                            <Menu.Item key={2} icon={<AiOutlineUser/>}>
                                Edit members
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key={3} icon={<BsFullscreen/>}>
                                Enter Full Screen
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key={4} icon={<AiOutlinePlus/>}
                                       onClick={() => history.push(`/c?org_id=${currentOrg}&type=project`)}>
                                Add Project
                            </Menu.Item>
                            <Menu.Item key={5} icon={<BsCreditCard2Front/>}>
                                Manage subscription
                            </Menu.Item>
                            <Menu.Item key={6} icon={<AiOutlineAppstore/>}>
                                Manage developer apps
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key={7} icon={<AiOutlineFile/>}>
                                Export
                            </Menu.Item>
                            <SubMenu key={8} icon={<BsThreeDots/>} title='More'>
                                <Menu.Item onClick={() => {
                                    setRenderModal(true);
                                    setModalType('delete');
                                    setDeleteModalType({type: 'organization', name: org.org_name,})
                                }} icon={<GoTrashcan/>}
                                           key={'delete'}>Delete...</Menu.Item>
                            </SubMenu>
                            <Menu.Divider/>
                            <Menu.Item key={9} icon={<FiSettings/>}>
                                Options
                            </Menu.Item>
                        </>
                        }
                        {type === 'PRJ' &&
                        <>
                            <Menu.Item onClick={() => history.push(`/w/o/${currentOrg}/overview`)} key={1}
                                       icon={<BsHouse/>}>
                                Go to {org.org_name}
                            </Menu.Item>
                            <Menu.Item key={2} icon={<BsJournalBookmark/>}>
                                Go to other projects...
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key={3} icon={<BsPencil/>}>
                                Edit name & description
                            </Menu.Item>
                            <Menu.Item key={4} icon={<AiOutlineUser/>}>
                                Edit members
                            </Menu.Item>
                            <Menu.Item key={5} icon={<BsCircle/>}>
                                Edit statuses
                            </Menu.Item>
                            <Menu.Item key={'edit'} icon={<BsTag/>}>
                                Edit tags
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key={6} icon={<BsFullscreen/>}>
                                Enter Full Screen
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key={7} icon={<BsEye/>}>
                                Follow
                            </Menu.Item>
                            <Menu.Item key={8} icon={<BiMessageDetail/>}>
                                Comment
                            </Menu.Item>
                            <Menu.Item key={9} icon={<BsPrinter/>}>
                                Print...
                            </Menu.Item>
                            <Menu.Divider/>
                            <SubMenu key={10} icon={<RiFolderReceivedLine/>} title='Import'>
                                <Menu.Item icon={<GrDocumentCsv/>} key={'csv'}>CSV</Menu.Item>
                            </SubMenu>
                            <SubMenu key={11} icon={<BsThreeDots/>} title='More'>
                                <Menu.Item onClick={() => {
                                    setRenderModal(true);
                                    setModalType('delete');
                                    setDeleteModalType({
                                        type: 'project',
                                        name: project.project_name,
                                    })
                                }} icon={<GoTrashcan/>}
                                           key={'delete'}>Delete...</Menu.Item>
                            </SubMenu>
                            <Menu.Divider/>
                            <Menu.Item key='options' icon={<FiSettings/>}>
                                Options
                            </Menu.Item>
                        </>
                        }
                    </Menu>
                )} trigger={['click']}>
                    <BsChevronDown/>
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
        <div className="down d-flex align-items-center gap-1">

            {tabs.map((tab) => (
                <NavLink key={tab.id} activeClassName='active-tab'
                         className='text-decoration-none tab' to={`${url}/${tab.id}`}>
                    <p className='m-0'>{tab.text}</p>
                </NavLink>
            ))}
            {type === 'PRJ' &&
            <div className='sublist-wrapper align-items-center d-flex px-2 gap-2'>
                {sublists.map((list) => (
                    <NavLink key={list.id} activeClassName='active-tab'
                             className='text-decoration-none tab position-relative' to={`${url}/tasks/${list.id}`}>
                        {list.icon}
                        <p className='m-0'>{list.text}</p>
                        <Dropdown trigger={['click']} overlay={(
                            <Menu>
                                <Menu.Item icon={<BsPencil />}>
                                    Edit
                                </Menu.Item>
                                <Menu.Item icon={<AiOutlinePushpin />}>
                                    Unpin
                                </Menu.Item>
                                <Menu.Item disabled icon={<AiOutlinePushpin />}>
                                    Unpin tabs to the right
                                </Menu.Item>
                                <Menu.Divider />
                                <Menu.Item icon={<BsArchive />}>
                                    Archive
                                </Menu.Item>
                                <Menu.Item icon={<BsTrash />}>
                                    Delete
                                </Menu.Item>
                            </Menu>
                        )}>
                        <IoMdArrowDropdown />
                        </Dropdown>
                    </NavLink>
                ))}
                <div onClick={() => {
                    setRenderModal(true);
                    setModalType('sublist');
                }
                }
                     className="add-sublist tab pointer border-left d-flex gap-1 align-items-center">
                    <BsPlusCircleFill className='text-silver'/>
                    <span>Add sublist</span>
                </div>
            </div>
            }
        </div>
    </header>
}

export default Header;