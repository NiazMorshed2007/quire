import React, { FC, useContext, useEffect } from "react";
import Header from "../../components/header/Header";
import { User } from "../../context/user";
import { Route } from "react-router-dom";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";
import TasksPage from "../Task/TasksPage";

const UserSpace: FC = () => {
  const { user }: any = useContext(User);
  useEffect(() => {
    document.title = `${user.user.displayName} | Quire`;
  }, [user]);
  return (
    <>
      <Header
        type="USER"
        name={user.user.displayName}
        tabs={[
          { text: "My Tasks", id: "my_tasks", tasks: [] },
          { text: "Overview", id: "overview" },
        ]}
      />
      <Route path="/u/overview">
        <Overview>
          <BaseInfo type="USER" title={user.user.displayName} />
        </Overview>
      </Route>
      <Route path="/u/my_tasks">
        <TasksPage type="USER" />
      </Route>
    </>
  );
};

export default UserSpace;
