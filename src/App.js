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

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoading(true);
        dispatch(login(true));
      } else {
        setLoading(true);
      }

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
