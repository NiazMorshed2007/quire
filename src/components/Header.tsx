import React, {FC, useContext, useState} from 'react';
import {IHeader} from "../interfaces/HeaderInterface";
import {
    AiOutlineAppstore,
    AiOutlineDislike,
    AiOutlineFile,
    AiOutlineHighlight,
    AiOutlineHome,
    AiOutlineLike,
    AiOutlinePlus,
    AiOutlinePushpin,
    AiOutlineSearch,
    AiOutlineThunderbolt,
    AiOutlineUser,
    BiMessageDetail,
    BiMoviePlay,
    BsAlarm,
    BsArchive,
    BsBug,
    BsBuilding,
    BsBullseye,
    BsChevronDown,
    BsCircle,
    BsCreditCard2Front,
    BsEmojiFrown,
    BsEmojiNeutral,
    BsEmojiSmile,
    BsEye,
    BsFullscreen,
    BsHouse,
    BsJournalBookmark,
    BsPencil,
    BsPeople,
    BsPiggyBank,
    BsPlusCircleFill,
    BsPrinter,
    BsTag,
    BsThreeDots,
    BsTrash,
    FaGraduationCap,
    FaUmbrellaBeach,
    FiDatabase,
    FiSettings,
    GiFamilyTree,
    GiHamburger,
    GoTrashcan,
    GrDocumentCsv,
    HiOutlineLightBulb,
    IoBagRemoveOutline,
    IoEarthOutline,
    IoLeafOutline,
    IoMdArrowDropdown,
    IoMdNotificationsOutline,
    IoMdPaperPlane,
    IoMusicalNotesOutline,
    IoNewspaperOutline,
    IoRocketOutline,
    IoTrophyOutline,
    MdFullscreen,
    RiFolderReceivedLine,
    VscCalendar,
    VscLibrary,
    VscListSelection,
    VscSymbolKeyword
} from 'react-icons/all';
import {useHistory, useRouteMatch} from "react-router-dom";
import {User} from "../context/user";
import {Button, Divider, Dropdown, Menu, Tabs} from 'antd';
import {CurrentOrg} from "../context/currentOrg";
import {Orgs} from "../context/orgs";
import {IProject} from "../interfaces/ProjectInterface";
import MyModal from "./modal/Modal";
import DeleteModal from "./modal/childs/DeleteModal";
import SublistModal from "./modal/childs/SublistModal";
import {setId} from "../functions/SetId";
import {useTransition} from "react-spring";
import {colorpalettes} from "../functions/colorpalettes";
import {ISubilsts} from "../interfaces/SublistsInterface";

const {SubMenu} = Menu;
const {TabPane} = Tabs;
colorpalettes.push('white');


