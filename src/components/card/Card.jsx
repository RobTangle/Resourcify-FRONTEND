import { useDispatch, useSelector } from "react-redux";
import { ModalEditResource } from "../ModalEditResource/ModalEditResource";
import { deleteResource } from "../../redux/features/resource";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import "./card.style.css";

export function Card({ resource }) {
  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();
  const renderizedArray = useSelector((state) => state?.resource?.renderized);

  const [showFullDescription, setShowFullDescription] = useState(false);
  const description = resource?.description;
  let shortDescription = "";
  if (description.length <= 150) {
    shortDescription = description;
  } else {
    shortDescription = description?.slice(0, 150) + "...";
  }

  async function handleOnClickDelete() {
    const accessToken = await getAccessTokenSilently();
    dispatch(deleteResource(resource?._id, accessToken, renderizedArray));
  }

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 m-1 ">
      <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-0 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">
        {resource.category}
      </span>
      <span className="block mr-0">
        {resource.is_favourite ? <span>💗</span> : null}
      </span>

      {/* <svg
        className="w-10 h-10 mb-2 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z"
          clipRule="evenodd"
        ></path>
        <path d="M9 11H3v5a2 2 0 002 2h4v-7zM11 18h4a2 2 0 002-2v-5h-6v7z"></path>
      </svg> */}

      <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
        {resource.title}
      </h5>

      <div>
        <p
          id="description-p"
          className="mb-1 font-normal text-gray-500 dark:text-gray-400"
          style={{
            overflow: showFullDescription ? "visible" : "hidden",
            textOverflow: showFullDescription ? "clip" : "ellipsis",
            display: showFullDescription ? "block" : "-webkit-box",
            WebkitLineClamp: showFullDescription ? "none" : "3",
            WebkitBoxOrient: showFullDescription ? "none" : "vertical",
          }}
        >
          {showFullDescription === true
            ? resource?.description
            : shortDescription}
        </p>
        {description.length > 150 ? (
          <span
            className="text-gray-600 cursor-pointer"
            onClick={() => setShowFullDescription(!showFullDescription)}
          >
            {showFullDescription ? "Less" : "More"}
          </span>
        ) : null}
      </div>
      <div>
        <a
          href={resource?.link}
          target="_blank"
          className="inline-flex items-center text-blue-600 hover:underline custom-class"
        >
          {resource?.link}
          <svg
            className="mt-3 mb-3 w-5 h-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
          </svg>
        </a>
      </div>
      <div>
        {Array.isArray(resource.keywords) && resource.keywords?.length
          ? resource.keywords.map((keyword) => {
              if (keyword) {
                return (
                  <span
                    className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300"
                    key={Math.random()}
                  >
                    {keyword}
                  </span>
                );
              }
            })
          : null}
      </div>
      <div className="flex justify-center px-0 mt-2">
        <span className="inline-flex divide-x overflow-hidden rounded-md border bg-white shadow-sm dark:divide-grey-900 dark:border-gray-800 dark:bg-gray-800">
          <ModalEditResource resource={resource} />

          <button
            className="inline-block p-1 h-6 w-6 text-gray-700 hover:bg-gray-50 focus:relative dark:text-gray-200 dark:hover:bg-gray-800 ml-0.5"
            title="Delete Product"
            onClick={handleOnClickDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>
        </span>

        {/* <button
          id="dropdownButton"
          data-dropdown-toggle="dropdown1"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
          </svg>
        </button> */}
        {/* <!-- Dropdown menu --> */}
        <div
          id="dropdown1"
          className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700"
        >
          <ul className="py-1" aria-labelledby="dropdownButton">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Edit
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Export Data
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                Delete
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
