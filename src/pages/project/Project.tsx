import React, { FC, useContext, useEffect } from "react";
import { Redirect, Route, Switch, useParams } from "react-router-dom";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";
import { Orgs } from "../../context/orgs";
import { IProject } from "../../interfaces/ProjectInterface";
import Header from "../../components/header/Header";
import { ITabs } from "../../interfaces/TabInterface";
import { CurrentOrg } from "../../context/currentOrg";
import TasksPage from "../Task/TasksPage";

const Project: FC = () => {
  const { orgId, projectId }: any = useParams();
  const { orgs } = useContext(Orgs);
  const { setCurrentOrg } = useContext(CurrentOrg);
  const org: any = orgs.find(({ org_id }) => org_id === orgId);
  const projects: IProject[] = org && org.projects;
  const project: any =
    projects && projects.find(({ project_id }) => project_id === projectId);
  const tabs: ITabs[] = project && project.tabs;
  const sublists: ITabs[] = project && project.sublists;
  //fetch org_id for create project from sidebar
  useEffect(() => {
    document.title = `${project && project.project_name} | Quire`;
    setCurrentOrg(org && org.org_id);
    //    eslint-disable-next-line
  }, [project]);

  if (typeof project !== "object") {
    return <Redirect to="/w/error" />;
  }
  return (
    <>
      <Route path="/w/p/:orgId/:projectId">
        <Header
          project={project}
          org={org}
          type="PRJ"
          name={project.project_name}
          tabs={[...tabs, { text: "Overview", id: "overview" }]}
        />
        <Switch>
          <Route exact path="/w/p/:orgId/:projectId/overview">
            <Overview>
              <BaseInfo
                type={"PRJ"}
                title={project.project_name}
                path={org.org_id}
                parent_name={org.org_name}
                avatarTxt={project.project_avatar_txt}
                background={project.project_avatar_back}
              />
            </Overview>
          </Route>
          <Route
            exact
            path={[
              "/w/p/:orgId/:projectId/lists",
              "/w/p/:orgId/:projectId/sublist/:subListId",
            ]}
          >
            <TasksPage type="PRJ" tabs={tabs} sublists={sublists} />
          </Route>
          <Route path="*">
            <Redirect to="/error" />
          </Route>
        </Switch>
      </Route>
    </>
  );
};

export default Project;
