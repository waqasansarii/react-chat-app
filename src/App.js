import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./Store/CreateSlice";
import firebase from "./Config/FirebaseConfig";
import AppRouter from "./Router/Router";
import "./App.css";

function App() {
  let [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  
  const isUser = useSelector((state) => {
    return state.chatReducer.userLogin;
  });
  // const userId = firebase.auth().currentUser.uid
  // console.log(userId)
  const allUsers = firebase.firestore().collection('users')
  const isOnlineForFirestore = {
    state: 'online',
    lastChange:new Date().toLocaleString()
};
const isOfflineForFirestore = {
  state: 'offline',
  lastChange:new Date().toLocaleString()
};

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoading(true);
        // console.log(user)
        allUsers.doc(user.uid).update(isOnlineForFirestore)
        dispatch(login(true));
      } else {
        setLoading(true);
        allUsers.doc(user.uid).update(isOfflineForFirestore)
      }
      // firebase.firestore().collection('statu').doc().onDisconnected()
      

    });
  },[]);

  if (!loading) {
    return <div>loading</div>;
  }

  return (
    <div>
      <AppRouter isActive={isUser} />
    </div>
  );
}

export default App;
