import React from "react";
import { Card } from "../card/Card";
import { useSelector } from "react-redux";

export function MyResources({ isLoggedIn }) {
  const userResourcesState = useSelector(
    (state) => state.user?.userProfile?.resources
  );

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
