import { MyResources } from "../components/myResources/MyResources";
import { NewResource } from "../components/newResource/NewResource";
import { Navbar } from "../components/navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrCreateUser } from "../redux/features/user/userThunk";

export function Home() {
  const { user, isLoading, isAuthenticated, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.user?.userProfile?.user);

  React.useEffect(() => {
    async function handleGetOrCreateUser() {
      if (!isLoading && isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        dispatch(getOrCreateUser(accessToken));
        console.log("DESPACHADO GET OR CREATE USER");
      }
    }
    if (!userProfile) {
      console.log("!USER PROFILE. getOrCreateUser() en Home ");
      handleGetOrCreateUser();
    }
  }, [isLoading]);

  return (
    <div>
      <h1>Home</h1>
      {isAuthenticated ? <h2>Welcome, {user?.name}!</h2> : null}
      <h3>Is Authenticated: {isAuthenticated ? "true" : "false"}</h3>
      <Navbar isLoggedIn={isAuthenticated} />
      <NewResource isLoggedIn={isAuthenticated} />
      <MyResources isLoggedIn={isAuthenticated} />
    </div>
  );
}
