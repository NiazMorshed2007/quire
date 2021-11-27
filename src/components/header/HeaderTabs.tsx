import { Divider, Dropdown, Menu, Tabs } from "antd";
import React, { Dispatch, FC, useContext, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineHighlight,
  AiOutlineHome,
  AiOutlineLike,
  AiOutlinePushpin,
  AiOutlineThunderbolt,
  BiMoviePlay,
  BsAlarm,
  BsArchive,
  BsBug,
  BsBuilding,
  BsBullseye,
  BsEmojiFrown,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsPencil,
  BsPeople,
  BsPiggyBank,
  BsPlusCircleFill,
  BsTrash,
  FaGraduationCap,
  FaUmbrellaBeach,
  FiDatabase,
  GiFamilyTree,
  GiHamburger,
  HiOutlineLightBulb,
  IoBagRemoveOutline,
  IoEarthOutline,
  IoLeafOutline,
  IoMdArrowDropdown,
  IoMdPaperPlane,
  IoMusicalNotesOutline,
  IoNewspaperOutline,
  IoRocketOutline,
  IoTrophyOutline,
  MdFullscreen,
  VscCalendar,
  VscLibrary,
  VscListSelection,
  VscSymbolKeyword,
} from "react-icons/all";
import { useHistory, useRouteMatch } from "react-router";
import { Orgs } from "../../context/orgs";
import { setId } from "../../functions/SetId";
import { ISubilsts } from "../../interfaces/SublistsInterface";
import { ITask } from "../../interfaces/TaskInterface";
import CustomModal from "../modal/CustomModal";

const { TabPane } = Tabs;

interface IHeaderTabs {
  type: "ORG" | "PRJ" | "USER";
  activeKey: string;
  setActiveKey: Dispatch<string>;
  tabs: { text: string; id: string; tasks?: ITask[] }[];
  sublists: ISubilsts[];
}

