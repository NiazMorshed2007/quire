import React, { FC, useContext, useState } from "react";
import { AiOutlineSearch, IoMdNotificationsOutline } from "react-icons/all";
import { useHistory } from "react-router-dom";
import { CurrentOrg } from "../../context/currentOrg";
import { User } from "../../context/user";
import { colorpalettes } from "../../functions/colorpalettes";
import { IHeader } from "../../interfaces/HeaderInterface";
import { IProject } from "../../interfaces/ProjectInterface";
import { ISubilsts } from "../../interfaces/SublistsInterface";
import DropdownFirst from "./DropdownFirst";
import HeaderTabs from "./HeaderTabs";

colorpalettes.push("white");

const Header: FC<IHeader> = ({ name, tabs, type, org, project }) => {
  // const { url } = useRouteMatch();
  const { user }: any = useContext(User);
  const history = useHistory();
  const { currentOrg } = useContext(CurrentOrg);
  // const { orgs, setOrgs } = useContext(Orgs);
  // const [sublistText, setSubListText] = useState<string>("");
  // const [subListIcon, setSublistIcon] = useState<number>(0);
  // const [sublistColor, setSublistColor] = useState<string>("white");
  // const [checked, setChecked] = useState<boolean>(false);
  const projects: IProject[] = org && org.projects;
  const sublists: ISubilsts[] = project && project.sublists;
  const [activeKey, setActiveKey] = useState<string>(
    history.location.pathname + history.location.search
  );
  // const handleAddSublist = (): void => {
  //   const newSubList: ISubilsts = {
  //     text: sublistText,
  //     id: setId(sublistText),
  //     iconIndex: subListIcon,
  //     tasks: [],
  //     statuses: [
  //       { name: "To-Do", id: "todo" },
  //       {
  //         name: "In-Progress",
  //         id: "in-progress",
  //       },
  //       { name: "Completed", id: "completed" },
  //     ],
  //     color: sublistColor,
  //   };
  //   sublists.push(newSubList);
  //   setOrgs([...orgs]);
  //   history.push(`${url}/sublist/${setId(sublistText)}?view=tree`);
  //   setActiveKey(`${url}/sublist/${setId(sublistText)}?view=tree`);
  //   setSubListText("");
  // };

  return (
    <header className="main-header d-flex flex-column justify-content-between">
      <div className="up d-flex align-items-center justify-content-between">
        <div className="left d-flex gap-1 align-items-center ">
          <h5 className="name m-0">{name}</h5>
          <DropdownFirst
            projects={projects}
            name={name}
            type={type}
            currentOrg={currentOrg}
            org={org}
          />
        </div>
        <div className="right d-flex align-items-center gap-3">
          <i>
            <AiOutlineSearch />
          </i>
          <i>
            <IoMdNotificationsOutline />
          </i>
          <div className="img-wrapper">
            <img src={user.user.photoURL} alt="" />
          </div>
        </div>
      </div>
      <div className="down mt-1 d-flex gap-1 position-relative">
        <HeaderTabs
          type={type}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          tabs={tabs}
          sublists={sublists}
        />
      </div>
    </header>
  );
};

export default Header;
