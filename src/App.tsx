import React, { FC, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SideBar from "./components/sidebar/SideBar";
import { CurrentOrg } from "./context/currentOrg";
import { IsDarkMode } from "./context/isDarkMode";
import { IsLogged } from "./context/isLogged";
import { MyTasks } from "./context/myTask";
import { Orgs } from "./context/orgs";
import { User } from "./context/user";
import { IOrg } from "./interfaces/OrgInterface";
import { ITask } from "./interfaces/TaskInterface";
import Create from "./pages/create/Create";
import ErrorPage from "./pages/error/Error";
import GlobalError from "./pages/error/GlobalError";
import Login from "./pages/Login/Login";
import Organization from "./pages/Organization/Organization";
import Project from "./pages/project/Project";
import UserSpace from "./pages/User/User";
import { firebase } from "./firebase/firebase";

const db = firebase.firestore();

const App: FC = () => {
  const [users, setUsers] = useState<firebase.firestore.DocumentData[]>([]);
  const local_uid = JSON.parse(localStorage.getItem("uid") as string);
  const [loading, setLoading] = useState<boolean>(true);

  const loggedData = (): boolean => {
    return !!localStorage.getItem("logged");
  };
  const appearanceData = (): boolean => {
    return !!localStorage.getItem("isDarkMode");
  };
  const getUser = (): void => {
    if (!loading) {
      users.filter((user) => {
        if (user.uid === local_uid) {
          setUser(JSON.parse(user.user_information));
        }
      });
    }
  };
  const getOrgs = (): void => {
    if (!loading) {
      users.filter((user) => {
        if (user.uid === local_uid) {
          setOrgs(user.orgs);
        }
      });
    }
  };

  const getMyTasks = (): void => {
    if (!loading) {
      users.filter((user) => {
        if (user.uid === local_uid) {
          setMyTasks(user.my_tasks);
        }
      });
    }
  };

  const [logged, setLogged] = useState<boolean>(loggedData());
  const [isDarkMode, setIsDarkMode] = useState(appearanceData());
  const [user, setUser] = useState<any>({});
  const [orgs, setOrgs] = useState<IOrg[]>([]);
  const [myTasks, setMyTasks] = useState<ITask[]>([]);
  const [currentOrg, setCurrentOrg] = useState<string>(
    orgs.length > 0 ? orgs[0].org_id : ""
  );

  useEffect(() => {
    db.collection("users")
      .get()
      .then((snap) => {
        const data: firebase.firestore.DocumentData[] = [];
        snap.docs.forEach((doc) => {
          data.push(doc.data());
        });
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getUser();
    getOrgs();
    getMyTasks();
  }, [loading, logged]);

  useEffect(() => {
    if (logged) {
      if (!loading) {
        if (orgs.length >= 0) {
          db.collection("users").doc(local_uid).update({
            orgs: orgs,
            my_tasks: myTasks,
          });
        }
      }
    }
  }, [orgs, loading, myTasks]);

  return (
    <>
      <Router>
        {loading ? (
          <>loading.....</>
        ) : (
          <>
            {!logged && <Redirect to="/login" />}
            <IsLogged.Provider value={{ logged, setLogged }}>
              <User.Provider value={{ user, setUser }}>
                <IsDarkMode.Provider value={{ isDarkMode, setIsDarkMode }}>
                  <Orgs.Provider value={{ orgs, setOrgs }}>
                    <MyTasks.Provider value={{ myTasks, setMyTasks }}>
                      <CurrentOrg.Provider
                        value={{ currentOrg, setCurrentOrg }}
                      >
                        <div className="app vh-100 vw-100 overflow-hidden">
                          <Switch>
                            <Route path="/" exact>
                              <Redirect to="/u" />
                            </Route>
                            <Route exact path="/u">
                              <Redirect to="/u/overview" />
                            </Route>
                            <Route path="/login">
                              <Login users={users} />
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
          </>
        )}
      </Router>
    </>
  );
};

export default App;
