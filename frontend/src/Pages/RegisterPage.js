import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import InputField from "../Layouts/InputField";

import { REGISTER_USER } from "../Services/Queries/user";

import "../Assets/Styles/RegisterPage.scss";

const RegisterPage = () => {
  const [registerUser] = useMutation(REGISTER_USER);

  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //   const [formValuesError, setFormValuesError] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);

    try {
      let user = await registerUser({
        variables: {
          input: {
            username: formValues.username,
            email: formValues.email,
            password: formValues.password,
            confirmPassword: formValues.confirmPassword,
          },
        },
      });

      if (user.data.register.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginButton = () => {
    navigate("/login");
  };

  return (
    <div className={"register-page-container"}>
      <div className={"register-page-content"}>
        <div className="register-page-form-container">
          <p>SnapTalk</p>

          <form
            className="register-page-form-inputs"
            id="register-form"
            onSubmit={handleSubmit}
          >
            <InputField
              title="username"
              type="text"
              onChange={(val) => {
                setFormValues({ ...formValues, username: val });
              }}
              value={formValues.uesrname}
            />
            <InputField
              title="email"
              type="email"
              onChange={(val) => {
                setFormValues({ ...formValues, email: val });
              }}
              value={formValues.email}
            />
            <InputField
              title="password"
              type="password"
              onChange={(val) => {
                setFormValues({ ...formValues, password: val });
              }}
              value={formValues.password}
            />
            <InputField
              title="confirm password"
              type="password"
              onChange={(val) => {
                setFormValues({ ...formValues, confirmPassword: val });
              }}
              value={formValues.confirmPassword}
            />
          </form>

          <button
            className={
              formValues.username &&
              formValues.email &&
              formValues.password &&
              formValues.confirmPassword
                ? "register-page-submit-button"
                : "register-page-submit-button-not-completed"
            }
            type="submit"
            form="register-form"
          >
            Register
          </button>
        </div>

        <div className="register-page-register-container">
          <p className="register-page-register-label">Have an account?</p>
          <button
            className="register-page-register-button"
            onClick={handleLoginButton}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
