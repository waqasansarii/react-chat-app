import React, { useState } from "react";
import SignupForm from "../../Component/SignupForm";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import firebase from "../../Config/FirebaseConfig";
import { login } from "../../Store/CreateSlice";
import Alert from "../../Component/Alert";

const inputFieldValue = {
  name: "",
  number: "",
  email: "",
  password: "",
};

const Signup = () => {
  let [errorAlert, setErrorAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  let auth = firebase.auth();
  let usersData = firebase.firestore().collection("users");
  
  const [signUpInputs, setSignupInputs] = useState(inputFieldValue);

  const handleChangeSignupInputs = (event) => {
    setSignupInputs({
      ...signUpInputs,
      [event.target.name]: event.target.value,
    });
  };
  const hanldeSignupForm = (event) => {
    event.preventDefault();
    setLoading(true);
    let { email, password, name, number } = signUpInputs;
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setLoading(false);
        let user = userCredential.user;
        let { uid, email } = user;
        history.push("/dashboard");
        dispatch(login(true));
        // set users data in firestore
        usersData
          .doc(uid)
          .set({ uid, email, name, number })
          .then((data) => {
            console.log("data set");
          })
          .catch((err) => {
            // console.log(err);
          });
        // console.log(data);
      })
      .catch((err) => {
        setLoading(false);
        setErrorAlert(true);
        // console.log(err);
      });
    setSignupInputs(inputFieldValue);
  };

  return (
    <div>
      <Alert
        errorAlert={errorAlert}
        setAlertState={setErrorAlert}
        message="This email is already exist"
      />
      <SignupForm
        handleChangeSignupInputs={handleChangeSignupInputs}
        hanldeSignupForm={hanldeSignupForm}
        loading={loading}
        signUpInputs={signUpInputs}
      />
    </div>
  );
};

export default Signup;
