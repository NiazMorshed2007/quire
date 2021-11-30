import {
  Button,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Radio,
  Select,
  Tabs,
} from "antd";
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
  BsKanban,
  BsPencil,
  BsPeople,
  BsPiggyBank,
  BsPlusCircleFill,
  BsTrash,
  FaGraduationCap,
  FaUmbrellaBeach,
  FiDatabase,
  FiLock,
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

const { Option } = Select;

const { TabPane } = Tabs;

interface IHeaderTabs {
  type: "ORG" | "PRJ" | "USER";
  activeKey: string;
  setActiveKey: Dispatch<string>;
  tabs: { text: string; id: string; tasks?: ITask[] }[];
  sublists: ISubilsts[];
}

const HeaderTabs: FC<IHeaderTabs> = (props) => {
  const [form] = Form.useForm();
  const { type, activeKey, setActiveKey, tabs, sublists } = props;
  const [selectedType, setSelectedType] = useState<number>(0);
  const history = useHistory();
  const { url } = useRouteMatch();
  const { orgs, setOrgs } = useContext(Orgs);
  const [sublistId, setSublistId] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(false);
  const [sublistText, setSublistText] = useState<string>("");
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
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
    setDeleteModalVisible(false);
  };

  const handleAddSublist = (): void => {
    const newSubList: ISubilsts = {
      text: sublistText,
      //  sublistText,
      id: setId(sublistText),
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
    history.push(`${url}/sublist/${setId(sublistText)}?view=tree`);
    setActiveKey(`${url}/sublist/${setId(sublistText)}?view=tree`);
    setSublistText("");
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
                              setDeleteModalVisible(true);
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
            {sublists.length > 0 && (
              <TabPane
                disabled
                className="disabled-tab"
                tab={<Divider type="vertical" />}
              />
            )}
            <TabPane
              tab={
                <div
                  onClick={() => setSublistModalVisible(true)}
                  className={`add-sublist disabled tab pointer border-left d-flex gap-1 align-items-center`}
                >
                  <BsPlusCircleFill className="text-silver" />
                  <span
                    style={{ display: sublists.length > 0 ? "none" : "block" }}
                  >
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

      {/* delete sublist modal */}
      <Modal
        footer={false}
        style={{ top: 20 }}
        visible={deleteModalVisible}
        onOk={() => setDeleteModalVisible(false)}
        onCancel={() => setDeleteModalVisible(false)}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal delete-modal shadow">
          <h4 className="mb-2">Delete this Sublist</h4>
          <p className="m-0">
            You are about to <strong>permanently delete</strong> the sublist
            <span
              onClick={() => setDeleteModalVisible(false)}
              className="primary-color pointer px-1"
            >
              {sublists && sublists.find(({ id }) => id === sublistId)?.text}
            </span>
          </p>
          <label className="d-flex gap-1 align-items-center pt-2">
            <input
              type="checkbox"
              onChange={() => setChecked && setChecked(!checked)}
            />
            I am aware that I <strong>cannot undo</strong> this.
          </label>
          <hr />
          <p className="des">
            If you choose to upgrade your subscription plan, the deleted
            organization can be restored within 7 days.
          </p>

          <div className="btn-wrapper pt-3 d-flex align-items-center justify-content-end gap-2">
            <Button
              type="primary"
              disabled={!checked}
              danger={checked ? true : false}
              onClick={handleDeleteSublist}
            >
              Delete
            </Button>
            <Button
              onClick={() => setDeleteModalVisible(false)}
              className="ant-default-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* add sublist modal */}

      <Modal
        footer={false}
        style={{ top: 20 }}
        visible={sublistModalVisible}
        onOk={() => setSublistModalVisible(false)}
        onCancel={() => setSublistModalVisible(false)}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal sublist-modal shadow">
          <h4 className="mb-4">Create Sublist</h4>
          <Form
            className="add-sublist-form"
            requiredMark="optional"
            layout="inline"
            colon={false}
            form={form}
            onFinish={() => {
              handleAddSublist();
              setSublistModalVisible(false);
            }}
            name="control-hooks"
          >
            <Form.Item
              className="first-label-item sublist-name"
              name="Name"
              label="Name"
              rules={[{ required: true }]}
            >
              <Input
                value={sublistText}
                onChange={(e) => setSublistText(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              className="first-label-item"
              name="share with"
              label="Share With"
              rules={[{ required: true }]}
            >
              <Select
                style={{ width: 200 }}
                placeholder="Select a person"
                optionFilterProp="children"
                defaultValue={"jack"}
                // onChange={onChange}
              >
                <Option value="jack">Project Members</Option>
                <Option value="2nd" className="d-flex align-items-center gap-1">
                  <FiLock />
                  <span className="mx-1">Only me</span>
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              className="mt-2 pt-1 w-100 "
              name="Default view"
              label="Default View"
              rules={[{ required: true }]}
            >
              <Radio.Group
                onChange={(e) => setSelectedType(e.target.value)}
                value={selectedType}
              >
                <Radio value={1} checked>
                  <VscListSelection />
                  <p className="m-0 d-inline-block">Tree</p>
                </Radio>
                <Radio value={2}>
                  <BsKanban />
                  <p className="m-0 d-inline-block">Board</p>
                </Radio>
                <Radio value={3}>Timeline</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default HeaderTabs;
