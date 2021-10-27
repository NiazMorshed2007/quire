import React, {FC, useContext} from 'react';
import {useParams} from "react-router-dom";
import {Orgs} from "../../context/orgs";
import Header from "../../components/Header";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";

const Organization: FC = () => {
    const {orgs} = useContext(Orgs);
    const {orgId}: any = useParams();
    const org: any = orgs.find(({org_id}) => org_id === orgId);
    return <>
            <Header name={org.org_name} image={'asdf'} tabs={[{text: 'Overview', id:'overview'}]} />
            <Overview>
                <BaseInfo type='ORG' title={org.org_name} />
            </Overview>
        </>
}

export default Organization;