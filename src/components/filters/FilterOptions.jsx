import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { resetRenderized } from '../../redux/features/resource';
import { CategoryCheckbox } from '../filters/CategoryCheckbox';
// import { getOrCreateUser } from "../../redux/features/user/userThunk";
// import { useAuth0 } from "@auth0/auth0-react";


export function FilterOptions({ isLoggedIn }) {

  const dispatch = useDispatch();
  const userProfileState = useSelector(
    (state) => state.user?.userProfile
  )
  // console.log("userProfileState",userProfileState)
  const categoriesArray = userProfileState?.groupedDocs && Object.keys(userProfileState.groupedDocs)
  console.log('categoriesArray', categoriesArray);


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

  function handleCleanFilters(){
    dispatch(resetRenderized(userProfileState.resources))
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
              <h2 className="p-2">Choose Categories </h2>
              <br/>
              <button onClick={handleCleanFilters}>Clean Filters</button>
              <ul className="grid w-full gap-6 md:grid-cols-3">
              {categoriesArray?.map((category) => {
                  return <CategoryCheckbox category={category} filterObject={filterObject} setFilterObject={setFilterObject} key={Math.random()} />;
                })}
              </ul>
            </>
          )}
        </div>
      {/* )} */}
    </>
  );
}