import { setUserProfile } from "./userSlice";
import Swal from "sweetalert2";
import axios from "axios";
import { header } from "../../../helpers/constants";
import { URL_U_G_GET_USER, URL_U_PO_CREATE_USER } from "../../../helpers/URLs";

export function fetchUserInfo(accessToken) {
  return async function (dispatch) {
    try {
      let response = await axios.get(URL_U_G_GET_USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      return dispatch(setUserProfile(response.data));
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 404) {
        console.log(
          "Error status === 404. Creando nuevo usuario con el AT recibido..."
        );
        return dispatch(createNewUser(accessToken));
      } else {
        return Swal.fire({
          title: "Oops! Something went wrong 😥",
          text: error.message,
          icon: "error",
        });
      }
    }
  };
}

export function createNewUser(accessToken) {
  return async function (dispatch) {
    try {
      let response = await axios.post(
        URL_U_PO_CREATE_USER,
        {},
        header(accessToken)
      );
      if (response.status === 201) {
        dispatch(setUserProfile(response.data));
        Swal.fire({
          title: "Welcome! 😀",
          text: "You are now registered. Enjoy a new way of organizing your knowledge sources with Resourcify!",
          showConfirmButton: "LET'S GO!",
        });
      } else {
        console.log(
          "CREATE NEW USER RESPONDIÓ CON !== 201. Response =",
          response
        );
      }
    } catch (error) {
      console.log("Error en createNewUser. ", error);
      return Swal.fire({
        title: "Oops! Something went wrong 😩",
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
      let response = await axios.get(URL_U_G_GET_USER, {
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
