import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from "../Services/Queries/user";

import InputField from "../Layouts/InputField";

import laptopMockup from "../Assets/Pictures/laptop-mockup.png";
import "../Assets/Styles/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({ username: "", password: "" });

  const [login, { data }] = useMutation(LOGIN_USER);

  const resetInputs = () => {
    setFormValues({ username: "", password: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login({
        variables: {
          input: {
            username: formValues.username,
            password: formValues.password,
          },
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (data && data.login.status === 200) {
      const token = data.login.message;
      window.localStorage.setItem("token", token);
      resetInputs();
      navigate("/");
    }
  }, [data]);

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className={"login-page-container"}>
      <div className={"login-page-content"}>
        <div className={"login-page-left-section"}>
          <img className={"login-page-mockup-image"} src={laptopMockup} />
        </div>

        <div className={"login-page-right-section"}>
          <div className="login-page-form-container">
            <p>SnapTalk</p>

            <form
              className="login-page-form-inputs"
              id="login-form"
              onSubmit={handleLogin}
            >
              <InputField
                title="email"
                type="texet"
                onChange={(val) => {
                  setFormValues({ ...formValues, username: val });
                }}
                value={formValues.username}
              />
              <InputField
                title="password"
                type="password"
                onChange={(val) => {
                  setFormValues({ ...formValues, password: val });
                }}
                value={formValues.password}
              />
            </form>

            <button
              className={
                formValues.username && formValues.password
                  ? "login-page-submit-button"
                  : "login-page-submit-button-not-completed"
              }
              type="submit"
              form="login-form"
            >
              Login
            </button>

            <div className="divider" />

            <button className="login-page-forgot-password-button">
              Forgot password?
            </button>
          </div>

          <div className="login-page-register-container">
            <p className="login-page-register-label">Don't have an account?</p>
            <button
              className="login-page-register-button"
              onClick={handleRegister}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
