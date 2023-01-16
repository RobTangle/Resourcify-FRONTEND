import { MyResources } from "../components/myResources/MyResources";
import { Navbar } from "../components/navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../redux/features/user/userThunk";
import { ModalCreateResource } from "../components/ModalsCreateResource/ModalCreateResource";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.userProfile?.user);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log(
        "Usuario no autenticado. Redirigiendo al landing para que se loguee"
      );
      navigate("/");
    }
    async function handleGetOrCreateUser() {
      if (!isLoading && isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        dispatch(fetchUserInfo(accessToken));
        console.log("DESPACHADO FETCH USER INFO.");
      }
    }
    if (!userProfile) {
      console.log("!USER PROFILE. handleGetOrCreateUser() en Home ");
      handleGetOrCreateUser();
    }
  }, [isLoading]);

  return (
    <div>
      <h1>Home</h1>
      <Navbar isLoggedIn={isAuthenticated} />
      {isAuthenticated ? <h2>Welcome, {user?.name}!</h2> : null}
      <h3>Is Authenticated: {isAuthenticated ? "true" : "false"}</h3>
      <div>
        <div className="mt-3">
          <ModalCreateResource />
        </div>
      </div>
      <MyResources isLoggedIn={isAuthenticated} />
    </div>
  );
}
