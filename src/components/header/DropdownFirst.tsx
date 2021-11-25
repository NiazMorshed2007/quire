import { Menu, Dropdown, Divider } from "antd";
import React, { Dispatch, FC, useContext, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router";
import {
  BsPencil,
  AiOutlineUser,
  BsFullscreen,
  AiOutlinePlus,
  BsCreditCard2Front,
  AiOutlineAppstore,
  AiOutlineFile,
  BsThreeDots,
  GoTrashcan,
  FiSettings,
  BsHouse,
  BsJournalBookmark,
  BsCircle,
  BsTag,
  BsEye,
  BiMessageDetail,
  BsPrinter,
  RiFolderReceivedLine,
  GrDocumentCsv,
  BsChevronDown,
} from "react-icons/all";
import { IOrg } from "../../interfaces/OrgInterface";
import CustomModal from "../modal/CustomModal";
import { ModalContext } from "../../context/ModalContext";
import { Orgs } from "../../context/orgs";
import { IProject } from "../../interfaces/ProjectInterface";
import { ISubilsts } from "../../interfaces/SublistsInterface";

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
  const { renderModal, setRenderModal } = useContext(ModalContext);
  const history = useHistory();
  const { orgs, setOrgs } = useContext(Orgs);
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
                      setRenderModal(true);
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
                      setRenderModal(true);
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
      {renderModal && (
        <CustomModal
          layer="white"
          content={
            <>
              <div className="modal-content delete-modal shadow">
                <h2>
                  Delete {deleteModalType === "project" && "Project"}
                  {deleteModalType === "organization" && "Organization"}
                </h2>
              </div>
            </>
          }
        />
      )}
    </>
  );
};

export default DropdownFirst;
