import React from "react";
import { Link } from "react-router-dom";

const SignupForm = ({ handleChangeSignupInputs,hanldeSignupForm ,loading,signUpInputs}) => {
  

  return (
    <div className="signup_container">
      <div className="login_md">
        <div className="login_content">
          <div>
            <h1>Sign Up</h1>
          </div>
          <form onSubmit={hanldeSignupForm} className="login_form">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                id='name'
                name='name'
                required
                value={signUpInputs.name}
                onChange={handleChangeSignupInputs}
              />
            </div>
            <div>
              <input
                type="number"
                id='number'
                name='number'
                placeholder="Mobile Number"
                value={signUpInputs.number}
                onChange={handleChangeSignupInputs}
              />
            </div>
            <div>
              <input
                type="email"
                id='email'
                name='email'
                placeholder="Email"
                required
                value={signUpInputs.email}
                onChange={handleChangeSignupInputs}
              />
            </div>
            <div>
              <input
                type="password"
                id='password'
                name='password'
                placeholder="Password"
                required
                value={signUpInputs.password}
                onChange={handleChangeSignupInputs}
              />
            </div>
            <button type="submit">{loading?'loading...':'Sign up'} </button>
          </form>
          <div className="or_link">
            <span>if you have an account</span>
            <Link className="link" to="/">
              login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
