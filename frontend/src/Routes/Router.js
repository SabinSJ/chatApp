import React from "react";

import { Route, Routes } from "react-router-dom";

import HomePage from "../Pages/HomePage";
import LoginPage from "../Pages/LoginPage";
import RegisterPage from "../Pages/RegisterPage";
import SettingsPage from "../Pages/SettingsPage";
import Navbar from "../Layouts/Navbar";

import AuthenticationRoute from "./AuthenticationRoute";
import UserPage from "../Pages/UserPage";

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

      <Route exact path="/" element={<AuthenticationRoute />}>
        <Route
          exact
          path="/:username"
          element={
            <>
              <Navbar />
              <UserPage />
              {/* <Footer /> */}
            </>
          }
        />
      </Route>

      <Route exact path="/" element={<AuthenticationRoute />}>
        <Route
          exact
          path="/settings"
          element={
            <>
              <Navbar />
              <SettingsPage />
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
