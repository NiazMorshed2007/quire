import { Button, Dropdown, Menu, Modal } from "antd";
import React, { FC, useContext, useState } from "react";
import {
  AiOutlineAppstore,
  AiOutlineFile,
  AiOutlinePlus,
  AiOutlineUser,
  BiMessageDetail,
  BsChevronDown,
  BsCircle,
  BsCreditCard2Front,
  BsEye,
  BsFullscreen,
  BsHouse,
  BsJournalBookmark,
  BsPencil,
  BsPrinter,
  BsTag,
  BsThreeDots,
  FiSettings,
  GoTrashcan,
  GrDocumentCsv,
  RiFolderReceivedLine,
} from "react-icons/all";
import { useHistory } from "react-router";
import { Orgs } from "../../context/orgs";
import { IOrg } from "../../interfaces/OrgInterface";
import { IProject } from "../../interfaces/ProjectInterface";

interface Props {
  type: "ORG" | "PRJ" | "USER";
  currentOrg: string;
  org: IOrg;
  name: string;
  projects: IProject[];
}

const { SubMenu } = Menu;

const DropdownFirst: FC<Props> = (props) => {
  const { type, currentOrg, org, projects, name } = props;
  const [checked, setChecked] = useState<boolean>(false);
  const history = useHistory();
  const { orgs, setOrgs } = useContext(Orgs);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [deleteModalType, setDeleteModalType] = useState<
    "organization" | "project"
  >("project");

  const handleDelete = (): void => {
    if (deleteModalType === "organization") {
      const org_index: number = orgs.findIndex(
        ({ org_id }) => org_id === currentOrg
      );
      orgs.splice(org_index, 1);
      history.push("/u");
      setOrgs([...orgs]);
    } else if (deleteModalType === "project") {
      const project_index: number = projects.findIndex(
        ({ project_name }) => project_name === name
      );
      projects.splice(project_index, 1);
      history.push(`/w/o/${currentOrg}/overview`);
      setOrgs([...orgs]);
    }
  };
  return (
    <>
      <Dropdown
        className="pointer d-flex align-items-center"
        overlay={
          <Menu>
            {type === "ORG" && (
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
                <Menu.Item
                  key={4}
                  icon={<AiOutlinePlus />}
                  onClick={() =>
                    history.push(`/c?org_id=${currentOrg}&type=project`)
                  }
                >
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
                <SubMenu key={8} icon={<BsThreeDots />} title="More">
                  <Menu.Item
                    icon={<GoTrashcan />}
                    onClick={() => {
                      setDeleteModalType("organization");
                      setModalVisible(true);
                    }}
                    key={"delete"}
                  >
                    Delete...
                  </Menu.Item>
                </SubMenu>
                <Menu.Divider />
                <Menu.Item key={9} icon={<FiSettings />}>
                  Options
                </Menu.Item>
              </>
            )}
            {type === "PRJ" && (
              <>
                <Menu.Item
                  onClick={() => history.push(`/w/o/${currentOrg}/overview`)}
                  key={1}
                  icon={<BsHouse />}
                >
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
                <Menu.Item key={"edit"} icon={<BsTag />}>
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
                <SubMenu
                  key={10}
                  icon={<RiFolderReceivedLine />}
                  title="Import"
                >
                  <Menu.Item icon={<GrDocumentCsv />} key={"csv"}>
                    CSV
                  </Menu.Item>
                </SubMenu>
                <SubMenu key={11} icon={<BsThreeDots />} title="More">
                  <Menu.Item
                    icon={<GoTrashcan />}
                    onClick={() => {
                      setDeleteModalType("project");
                      setModalVisible(true);
                    }}
                    key={"delete"}
                  >
                    Delete...
                  </Menu.Item>
                </SubMenu>
                <Menu.Divider />
                <Menu.Item key="options" icon={<FiSettings />}>
                  Options
                </Menu.Item>
              </>
            )}
            {type === "USER" && (
              <>
                <Menu.Item key={"edit"} icon={<BsPencil />}>
                  Edit name and description
                </Menu.Item>
                <Menu.Item key={"full-sc"} icon={<BsFullscreen />}>
                  Enter full screen
                </Menu.Item>
                <Menu.Item key="print" icon={<BsPrinter />}>
                  Print
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="settings" icon={<FiSettings />}>
                  Account settings
                </Menu.Item>
              </>
            )}
          </Menu>
        }
        trigger={["click"]}
      >
        <BsChevronDown />
      </Dropdown>

      <Modal
        footer={false}
        style={{ top: 20 }}
        visible={modalVisible}
        onOk={() => setModalVisible(false)}
        onCancel={() => setModalVisible(false)}
        closeIcon={<></>}
        mask={false}
      >
        <div className="my-modal delete-modal shadow">
          <h4 className="mb-2">
            Delete this {type === "PRJ" ? "Project" : "Organization"}
          </h4>
          <p className="m-0">
            You are about to <strong>permanently delete</strong> the
            {type === "PRJ" ? "project" : "organization"}
            <span
              onClick={() => setModalVisible(false)}
              className="primary-color pointer px-1"
            >
              {name}
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
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              onClick={() => setModalVisible(false)}
              className="ant-default-btn"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* <CustomModal
        isBtnEnabled={checked}
        layer="white"
        visible={modalVisible}
        setVisible={setModalVisible}
        onOk={() => handleDelete()}
        modalT="delete"
        content={
          <>
            <h4>
              Delete {deleteModalType === "project" && "Project"}
              {deleteModalType === "organization" && "Organization"}
            </h4>
            <p className="m-0">
              You are about to <strong>permanently delete</strong> the{" "}
              {type === "PRJ" ? "project" : "organization"}
              <span
                onClick={() => setModalVisible(false)}
                className="primary-color pointer px-1"
              >
                {name}
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
          </>
        }
      /> */}
    </>
  );
};

export default DropdownFirst;
