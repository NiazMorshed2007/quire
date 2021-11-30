import React, { FC, useContext, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Orgs } from "../../context/orgs";
import Header from "../../components/header/Header";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";
import { IProject } from "../../interfaces/ProjectInterface";
import { NavLink } from "react-router-dom";
import { CurrentOrg } from "../../context/currentOrg";
import { AiOutlinePlus } from "react-icons/all";

const Organization: FC = () => {
  const { orgs } = useContext(Orgs);
  const history = useHistory();
  const { orgId }: any = useParams();
  const { setCurrentOrg } = useContext(CurrentOrg);
  const org: any = orgs.find(({ org_id }) => org_id === orgId);
  const projects: IProject[] = org && org.projects;
  useEffect(() => {
    document.title = `${org && org.org_name} | Quire`;
    setCurrentOrg(org && org.org_id);
    //    eslint-disable-next-line
  }, [org]);
  if (orgs.length > 0 && typeof org !== "object") {
    return <Redirect to={"/w/error"} />;
  }
  return (
    <>
      {org && (
        <div className="org">
          <Header
            org={org}
            type="ORG"
            name={org.org_name}
            tabs={[{ text: "Overview", id: "overview" }]}
          />
          <Overview>
            <BaseInfo
              type="ORG"
              title={org.org_name}
              background={org.org_avatar_back}
              avatarTxt={org.org_avatar_txt}
            />
            <div className="project-summery py-4 pb-5 border-bottom">
              <h5>Project Summery</h5>
              <div className="projects pt-2">
                {projects.map((project) => (
                  <div
                    className="d-flex pb-2 project-single text-white align-items-center justify-content-between"
                    key={project.project_id}
                  >
                    <div className="left d-flex align-items-center gap-2">
                      <div
                        style={{ background: project.project_avatar_back }}
                        className="avatar"
                      >
                        {project.project_avatar_txt}
                      </div>
                      <NavLink
                        to={`/w/p/${org.org_id}/${project.project_id}/overview`}
                        className="m-0 text-decoration-none"
                      >
                        {project.project_name}
                      </NavLink>
                    </div>
                  </div>
                ))}
                <button
                  className="d-flex align-items-center mt-3"
                  onClick={() =>
                    history.push(`/c?org_id=${org.org_id}&&type=project`)
                  }
                >
                  <AiOutlinePlus /> Add Project
                </button>
              </div>
            </div>
          </Overview>
        </div>
      )}
    </>
  );
};

export default Organization;
