import React, { FC, useEffect, useState } from "react";
import Login from "./pages/Login/Login";
import { IsLogged } from "./context/isLogged";
import { IsDarkMode } from "./context/isDarkMode";
import { User } from "./context/user";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import UserSpace from "./pages/User/User";
import { Orgs } from "./context/orgs";
import { IOrg } from "./interfaces/OrgInterface";
import Organization from "./pages/Organization/Organization";
import SideBar from "./components/sidebar/SideBar";
import ErrorPage from "./pages/error/Error";
import Project from "./pages/project/Project";
import Create from "./pages/create/Create";
import { CurrentOrg } from "./context/currentOrg";
import { ITask } from "./interfaces/TaskInterface";
import { MyTasks } from "./context/myTask";
import GlobalError from "./pages/error/GlobalError";
import { firebase } from "./firebase/firebase";

const db = firebase.firestore();

const App: FC = () => {
  const loggedData = (): boolean => {
    return !!localStorage.getItem("logged");
  };
  const appearanceData = (): boolean => {
    return !!localStorage.getItem("isDarkMode");
  };
  const getUser = (): [] => {
    if (localStorage.getItem("user")) {
      return JSON.parse(localStorage.getItem("user") as string);
    } else {
      return [];
    }
  };
  const getOrgs = (): [] => {
    // if(test) {
    //     return test.orgs;
    // } else {
    //     return []
    // }
    if (localStorage.getItem("orgs")) {
      return JSON.parse(localStorage.getItem("orgs") as string);
    } else {
      return [];
    }
  };
  const getMyTasks = (): [] => {
    if (localStorage.getItem("my_tasks")) {
      return JSON.parse(localStorage.getItem("my_tasks") as string);
    } else {
      return [];
    }
  };
  const [logged, setLogged] = useState<boolean>(loggedData());
  const [isDarkMode, setIsDarkMode] = useState(appearanceData());
  const [user, setUser] = useState<any>(getUser());
  const [orgs, setOrgs] = useState<IOrg[]>(getOrgs());
  // console.log(orgs);
  const [myTasks, setMyTasks] = useState<ITask[]>(getMyTasks);
  const [currentOrg, setCurrentOrg] = useState<string>(
    orgs.length > 0 ? orgs[0].org_id : ""
  );
  useEffect(() => {
    if (logged) {
      localStorage.setItem("orgs", JSON.stringify(orgs));
      localStorage.setItem("my_tasks", JSON.stringify(myTasks));
    }
  }, [orgs, logged, myTasks]);

  return (
    <>
      <Router>
        <Route path="/" exact>
          <Redirect to="/u" />
        </Route>
        <Route exact path="/u">
          <Redirect to="/u/overview" />
        </Route>
        {!logged && <Redirect to="/login" />}
        <IsLogged.Provider value={{ logged, setLogged }}>
          <User.Provider value={{ user, setUser }}>
            <IsDarkMode.Provider value={{ isDarkMode, setIsDarkMode }}>
              <Orgs.Provider value={{ orgs, setOrgs }}>
                <MyTasks.Provider value={{ myTasks, setMyTasks }}>
                  <CurrentOrg.Provider value={{ currentOrg, setCurrentOrg }}>
                    <div className="app vh-100 vw-100 overflow-hidden">
                      <Switch>
                        <Route path="/login">
                          <Login />
                        </Route>
                        <Route path={["/u", "/w", "/c"]}>
                          {logged && (
                            <>
                              <div
                                className={`dark-mode-layer position-absolute vh-100 vw-100 bg-dark ${
                                  isDarkMode && "expand-dark-mode"
                                }`}
                              ></div>
                              <div
                                className={`user-work-wrapper d-flex w-100 h-100 position-relative ${
                                  isDarkMode && "text-white"
                                }`}
                              >
                                <SideBar />
                                <div className="main d-flex w-100 flex-column">
                                  <Route path="/u">
                                    <UserSpace />
                                  </Route>
                                  <Switch>
                                    <Route path="/w/o/:orgId">
                                      <Organization />
                                    </Route>
                                    <Route path="/w/p/:orgId/:projectId">
                                      <Project />
                                    </Route>
                                    <Route path="/w/*">
                                      <ErrorPage />
                                    </Route>
                                  </Switch>
                                  <Route path="/c">
                                    <Create />
                                  </Route>
                                  <Route path="/error">
                                    <ErrorPage />
                                  </Route>
                                </div>
                              </div>
                            </>
                          )}
                        </Route>
                        {logged && (
                          <Route path={"*"}>
                            <GlobalError />
                          </Route>
                        )}
                      </Switch>
                    </div>
                  </CurrentOrg.Provider>
                </MyTasks.Provider>
              </Orgs.Provider>
            </IsDarkMode.Provider>
          </User.Provider>
        </IsLogged.Provider>
      </Router>
    </>
  );
};

export default App;
