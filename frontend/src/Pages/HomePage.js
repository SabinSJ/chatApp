import React from "react";

// import { useQuery } from "@apollo/client";
// import jwt_decode from "jwt-decode";

// import { GET_USERS, GET_PERSONAL_DATA } from "../Services/Queries/user";

const HomePage = () => {
  // const getUsers = useQuery(GET_USERS);
  // const getPersonalData = useQuery(GET_PERSONAL_DATA, {
  //   variables: { id: jwt_decode(window.localStorage.getItem("token")).id },
  // });

  //   useEffect(() => {
  //     if (getUsers && getUsers.getUsers) {
  //       console.log(getUsers.getUsers);
  //     }
  //   }, []);

  // useEffect(() => {
  //   if (!getPersonalData.loading && getPersonalData.data) {
  //     console.log(getPersonalData);
  //     window.localStorage.setItem(
  //       "profileImage",
  //       getPersonalData.data.profileImage
  //     );
  //     window.localStorage.setItem(
  //       "name",
  //       getPersonalData.data.getPersonalData.name
  //     );
  //     window.localStorage.setItem(
  //       "username",
  //       getPersonalData.data.getPersonalData.username
  //     );
  //     window.localStorage.setItem(
  //       "bio",
  //       getPersonalData.data.getPersonalData.bio
  //     );
  //     window.localStorage.setItem(
  //       "email",
  //       getPersonalData.data.getPersonalData.email
  //     );
  //     window.localStorage.setItem(
  //       "gender",
  //       getPersonalData.data.getPersonalData.gender
  //     );
  //   }
  // }, [getPersonalData.data, getPersonalData.loading]);

  return <p>Home Page</p>;
};

export default HomePage;
