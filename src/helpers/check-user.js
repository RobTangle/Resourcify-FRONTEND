//check if user existe en db
import { URL_EXISTS_IN_DB } from "./URLs";
import { NAME_ACCESS_TOKEN } from "./constants";

export async function userExist(
  user,
  isAuthenticated,
  navigate,
  getAccessTokenSilently
) {
  const claims = await getAccessTokenSilently();
  localStorage.setItem(NAME_ACCESS_TOKEN, claims);
  try {
    if (isAuthenticated && user) {
      let exist = await fetch(
        URL_EXISTS_IN_DB, // El user_id va por Token:
        {
          headers: {
            Authorization: `Bearer ${claims}`,
          },
        }
      ).then((response) => response.json());
      if (exist.msg) {
        navigate("/home");
      }
      if (exist.msg === false) {
        navigate("/signup");
      }
    }
  } catch (error) {
    console.log(`Error en el Login Button`);
    console.log(error);
  }
}
