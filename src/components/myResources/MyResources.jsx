import React from "react";
import { Card } from "../card/Card";
import { useDispatch, useSelector } from "react-redux";
import { getOrCreateUser } from "../../redux/features/user/userThunk";
import { useAuth0 } from "@auth0/auth0-react";

export function MyResources({ isLoggedIn }) {
  const dispatch = useDispatch();
  const renderizedState = useSelector(
    (state) => state.resource?.renderized
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
          {renderizedState?.length === 0 && (
            <>
              {/* <button onClick={handleRefresh}>Refresh</button> */}
              <h3>
                You don't have any resource saved in the data base. What are you
                waiting for?!
              </h3>
            </>
          )}
          {renderizedState?.length > 0 && (
            <>
              <h2 className="p-2">My resources </h2>
              {/* <button onClick={handleRefresh}>Refresh</button> */}
              <div className="flex flex-row flex-wrap">
                {renderizedState.map((resource) => {
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