const HeaderTabs: FC<IHeaderTabs> = (props) => {
  const { type, activeKey, setActiveKey, tabs, sublists } = props;
  const history = useHistory();
  const { url } = useRouteMatch();
  const { orgs, setOrgs } = useContext(Orgs);
  const [sublistId, setSublistId] = useState<string>("");
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [sublistModalVisible, setSublistModalVisible] =
    useState<boolean>(false);
  const sublistIconsArr = [
    <VscListSelection />,
    <VscSymbolKeyword />,
    <VscLibrary />,
    <VscCalendar />,
    <BsAlarm />,
    <IoBagRemoveOutline />,
    <IoRocketOutline />,
    <BsBug />,
    <BsPeople />,
    <HiOutlineLightBulb />,
    <IoLeafOutline />,
    <BiMoviePlay />,
    <GiFamilyTree />,
    <AiOutlineThunderbolt />,
    <BsPiggyBank />,
    <FaGraduationCap />,
    <IoMdPaperPlane />,
    <IoEarthOutline />,
    <IoMusicalNotesOutline />,
    <BsPencil />,
    <FaUmbrellaBeach />,
    <IoNewspaperOutline />,
    <AiOutlineHome />,
    <BsBuilding />,
    <FiDatabase />,
    <AiOutlineHighlight />,
    <GiHamburger />,
    <IoTrophyOutline />,
    <AiOutlineLike />,
    <AiOutlineDislike />,
    <BsEmojiSmile />,
    <BsEmojiFrown />,
    <BsEmojiNeutral />,
    <BsBullseye />,
    <MdFullscreen />,
  ];
  const handleDeleteSublist = (): void => {
    const sublist_index: number = sublists.findIndex(
      ({ id }) => id === sublistId
    );
    sublists.splice(sublist_index, 1);
    history.push(`${url}/lists?view=tree`);
    setActiveKey(`${url}/lists?view=tree`);
    setOrgs([...orgs]);
  };

  const handleAddSublist = (): void => {
    const newSubList: ISubilsts = {
      text: "new",
      //  sublistText,
      id: setId("new"),
      iconIndex: 1,
      // subListIcon,
      tasks: [],
      statuses: [
        { name: "To-Do", id: "todo" },
        {
          name: "In-Progress",
          id: "in-progress",
        },
        { name: "Completed", id: "completed" },
      ],
      color: "orange",
      //  sublistColor,
    };
    sublists.push(newSubList);
    setOrgs([...orgs]);
    history.push(`${url}/sublist/${setId("new")}?view=tree`);
    setActiveKey(`${url}/sublist/${setId("new")}?view=tree`);
    // setSubListText('');
    // setRenderModal(false);
  };

  return (
    <>
      <Tabs
        activeKey={activeKey}
        className="w-100"
        defaultActiveKey={history.location.pathname + history.location.search}
        onChange={(key) => {
          history.push(key);
          setActiveKey(key);
        }}
      >
        {tabs.map((tab) => (
          <TabPane
            tab={
              <div className="tab">
                <p className="m-0">{tab.text}</p>
              </div>
            }
            key={`${url}/${tab.id}${tab.id !== "overview" ? "?view=tree" : ""}`}
            className={`text-decoration-none`}
          />
        ))}
        {type === "PRJ" && (
          <>
            <TabPane
              disabled
              className="disabled-tab"
              tab={<Divider type="vertical" />}
            />
            {sublists.map((list) => (
              <TabPane
                tab={
                  <div
                    style={{ backgroundColor: `${list.color}23` }}
                    className={`wrap sublist tab d-flex align-items-center gap-1 position-relative`}
                  >
                    <i
                      style={{
                        color: `${list.color !== "white" && list.color}`,
                      }}
                      className="sublist-icon"
                    >
                      {sublistIconsArr[list.iconIndex]}
                    </i>
                    <p className="m-0">{list.text}</p>
                    <Dropdown
                      trigger={["click"]}
                      overlay={
                        <Menu>
                          <Menu.Item key={1} icon={<BsPencil />}>
                            Edit
                          </Menu.Item>
                          <Menu.Item key={2} icon={<AiOutlinePushpin />}>
                            Unpin
                          </Menu.Item>
                          <Menu.Item
                            key={3}
                            disabled
                            icon={<AiOutlinePushpin />}
                          >
                            Unpin tabs to the right
                          </Menu.Item>
                          <Menu.Divider />
                          <Menu.Item key={4} icon={<BsArchive />}>
                            Archive
                          </Menu.Item>
                          <Menu.Item
                            key={5}
                            onClick={() => {
                              setSublistId(list.id);
                              setModalVisible(true);
                            }}
                            icon={<BsTrash />}
                          >
                            Delete
                          </Menu.Item>
                        </Menu>
                      }
                    >
                      <i className="dropdown-icon">
                        <IoMdArrowDropdown />
                      </i>
                    </Dropdown>
                  </div>
                }
                key={`${url}/sublist/${list.id}?view=tree`}
                className="text-decoration-none"
              />
            ))}
            <TabPane
              tab={
                <div
                  onClick={() => setSublistModalVisible(true)}
                  style={{
                    borderLeft: `${sublists.length > 1 && "1px solid silver"}`,
                  }}
                  className={`add-sublist disabled tab pointer border-left d-flex gap-1 align-items-center`}
                >
                  <BsPlusCircleFill className="text-silver" />
                  <span className={`${sublists.length < 1 && "show"}`}>
                    Add sublist
                  </span>
                </div>
              }
              disabled
              key="add-sublist"
            />
          </>
        )}
      </Tabs>
      <CustomModal
        content={
          <>
            <h4>Delete sublist</h4>
            <p className="m-0">
              You are about to <strong>permanently delete</strong> the sublist
              <span
                onClick={() => setModalVisible(false)}
                className="primary-color pointer px-1"
              >
                {sublists && sublists.find(({ id }) => id === sublistId)?.text}
              </span>
            </p>
          </>
        }
        layer="white"
        visible={modalVisible}
        setVisible={setModalVisible}
        modalT="delete"
        onOk={() => handleDeleteSublist()}
      />

      <CustomModal
        content={
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam,
            quidem maxime distinctio laboriosam doloribus ratione voluptatum
            sapiente itaque quas minima dicta impedit vitae cum soluta, dolorem
            explicabo praesentium quam voluptas.
          </div>
        }
        layer="white"
        visible={sublistModalVisible}
        setVisible={setSublistModalVisible}
        modalT="Sublist"
        onOk={() => handleAddSublist()}
      />
    </>
  );
};

export default HeaderTabs;
