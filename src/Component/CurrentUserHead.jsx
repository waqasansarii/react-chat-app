import React from "react";
import Button from "@material-ui/core/Button";
import firebase from "../Config/FirebaseConfig";
import { useHistory } from "react-router-dom";
import { login } from "../Store/CreateSlice";
import { useDispatch } from "react-redux";
// import more from "../Assets/more.png";
import userIcon from "../Assets/userIcon.png";

const CurrentUserHead = ({ userData }) => {
  let { name, uid, img } = userData;
  const dispatch = useDispatch();
  const history = useHistory();
  const allUsers = firebase.firestore().collection("users");

  const isOfflineForFirestore = {
    state: "offline",
    lastChange: new Date().toLocaleString(),
  };
  const handleLogout = () => {
    firebase
    .auth()
    .signOut()
    .then(() => {
      
      dispatch(login(false));
      // allUsers.doc(uid).update(isOfflineForFirestore);
      history.push("/");
    })
    .catch((err) => {
      console.log(err);
    });
  };
  return (
    <div className="crnt_user_head_container">
      <div className="crnt_user_head_md">
        <div className="Crnt_user_info">
          <div className="crnt_user_name" key={uid}>
            <img className="c_usr_img" src={img ? img : userIcon} alt="user" />
            <p>{name}</p>
          </div>
          {/* <div className="more_img">
              <img src={more} alt="more" />
          </div> */}
          <div>
            <Button onClick={handleLogout} variant="outlined" color="primary">
              logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentUserHead;
