import React, { FC, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { Redirect, useHistory } from "react-router-dom";
import logo from "../../assets/logo.png";
import { IsLogged } from "../../context/isLogged";
import { User } from "../../context/user";
import { firebase } from "../../firebase/firebase";
import { Acroname } from "../../functions/Acroname";
import { setId } from "../../functions/SetId";
import { setRandomAvatarBack } from "../../functions/SetRandomAvatarBack";

interface Props {
  users: firebase.firestore.DocumentData[];
}

const Login: FC<Props> = (props) => {
  const { users } = props;
  const db = firebase.firestore();
  const { logged, setLogged }: any = useContext(IsLogged);
  const { setUser }: any = useContext(User);
  const history = useHistory();
  const authenticate = (): void => {
    const google_provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(google_provider)
      .then((re) => {
        if (users) {
          users.filter((user) => {
            if (user?.uid !== re.user?.uid) {
              db.collection("users")
                .doc(re.user?.uid)
                .set({
                  name: re.user?.displayName,
                  uid: re.user?.uid,
                  orgs: [
                    {
                      org_name: re.user?.displayName + "'s Organization",
                      org_id: setId(re.user?.displayName + "'s_organization"),
                      org_avatar_txt: Acroname(re.user?.displayName),
                      org_avatar_back: setRandomAvatarBack(),
                      projects: [
                        {
                          project_name: re.user?.displayName + "'s Project",
                          project_id: setId(
                            re.user?.displayName + "'s_project"
                          ),
                          project_avatar_txt: Acroname(re.user?.displayName),
                          project_avatar_back: setRandomAvatarBack(),
                          tabs: [{ text: "Lists", id: "lists", tasks: [] }],
                          sublists: [],
                        },
                      ],
                    },
                  ],
                  user_information: JSON.stringify(re),
                  my_tasks: [],
                });
            }
          });
        }
        localStorage.setItem("logged", "true");
        localStorage.setItem("uid", JSON.stringify(re.user?.uid));
        setLogged(true);
        setUser(re);
        history.push("/u/overview");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  if (logged) {
    return <Redirect to="/u" />;
  }
  return (
    <div className="login-page vw-100 vh-100 overflow-hidden position-relative">
      <div className="header position-absolute top-0">
        <div className="logo-wrapper">
          <img className="fitimage" src={logo} alt="" />
        </div>
      </div>
      <div className="main w-100 h-100 d-flex flex-column align-items-center justify-content-center">
        <h2>Sign in to Quire</h2>
        <h5 className="text-silver">Unfold Your Ideas</h5>
        <div
          onClick={authenticate}
          className="login-button pointer d-flex gap-3 px-3 mt-3 shadow-sm align-items-center justify-content-between"
        >
          <i className="h-100 d-flex align-items-center justify-content-center">
            <FcGoogle />
          </i>
          <div className="h-100 w-100 d-flex align-items-center justify-content-center">
            <p className="m-0">Sign in with Google</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
