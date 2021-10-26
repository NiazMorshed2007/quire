import React, {FC, useContext} from 'react';
import {useParams} from "react-router-dom";
// import * as _ from 'lodash';
import {Orgs} from "../../context/orgs";

const Organization: FC = () => {
    const {orgs}: any = useContext(Orgs);
    const {orgId}: any = useParams();
    console.log(orgId)
  // const org = orgs.find(({org_id}) => org_id === orgId);

    return <>jhgdsfg</>
}

export default Organization;