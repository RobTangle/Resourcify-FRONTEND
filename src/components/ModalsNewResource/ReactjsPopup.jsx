import React from "react";
import Popup from "reactjs-popup";
// import "reactjs-popup/dist/index.css";
import "./reactjsPopup.style.css";
import { FormFlowBite } from "../FormsNewResource/FormFlowBite";

export function ReactjsPopup() {
  return (
    <Popup
      trigger={
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {" "}
          Create Resource
        </button>
      }
      modal
    >
      {/* <div>Save a new resource</div> */}
      {/* <NewResourceForm /> */}
      <FormFlowBite />
    </Popup>
  );
}
