import React, { FC, useContext, useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { User } from "../../context/user";
import { Route } from "react-router-dom";
import Overview from "../overview/Overview";
import BaseInfo from "../../components/BaseInfo";
import TasksPage from "../Task/TasksPage";

const UserSpace: FC = () => {
  const { user }: any = useContext(User);
  const [url, setUrl] = useState<string>("");
  const [file, setFile] = useState<File>();
  useEffect(() => {
    document.title = `${user.user && user.user.displayName} | Quire`;
  }, [user]);
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setUrl("");
    }
  }, [file]);
  return (
    <>
      {user.user && (
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
            <input
              accept="image/*"
              type="file"
              onChange={(e) => {
                const f = e.target.files && e.target.files[0];
                if (f && f?.type.substr(0, 5) === "image") {
                  setFile(f);
                }
              }}
            />
            <img
              style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              src={url}
              alt="a image"
            />
          </Route>
          <Route path="/u/my_tasks">
            <TasksPage type="USER" />
          </Route>
        </>
      )}
    </>
  );
};

export default UserSpace;
