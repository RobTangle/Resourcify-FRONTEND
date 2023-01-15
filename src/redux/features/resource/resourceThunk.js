import Swal from "sweetalert2";
import axios from "axios";
import { header } from "../../../helpers/constants";

import { URL_CREATE_NEW_RESOURCE } from "../../../helpers/URLs";
import { setUserProfile } from "../user/userSlice";

export function createResource(form, setForm, accessToken) {
  console.log("createResource 1");
  return async function (dispatch) {
    try {
      console.log("createResource 2 adentro de try catch");
      // const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN) || token;
      const response = await axios.post(
        URL_CREATE_NEW_RESOURCE,
        form,
        header(accessToken)
      );
      console.log("reponse = ", response);
      if (response.status === 201) {
        console.log("Response status === 201");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Resource created!",
          showConfirmButton: true,
          timer: 5000,
          timerProgressBar: true,
        });
        setForm({
          title: "",
          link: "",
          category: "",
          description: "",
          order: 0,
          is_favourite: false,
          keywords: "",
        });
      }
      // La request me responde con el usuario actualizado:
      return dispatch(setUserProfile(response.data));
    } catch (error) {
      console.log("error en createNewResource! ", error);
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "Oops! Something went wrong!",
        text: error?.response?.data?.message?.[0] || error.message,
        showConfirmButton: true,
      });
    }
  };
}
