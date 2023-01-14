import Swal from "sweetalert2";
import axios from "axios";
import { NAME_ACCESS_TOKEN, header } from "../../../helpers/constants";

import { URL_CREATE_NEW_RESOURCE } from "../../../helpers/URLs";
import { setUserProfile } from "../user/userSlice";

// export function fetchAllResources() {
//   return async function (dispatch) {
//     try {
//       const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN);
//       let response = await axios.get(
//         URL_SERVER + "/bookmarks",
//         header(accessToken)
//       );
//       if (response.status === 200) {
//         return dispatch(setAllResources(response.data));
//       }
//     } catch (error) {
//       Swal.fire({
//         title: "Oops! Something went wrong",
//         text: error?.response?.data?.message?.[0] || error.message,
//         icon: "error",
//         showConfirmButton: true,
//         showCloseButton: true,
//       });
//     }
//   };
// }

export function createResource(form, setForm, token) {
  return async function (dispatch) {
    try {
      const accessToken = localStorage.getItem(NAME_ACCESS_TOKEN) || token;
      const response = await axios.post(
        URL_CREATE_NEW_RESOURCE,
        form,
        header(accessToken)
      );
      console.log("reponse = ", response);
      if (response.status === 201 || response.status === 200) {
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
          description: "",
          link: "",
          category: "",
          keywords: "",
        });
      }
      // La request me responde con el usuario actualizado:
      return dispatch(setUserProfile(response.data));
    } catch (error) {
      console.log(error);
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