const Header: FC<IHeader> = ({name, tabs, type, org, project}) => {
    const {url} = useRouteMatch();
    const {user}: any = useContext(User);
    const history = useHistory();
    const {currentOrg} = useContext(CurrentOrg);
    const {orgs, setOrgs} = useContext(Orgs);
    let [renderModal, setRenderModal] = useState<boolean>(false);
    const [sublistText, setSubListText] = useState<string>('');
    const [subListIcon, setSublistIcon] = useState<number>(0);
    const [sublistColor, setSublistColor] = useState<string>("white");
    const [checked, setChecked] = useState<boolean>(false);
    const [modalType, setModalType] = useState<string>('');
    const [sublistId, setSublistId] = useState<string>('');
    const animateModal = useTransition(renderModal, {
        from: {opacity: 0, y: '-100%'},
        enter: {opacity: 1, y: '0%'},
        leave: {opacity: 0, y: '-100%'}
    });
    const sublistIconsArr = [<VscListSelection/>, <VscSymbolKeyword/>, <VscLibrary/>, <VscCalendar/>, <BsAlarm/>,
        <IoBagRemoveOutline/>, <IoRocketOutline/>, <BsBug/>, <BsPeople/>, <HiOutlineLightBulb/>, <IoLeafOutline/>,
        <BiMoviePlay/>, <GiFamilyTree/>, <AiOutlineThunderbolt/>, <BsPiggyBank/>, <FaGraduationCap/>, <IoMdPaperPlane/>,
        <IoEarthOutline/>, <IoMusicalNotesOutline/>, <BsPencil/>, <FaUmbrellaBeach/>, <IoNewspaperOutline/>,
        <AiOutlineHome/>, <BsBuilding/>, <FiDatabase/>, <AiOutlineHighlight/>, <GiHamburger/>, <IoTrophyOutline/>,
        <AiOutlineLike/>,
        <AiOutlineDislike/>, <BsEmojiSmile/>, <BsEmojiFrown/>, <BsEmojiNeutral/>, <BsBullseye/>, <MdFullscreen/>]
    const [deleteModalType, setDeleteModalType] = useState<{ type: string, name: string, }>({
        type: '',
        name: '',
    });
    const projects: IProject[] = org && org.projects;
    const sublists: ISubilsts[] = project && project.sublists;
    const [activeKey, setActiveKey] = useState<string>(history.location.pathname + history.location.search)
    const handleAddSublist = (): void => {
        const newSubList: ISubilsts = {
            text: sublistText,
            id: setId(sublistText),
            iconIndex: subListIcon,
            tasks: [],
            statuses: [{name: 'To-Do', id: 'todo'}, {
                name: 'In-Progress',
                id: 'in-progress'
            }, {name: 'Completed', id: 'completed'}],
            color: sublistColor,
        }
        sublists.push(newSubList);
        setOrgs([...orgs]);
        history.push(`${url}/sublist/${setId(sublistText)}?view=tree`);
        setActiveKey(`${url}/sublist/${setId(sublistText)}?view=tree`);
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
        } else if (deleteModalType.type === 'sublist') {
            const sublist_index: number = sublists.findIndex(({id}) => id === sublistId);
            sublists.splice(sublist_index, 1);
            history.push(`${url}/lists?view=tree`);
            setActiveKey(`${url}/lists?view=tree`);
            setOrgs([...orgs]);
        }
        setRenderModal(false);
    }


    return <header className='main-header d-flex flex-column justify-content-between'>
        {/*modal start*/}
        {animateModal((style, item) =>
            item &&
            <MyModal useStyle={style} render={renderModal}
                     changeRender={(renderModal: boolean | ((prevState: boolean) => boolean)) => setRenderModal(renderModal)}>
                {modalType === 'delete' && <DeleteModal
                    changeRender={(renderModal: boolean | ((prevState: boolean) => boolean)) => setRenderModal(renderModal)}
                    type={deleteModalType.type} name={deleteModalType.name}>
                    <label className='d-flex gap-1 align-items-center pt-2'>
                        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
                        I am aware that I <strong>cannot undo</strong> this.
                    </label>
                    <hr/>
                    <p className="des">
                        If you choose to upgrade your subscription plan, the deleted organization can be restored within
                        7 days.
                    </p>
                    <div className="btn-wrapper d-flex gap-2 align-items-center justify-content-end pt-3">
                        <Button className={`${checked && 'ant-danger-btn'}`} onClick={() => handleDelete()}
                                disabled={!checked}>
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
                    }} className={`${sublistText !== '' && 'ant-primary-btn'}`} disabled={sublistText === ''}>
                        Create
                    </Button>
                    <Button onClick={() => setRenderModal(false)} className='ant-default-btn'>
                        Cancel
                    </Button>
                </>} setListContents={<>
                        <span className='customization d-flex gap-1 align-items-center'>
                           <i style={{color: `${sublistColor !== 'white' && sublistColor}`}}>
                            {sublistIconsArr[subListIcon]}
                           </i>
                            <Dropdown trigger={['click']} overlay={(<Menu className='sublist-info-dropdown'>
                                <ul className='d-flex items-wrapper'>
                                    {sublistIconsArr.map((icon, i) => (
                                        <Menu.Item onClick={() => setSublistIcon(i)} key={i}
                                                   className={`${subListIcon === i && 'active-icon'}`}>
                                            <i>{icon}</i>
                                        </Menu.Item>
                                    ))}
                                </ul>
                                <Menu.Divider/>
                                <ul className='d-flex items-wrapper'>
                                    {colorpalettes.map((color,i) => (
                                        <Menu.Item onClick={() => setSublistColor(color)} className='color-li'
                                                   key={color + '_' + i}>
                                            <div style={{
                                                background: color,
                                                border: `${color === 'white' && '1px solid silver'}`
                                            }} className='color'></div>
                                        </Menu.Item>
                                    ))}
                                </ul>
                            </Menu>)}>
                            <IoMdArrowDropdown/>
                        </Dropdown>
                        </span>
                    <input value={sublistText} onChange={(e) => setSubListText(e.target.value)} type="text"/>
                </>}/>
                }
            </MyModal>
        )}
        {/*modal items end*/}
        <div className="up d-flex align-items-center justify-content-between">
            <div className="left d-flex gap-1 align-items-center ">
                <h5 className='name m-0'>{name}</h5>
                <Dropdown className='pointer d-flex align-items-center' overlay={(
                    <Menu>
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
                        {type === 'USER' &&
                        <>
                            <Menu.Item key={'edit'} icon={<BsPencil/>}>
                                Edit name and description
                            </Menu.Item>
                            <Menu.Item key={'full-sc'} icon={<BsFullscreen/>}>
                                Enter full screen
                            </Menu.Item>
                            <Menu.Item key='print' icon={<BsPrinter/>}>
                                Print
                            </Menu.Item>
                            <Menu.Divider/>
                            <Menu.Item key='settings' icon={<FiSettings/>}>
                                Account settings
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
        <div className="down mt-1 d-flex gap-1 position-relative">


            <Tabs activeKey={activeKey} className='w-100' defaultActiveKey={history.location.pathname + history.location.search} onChange={key => {history.push(key); setActiveKey(key)}}>
                {tabs.map((tab) => (
                    <TabPane tab={(
                        <div className='tab'>
                        <p className='m-0'>{tab.text}</p>
                        </div>
                    )}
                             key={`${url}/${tab.id}${tab.id !== 'overview' ? '?view=tree' : ''}`}
                             className={`text-decoration-none`}/>
                ))}
                {type === 'PRJ' &&
                <>
                <TabPane disabled className='disabled-tab' tab={<Divider type='vertical' />} />
                    {sublists.map((list) => (
                        <TabPane tab={(
                            <div style={{backgroundColor: `${list.color}23`}}
                                 className={`wrap sublist tab d-flex align-items-center gap-1 position-relative`}>
                                <i style={{color: `${list.color !== 'white' && list.color}`}} className='sublist-icon'>
                                    {sublistIconsArr[list.iconIndex]}
                                </i>
                                <p className='m-0'>{list.text}</p>
                                <Dropdown trigger={['click']} overlay={(
                                    <Menu>
                                        <Menu.Item key={1} icon={<BsPencil/>}>
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item key={2} icon={<AiOutlinePushpin/>}>
                                            Unpin
                                        </Menu.Item>
                                        <Menu.Item key={3} disabled icon={<AiOutlinePushpin/>}>
                                            Unpin tabs to the right
                                        </Menu.Item>
                                        <Menu.Divider/>
                                        <Menu.Item key={4} icon={<BsArchive/>}>
                                            Archive
                                        </Menu.Item>
                                        <Menu.Item key={5} onClick={() => {
                                            setRenderModal(true);
                                            setModalType('delete');
                                            setDeleteModalType({
                                                type: 'sublist',
                                                name: list.text,
                                            })
                                            setSublistId(list.id);
                                        }} icon={<BsTrash/>}>
                                            Delete
                                        </Menu.Item>
                                    </Menu>
                                )}>
                                    <i className="dropdown-icon">
                                        <IoMdArrowDropdown/>
                                    </i>
                                </Dropdown>
                            </div>
                        )} key={`${url}/sublist/${list.id}?view=tree`}
                                 className='text-decoration-none'
                        />
                    ))}
                    <TabPane tab={(<div onClick={() => {
                        setRenderModal(true);
                        setModalType('sublist');
                    }
                    }
                                        style={{borderLeft: `${sublists.length > 1 && '1px solid silver'}`}}
                                        className={`add-sublist disabled tab pointer border-left d-flex gap-1 align-items-center`}>
                        <BsPlusCircleFill className='text-silver'/>
                        <span className={`${sublists.length < 1 && 'show'}`}>Add sublist</span>
                    </div>)} disabled key='add-sublist' />
                </>
                }
            </Tabs>
        </div>
    </header>
}

export default Header;