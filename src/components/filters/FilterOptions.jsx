import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { filterElements, resetRenderized } from '../../redux/features/resource';
import { CategoryCheckbox } from '../filters/CategoryCheckbox';
import { KeywordsCheckbox } from './KeywordsCheckbox';
// import { getOrCreateUser } from "../../redux/features/user/userThunk";
// import { useAuth0 } from "@auth0/auth0-react";


export function FilterOptions({ isLoggedIn }) {

  const dispatch = useDispatch();
  const userProfileState = useSelector(
    (state) => state.user?.userProfile
  )
  console.log("userProfileState",userProfileState)
  const categoriesArray = userProfileState?.groupedDocs && Object.keys(userProfileState.groupedDocs)
  // console.log('categoriesArray', categoriesArray);

  // const allUserKeywords = for (let i=0; i<)
  // Object.values(userProfileState.resources.keywords)


  const [filterObject, setFilterObject] = useState({
    categories: [],
    keywords: []
  })
  console.log('filterObject', filterObject)



  // const { getAccessTokenSilently } = useAuth0();

  // function handleRefresh() {
  //   async function getUserProfileAgain() {
  //     const accessToken = await getAccessTokenSilently();
  //     dispatch(getOrCreateUser(accessToken));
  //     console.log("all resources fetched!");
  //   }
  //   getUserProfileAgain();
  // }

  function onClickRenderizeFilters(e) {
    dispatch(filterElements(filterObject, userProfileState.resources));
  }


  function handleCleanFilters(){
    dispatch(resetRenderized(userProfileState.resources))
    setFilterObject({
      categories: [],
      keywords: []
    })
  }



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
              <ul className="grid w-full gap-5 md:grid-cols-9 mx-3" >
              {categoriesArray?.map((category) => {
                  return <CategoryCheckbox category={category} filterObject={filterObject} setFilterObject={setFilterObject} key={Math.random()} />;
                })}
              </ul>
              <h2 className="p-2 text-left mx-2">Choose Keywords </h2>
              <ul className="grid w-full gap-5 md:grid-cols-9 mx-3" >
              {categoriesArray?.map((category) => {
                  return <KeywordsCheckbox category={category} filterObject={filterObject} setFilterObject={setFilterObject} key={Math.random()} />;
                })}
              </ul>
              <div  className="grid w-full gap-5 md:grid-cols-8 mx-3 my-5">
              <button className="bg-blue-200 text-gray-600 hover:bg-gray-200 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700" onClick={onClickRenderizeFilters}> Apply Filters </button>
              <button onClick={handleCleanFilters}> Clear </button>
              </div>
            </>
          )}
        </div>
      {/* )} */}
    </>
  );
}