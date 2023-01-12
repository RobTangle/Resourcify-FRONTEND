import { setUserProfile } from "./userSlice";
import Swal from "sweetalert2";
import axios from "axios";
import { NAME_ACCESS_TOKEN } from "../../../helpers/constants";
import { URL_GET_USER_INFO } from "../../../helpers/URLs";
export function fetchUserInfo() {
  return async function (dispatch) {
    try {
      const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN);
      let response = await axios.get(URL_SERVER + "/user/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return dispatch(setUserProfile(response.data));
    } catch (error) {
      console.log(error);
      return Swal.fire({
        title: "Oops! Something went wrong 😥",
        text: error.message,
        icon: "error",
      });
    }
  };
}

export function getOrCreateUser(accessToken) {
  return async function (dispatch) {
    try {
      // const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN);
      let response = await axios.get(URL_GET_USER_INFO, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return dispatch(setUserProfile(response.data));
    } catch (error) {
      console.log(error);
      return Swal.fire({
        title: "Oops! Something went wrong 😥",
        text: error.message,
        icon: "error",
      });
    }
  };
}
