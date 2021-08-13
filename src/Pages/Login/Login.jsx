import React, { useState } from "react";
import Alert from "../../Component/Alert";
import LoginForm from "../../Component/LoginForm";
import firebase from "../../Config/FirebaseConfig";
import "./login.css";

const inputFieldValue = {
  email: "",
  password: "",
};

const Login = () => {
  let [errorAlert, setErrorAlert] = useState(false);
  let auth = firebase.auth();
  // let usersData = firebase.firestore().collection("users");
  const [loading, setLoading] = useState(false);
  const [loginInputs, setLoginInputs] = useState(inputFieldValue);
  const handleChangeLoginInputs = (event) => {
    setLoginInputs({
      ...loginInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    let { email, password } = loginInputs;
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userLogin) => {
        setLoading(false);
        console.log("user login");
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
        setErrorAlert(true);
      });
    setLoginInputs(inputFieldValue);
  };

  return (
    <div>
      <Alert
        errorAlert={errorAlert}
        setAlertState={setErrorAlert}
        message="This email or password is invalid!"
      />
      <LoginForm
        handleChange={handleChangeLoginInputs}
        handleSubmit={handleLoginSubmit}
        inputsValues={loginInputs}
        loading={loading}
      />
    </div>
  );
};

export default Login;
