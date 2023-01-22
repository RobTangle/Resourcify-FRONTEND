import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterElements, resetRenderized } from "../../redux/features/resource";
import { CategoryCheckbox } from "../filters/CategoryCheckbox";
import { KeywordCheckbox } from "./KeywordCheckbox";
// import { getOrCreateUser } from "../../redux/features/user/userThunk";
// import { useAuth0 } from "@auth0/auth0-react";

export function FilterOptions({ isLoggedIn }) {
  const userProfileState = useSelector((state) => state.user?.userProfile);

  const [filterObject, setFilterObject] = useState({
    categories: [],
    keywords: [],
  });

  const [toggleAND, setToggleAND] = useState(false);

  const dispatch = useDispatch();
  // console.log("userProfileState", userProfileState);

  const categoriesArray =
    userProfileState?.groupedDocs && Object.keys(userProfileState.groupedDocs);

  // console.log("categoriesArray", categoriesArray);

  let getUserKeywords = userProfileState?.resources
    ?.map((r) => r.keywords)
    ?.flat();

  let keywordsArray = [...new Set(getUserKeywords)]
    .filter((keyword) => keyword !== "")
    .sort();

  console.log("filterObject", filterObject);

  function onClickRenderizeFilters() {
    dispatch(
      filterElements(filterObject, userProfileState.resources, toggleAND)
    );
  }

  function handleCleanFilters() {
    dispatch(resetRenderized(userProfileState.resources));
    setFilterObject({
      categories: [],
      keywords: [],
    });
  }

  // function handleOnClicktoggleAND(e) {
  //   console.log("e.target.checked = ", e.target.checked);
  //   settoggleAND(e.target.checked);
  //   console.log("toggleAND = ", toggleAND);
  // }

  return (
    <>
      {/* {isLoggedIn === true && ( */}
      <div className="mt-5">
        <hr />
        {categoriesArray?.length === 0 && (
          <>
            {/* <button onClick={handleRefresh}>Refresh</button> */}
            <h3>It's Empty</h3>
          </>
        )}
        {categoriesArray?.length > 0 && (
          <>
            <h2 className="p-2 text-left mx-2">Choose Categories </h2>
            <ul className="grid w-full gap-5 md:grid-cols-9 mx-3">
              {categoriesArray?.map((category) => {
                return (
                  <CategoryCheckbox
                    category={category}
                    filterObject={filterObject}
                    setFilterObject={setFilterObject}
                    key={Math.random()}
                  />
                );
              })}
            </ul>
            <h2 className="p-2 text-left mx-2">Choose Keywords </h2>
            <div className="flex items-center m-2">
              <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                OR
              </span>
              <label className="relative inline-flex items-center mr-5 ml-3 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  onChange={(e) => setToggleAND(e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  AND
                </span>
              </label>
            </div>
            <ul className="grid w-full gap-5 md:grid-cols-9 mx-3">
              {keywordsArray?.map((keyword) => {
                return (
                  <KeywordCheckbox
                    keyword={keyword}
                    filterObject={filterObject}
                    setFilterObject={setFilterObject}
                    key={Math.random()}
                  />
                );
              })}
            </ul>
            <div className="grid w-full gap-5 md:grid-cols-8 mx-3 my-5">
              <button
                onClick={onClickRenderizeFilters}
                className="bg-blue-200 text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                {" "}
                Apply Filters{" "}
              </button>
              <button onClick={handleCleanFilters}> Clear </button>
            </div>
          </>
        )}
      </div>
      {/* )} */}
    </>
  );
}
