import React from "react";

import { Outlet, Navigate } from "react-router-dom";

const AuthenticationRoute = () => {
  var jwtToken = localStorage.getItem("token");

  return jwtToken !== null ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthenticationRoute;
