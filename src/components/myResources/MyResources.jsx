import React from "react";
import { Card } from "../card/Card";
import { useSelector } from "react-redux";

export function MyResources({ isLoggedIn }) {
  const renderizedState = useSelector((state) => state.resource?.renderized);

  return (
    <>
      {isLoggedIn === true && (
        <div className="mt-5">
          <hr />
          {renderizedState.loading && (
            <div className="h3">
              <h3>Loading...</h3>
            </div>
          )}
          {renderizedState.error && (
            <div className="h-3">
              <p>{renderizedState.error}</p>
              <p>Check your connection and try again.</p>
            </div>
          )}
          {renderizedState?.length === 0 && (
            <>
              <h3>Nothing to show...</h3>
            </>
          )}
          {renderizedState?.length > 0 && (
            <>
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
