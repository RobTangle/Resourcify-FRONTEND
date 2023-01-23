import axios from "axios";
import { header } from "../../../helpers/constants";
import {
  URL_CREATE_NEW_RESOURCE,
  URL_S_PA_UPDATE_RESOURCE,
  URL_S_DE_DELETE_RESOURCE,
} from "../../../helpers/URLs";
import { setUserProfile } from "../user/userSlice";
import {
  filterResources,
  searchObjects,
} from "../../../helpers/filterResources";
import { setRenderized, setFilter } from "./resourceSlice";
import {
  SwalErrorMX,
  ToastErrorMX,
  ToastSuccessMX,
} from "../../../helpers/swals";

export function createResource(form, setForm, accessToken, filterState) {
  return async function (dispatch) {
    try {
      const response = await axios.post(
        URL_CREATE_NEW_RESOURCE,
        form,
        header(accessToken)
      );
      if (response.status === 201) {
        ToastSuccessMX("Resource created!").fire();
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
      dispatch(setUserProfile(response.data));
      dispatch(
        filterElements(
          filterState,
          response.data.resources,
          filterState.toggleAND
        )
      );
    } catch (error) {
      console.log("error en createNewResource! ", error);
      ToastErrorMX(error).fire();
    }
  };
}

export function editResource(id, form, accessToken, filterState) {
  return async function (dispatch) {
    try {
      const response = await axios.patch(
        URL_S_PA_UPDATE_RESOURCE + `/${id}`,
        form,
        header(accessToken)
      );
      if (response.status === 200) {
        ToastSuccessMX("Resource edited!").fire();
      }
      // La request me responde con el usuario actualizado:
      dispatch(setUserProfile(response.data));
      dispatch(
        filterElements(
          filterState,
          response.data.resources,
          filterState.toggleAND
        )
      );
    } catch (error) {
      console.log("error en createNewResource! ", error);
      ToastErrorMX(error).fire();
    }
  };
}

export function deleteResource(id, accessToken, renderizedArray) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(
        URL_S_DE_DELETE_RESOURCE + `/${id}`,
        header(accessToken)
      );
      console.log("reponse = ", response);
      if (response.status === 200) {
        ToastSuccessMX("Resource deleted!").fire();
        // La request me responde con el usuario actualizado:
        dispatch(setUserProfile(response.data));
        const renderizedArrayUpdated = renderizedArray.filter(
          (doc) => doc._id !== id
        );
        return dispatch(setRenderized(renderizedArrayUpdated));
      } else {
        throw new Error("Conflictive response status.");
      }
    } catch (error) {
      console.log(error);
      SwalErrorMX(error).fire();
    }
  };
}

export function filterElements(filterObj, userAllResources, toggleAND) {
  return async function (dispatch) {
    try {
      const filteredElements = filterResources(
        userAllResources,
        filterObj,
        toggleAND
      );
      console.log(
        "Despachando setRenderized con un arreglo de length = ",
        filteredElements.length
      );
      dispatch(setRenderized(filteredElements));
    } catch (error) {
      SwalErrorMX(error).fire();
    }
  };
}

export function resetRenderized(userAllResources) {
  return async function (dispatch) {
    try {
      console.log(
        "Despachando resetRenderized con un arreglo de length = ",
        userAllResources.length
      );
      dispatch(setRenderized(userAllResources));
    } catch (error) {
      SwalErrorMX(error).fire();
    }
  };
}

export function renderElemsByKeyword(keyword, userAllResources) {
  console.log("userAllResources = ", userAllResources);
  console.log("ejecutando renderElemesByKeyword con keyword = ", keyword);
  return async function (dispatch) {
    try {
      const arrayFilteredByKeyword = userAllResources.filter((elem) =>
        elem.keywords.some((string) => string == keyword)
      );
      console.log(
        "arrayFilteredByKeyword.length = ",
        arrayFilteredByKeyword.length
      );
      return dispatch(setRenderized(arrayFilteredByKeyword));
    } catch (error) {
      SwalErrorMX(error).fire();
    }
  };
}

export function loadingRenderized() {
  return async function (dispatch) {
    try {
      console.log("Despachando loadingRenderized");
      dispatch(setRenderized({ loading: true }));
    } catch (error) {
      SwalErrorMX(error).fire();
    }
  };
}

export function errorRenderized(errorMessage) {
  return async function (dispatch) {
    try {
      console.log("Despachando loadingRenderized");
      dispatch(setRenderized({ error: errorMessage }));
    } catch (error) {
      SwalErrorMX(error).fire();
    }
  };
}

export function setFilterState(filterObj) {
  return async function (dispatch) {
    try {
      dispatch(setFilter(filterObj));
    } catch (error) {
      SwalErrorMX(error).fire();
    }
  };
}

export function searchElementsWithSearchBar(searchInput, userAllResources) {
  return async function (dispatch) {
    try {
      const searchedObjects = searchObjects(searchInput, userAllResources);
      dispatch(setRenderized(searchedObjects));
    } catch (error) {
      ToastErrorMX(error).fire();
    }
  };
}
