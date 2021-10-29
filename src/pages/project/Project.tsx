import React, {FC, useContext, useEffect} from 'react';
import {Route, useParams} from "react-router-dom";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";
import {Orgs} from "../../context/orgs";
import {IProject} from "../../interfaces/ProjectInterface";
import Header from "../../components/Header";
import {ITabs} from "../../interfaces/TabInterface";
import {CurrentOrg} from "../../context/currentOrg";

const Project: FC = () => {
    const {orgId, projectId}: any = useParams();
    const {orgs} = useContext(Orgs);
    const {setCurrentOrg} = useContext(CurrentOrg);
    const org: any = orgs.find(({org_id}) => org_id === orgId);
    const projects: IProject[] = org.projects;
    const project: any = projects.find(({project_id}) => project_id === projectId);
    //breaking down for usage
    const project_name: string = project.project_name;
    const avatar_txt: string = project.project_avatar_txt;
    const avatar_back: string = project.project_avatar_back;
    const tabs: ITabs[] = project.tabs;
    //fetch org_id for create project from sidebar
    useEffect(() => {
        setCurrentOrg(org.org_id);
    //    eslint-disable-next-line
    }, [project])
    return <>
        <Route path='/w/p/:orgId/:projectId'>
            <Header project={project} type='PRJ' name={project_name} tabs={[...tabs, {text: 'Overview', id: 'overview'}]}/>
            <Route path='/w/p/:orgId/:projectId/overview'>
                <Overview>
                    <BaseInfo type={'PRJ'} title={project_name} path={org.org_id} parent_name={org.org_name} avatarTxt={avatar_txt} background={avatar_back}/>
                </Overview>
            </Route>
        </Route>
    </>
}

export default Project;