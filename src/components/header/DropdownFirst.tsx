import { Menu, Dropdown } from "antd";
import React, { FC } from "react";
import { useHistory } from "react-router";
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

interface Props {
  type: string;
  currentOrg: string;
  org: IOrg;
}

const { SubMenu } = Menu;

const DropdownFirst: FC<Props> = (props) => {
  const { type, currentOrg, org } = props;
  const history = useHistory();
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
                  <Menu.Item icon={<GoTrashcan />} key={"delete"}>
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
                  <Menu.Item icon={<GoTrashcan />} key={"delete"}>
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
    </>
  );
};

export default DropdownFirst;
