import React, { useEffect, useState } from "react";
import CurrentUserHead from "../../Component/CurrentUserHead";
// import UsersList from "../../Component/UsersList";
import ChatAndPeopleTabs from "../../Component/ChatPeopleTabs";
import ChatBox from "../../Component/ChatBox";
import firebase from "../../Config/FirebaseConfig";
import {
  currentUserDataSet,
  getAllUsers,
  chatDataFromFirebase,
} from "../../Store/CreateSlice";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  //   const [allUsers,setAllusers] = useState([])
  let dispatch = useDispatch();

  const getCurrentUserData = firebase.firestore().collection("users");
  const chatRoom = firebase.firestore().collection("chatRoom");
  const currentUserAuthUid = firebase.auth().currentUser.uid;
  const selector = useSelector((state) => {
    return state.chatReducer;
  });
  let { currentUserData } = selector;

  useEffect(() => {
    const getDataFromFirebase = async () => {
      getCurrentUserData.orderBy("name", "desc").onSnapshot((usersData) => {
        const allUsers = [];
        usersData.forEach((res) => {
          const usersExists = res.data();

          // get current user data from users list
          const { uid } = usersExists;
          if (uid === currentUserAuthUid) {
            const getCurentUser = usersExists;
            dispatch(currentUserDataSet(getCurentUser));
          }

          // get all users execpt current user
          if (uid !== currentUserAuthUid) {
            // console.log(usersExists);
            allUsers.push(usersExists);
            // console.log(allUsers)
          }
        });
        dispatch(getAllUsers(allUsers));
        setLoading(true);
      });
    };

    // get chat room data from firebase 
    const getChatRoomData = async () => {
      chatRoom.onSnapshot((chatData) => {
        const allChatData = [];
        chatData.forEach((res) => {
          allChatData.push(res.data());
          // console.log(res.id)
        });
        // console.log(allChatData)
        dispatch(chatDataFromFirebase(allChatData));
      });
    };
    
    getDataFromFirebase();
    getChatRoomData();
  }, []);

  if (!loading) {
    return <div>loading....</div>;
  }

  return (
    <div className="dashboard_container">
      <div className="dashboard_md">
        <div className="dashboard_left_content">
          <CurrentUserHead userData={currentUserData} />
          {/* <UsersList /> */}
          <ChatAndPeopleTabs  />
        </div>
        <div className="dashboar_right_contet">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
