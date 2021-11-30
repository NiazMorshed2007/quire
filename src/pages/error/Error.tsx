import React, { FC, useContext } from "react";
import { Orgs } from "../../context/orgs";

const ErrorPage: FC = () => {
  const { orgs } = useContext(Orgs);
  console.log(orgs);

  return <>404 log</>;
};

export default ErrorPage;
