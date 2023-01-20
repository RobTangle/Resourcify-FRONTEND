import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterResources } from '../../helpers/filterResources';


export function FilterOptions(){
  const dispatch = useDispatch();
  const userResourcesState = useSelector(
    (state) => state.user?.userProfile.resources
  )

  const getFiltersFromUserResources = filterResources()



  return (
    <>
    <h2 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">Choose Category:</h2>
    <ul className="grid w-full gap-6 md:grid-cols-3">
        <li>
            <input type="checkbox" id="react-option" value="" className="hidden peer" required=""/>
            <label htmlFor="react-option" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                <div className="block">
                    <div className="w-full text-lg font-semibold">React Js</div>
                </div>
            </label>
        </li>
    </ul>

  </>
  )
}