export const URL = import.meta.env.VITE_URL || "http://localhost:3131";

//users
export const URL_U_PO_CREATE_USER = URL + "/user";
export const URL_U_G_GET_USER = URL + "/user";
export const URL_EXISTS_IN_DB = URL + "/user/exists";

//source
export const URL_CREATE_NEW_RESOURCE = URL + "/source";
export const URL_S_PA_UPDATE_RESOURCE = URL + "/source";
export const URL_S_DE_DELETE_RESOURCE = URL + "/source";
export const URL_S_G_PARSE_LINK = URL + "/source/link/?link=";
