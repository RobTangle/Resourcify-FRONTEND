import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterElements,
  resetRenderized,
  sortRenderizedByOrder,
} from "../../redux/features/resource";
import { CategoryCheckbox } from "../filters/CategoryCheckbox";
import { KeywordCheckbox } from "./KeywordCheckbox";
import { setFilterState } from "../../redux/features/resource";

export function FilterOptions() {
  const [isVisible, setIsVisible] = useState(false);
  const userProfileState = useSelector((state) => state.user?.userProfile);
  const renderizedArray = useSelector((state) => state.resource?.renderized);
  const [filterObject, setFilterObject] = useState({
    categories: [],
    keywords: [],
  });

  const [toggleAND, setToggleAND] = useState(false);
  const [toggleFavourites, setToggleFavourites] = useState(false);

  const dispatch = useDispatch();

  const groupedDocs = userProfileState?.groupedDocs;

  // Get array of categories:
  const categoriesArray = groupedDocs && Object.keys(groupedDocs);
  // get all the keywords:
  let getUserKeywords = userProfileState?.resources
    ?.map((r) => r.keywords)
    ?.flat();
  // Create object with {key:keyword : value:number of keyword repeated}
  const objOfKeywords = getUserKeywords?.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  // Create array of unique keywords:
  let keywordsArray = [...new Set(getUserKeywords)]
    .filter((keyword) => keyword !== "")
    .sort();

  function onClickRenderizeFilters() {
    dispatch(
      filterElements(
        filterObject,
        userProfileState.resources,
        toggleAND,
        toggleFavourites
      )
    );
    dispatch(setFilterState({ ...filterObject, toggleAND }));
  }

  function handleCleanFilters() {
    dispatch(resetRenderized(userProfileState.resources));
    setFilterObject({
      categories: [],
      keywords: [],
    });
    dispatch(
      setFilterState({
        categories: [],
        keywords: [],
        toggleAND: false,
        toggleFavourites: false,
      })
    );
  }

  function handleSortByOrder(e) {
    const value = e.target.id;
    // console.log(value);
    dispatch(sortRenderizedByOrder(value, renderizedArray));
  }

  return (
    <>
      <button onClick={handleCleanFilters}>Show all</button>
      <button className="" onClick={() => setIsVisible(!isVisible)}>
        {isVisible === true ? "Hide filter options" : "Filter options"}
      </button>
      {isVisible && (
        <div className="mt-5">
          <hr />
          {categoriesArray?.length === 0 && (
            <>
              <h3>Can't filter the unexistent! Save some resources first.</h3>
            </>
          )}
          {categoriesArray?.length > 0 && (
            <>
              <h2 className="p-2 text-left mx-2">Choose Categories </h2>
              <ul className="flex flex-wrap w-full gap-5 md:grid-cols-9 mx-3">
                {categoriesArray?.map((category) => {
                  return (
                    <CategoryCheckbox
                      category={category}
                      catLength={groupedDocs?.[category]?.length}
                      filterObject={filterObject}
                      setFilterObject={setFilterObject}
                      key={Math.random()}
                    />
                  );
                })}
              </ul>
              {keywordsArray?.length > 0 && (
                <div className="keywords-filters">
                  <div className="flex flex-row mt-2">
                    <h2 className="p-2 text-left mx-2">Choose Keywords </h2>
                    <div className="flex items-center m-2">
                      <span className="ml-1 text-sm font-medium text-gray-300 dark:text-gray-300">
                        OR
                      </span>
                      <label className="relative inline-flex items-center mr-5 ml-3 cursor-pointer">
                        <input
                          type="checkbox"
                          value=""
                          className="sr-only peer"
                          onChange={(e) => setToggleAND(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-500 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-300 dark:text-gray-300">
                          AND
                        </span>
                      </label>
                    </div>
                  </div>
                  <ul className="flex flex-wrap w-full gap-5 md:grid-cols-9 mx-3">
                    {keywordsArray?.map((keyword) => {
                      return (
                        <KeywordCheckbox
                          keyword={keyword}
                          filterObject={filterObject}
                          setFilterObject={setFilterObject}
                          key={Math.random()}
                          keyLength={objOfKeywords?.[keyword]}
                        />
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* <div className="grid w-full gap-5 md:grid-cols-8 mx-3 my-5"> */}
              <div className="flex flex-wrap items-center mx-3 my-3">
                <label className="relative inline-flex items-center mr-5 ml-3 cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    onChange={(e) => setToggleFavourites(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-300 dark:text-gray-300">
                    Only favourites
                  </span>
                </label>
                <button
                  onClick={onClickRenderizeFilters}
                  className="mr-3 bg-blue-600 text-white hover:bg-blue-700 dark:text-white dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Apply Filters
                </button>
                <button onClick={handleCleanFilters}> Clear </button>
                <div className="m-2 ml-3 flex items-center">
                  <span>Sort by relevance</span>
                  <button
                    className="px-1 ml-3 mr-1"
                    id="ASC"
                    onClick={handleSortByOrder}
                  >
                    <svg
                      width="24"
                      height="24"
                      id="ASC"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className="px-1"
                    id="DESC"
                    onClick={handleSortByOrder}
                  >
                    <svg
                      width="24"
                      id="DESC"
                      height="24"
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-width="1.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
