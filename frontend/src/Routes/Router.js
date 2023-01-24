import React from "react";

import { Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import Navbar from "../Layouts/Navbar";

import AuthenticationRoute from "./AuthenticationRoute";

const Router = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<AuthenticationRoute />}>
        <Route
          exact
          path="/"
          element={
            <>
              <Navbar />
              <HomePage />
              {/* <Footer /> */}
            </>
          }
        />
      </Route>

      <Route
        exact
        path="/login"
        element={
          <>
            <LoginPage />
          </>
        }
      />

      <Route
        exact
        path="/register"
        element={
          <>
            <RegisterPage />
          </>
        }
      />
    </Routes>
  );
};

export default Router;
