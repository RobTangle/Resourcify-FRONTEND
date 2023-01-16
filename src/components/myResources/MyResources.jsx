import React from "react";
import { Card } from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getOrCreateUser } from "../../redux/features/user/userThunk";
import { useAuth0 } from "@auth0/auth0-react";

export function MyResources({ isLoggedIn }) {
  const dispatch = useDispatch();
  const userResourcesState = useSelector(
    (state) => state.user?.userProfile?.resources
  );

  const { getAccessTokenSilently } = useAuth0();

  function handleRefresh() {
    async function getUserProfileAgain() {
      const accessToken = await getAccessTokenSilently();
      dispatch(getOrCreateUser(accessToken));
      console.log("all resources fetched!");
    }
    getUserProfileAgain();
  }

  return (
    <>
      {isLoggedIn === true && (
        <div className="mt-5">
          <hr />
          {userResourcesState?.length === 0 && (
            <>
              {/* <button onClick={handleRefresh}>Refresh</button> */}
              <h3>
                You don't have any resource saved in the data base. What are you
                waiting for?!
              </h3>
            </>
          )}
          {userResourcesState?.length > 0 && (
            <>
              <h2>My resources </h2>
              {/* <button onClick={handleRefresh}>Refresh</button> */}
              <div className="flex flex-row flex-wrap">
                {userResourcesState.map((resource) => {
                  return <Card resource={resource} key={Math.random()} />;
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
