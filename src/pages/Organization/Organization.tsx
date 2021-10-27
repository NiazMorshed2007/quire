import React, {FC, useContext} from 'react';
import {useParams} from "react-router-dom";
import {Orgs} from "../../context/orgs";

const Organization: FC = () => {
    const {orgs} = useContext(Orgs);
    const {orgId}: any = useParams();
    const org: any = orgs.find(({org_id}) => org_id === orgId);
    return <>dfgdfs
        <h1>{org.org_name}</h1>
        </>
}

export default Organization;