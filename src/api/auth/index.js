import CryptoJS from "crypto-js";

export const isAuthenticated = async () => {
  if (
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authReducer)
      .token &&
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).authReducer)
      .token.length === 0
  ) {
    console.log("@@@@@@@");

    return false;
  }
  console.log("here");
  let token = await JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).authReducer
  ).token;
  console.log(token);
  let user =await JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).authReducer
  ).userDetails;
  console.log(user);
  if (typeof window == "undefined") {
    return false;
  }
  if (token) {
    console.log("********");
    console.log(token);
    console.log("return");
    return { token, user };
  } else {
    return false;
  }
};
