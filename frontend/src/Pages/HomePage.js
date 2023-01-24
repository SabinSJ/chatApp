import React, { useEffect } from "react";

import { useQuery } from "@apollo/client";

import { GET_USERS } from "../Services/Queries/user";

const HomePage = () => {
  const getUsers = useQuery(GET_USERS);

  //   useEffect(() => {
  //     if (getUsers && getUsers.getUsers) {
  //       console.log(getUsers.getUsers);
  //     }
  //   }, []);

  return <p>Home Page</p>;
};

export default HomePage;
