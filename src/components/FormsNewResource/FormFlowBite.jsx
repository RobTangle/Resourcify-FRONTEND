import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { createResource } from "../../redux/features/resource";

export function FormFlowBite() {
  const [form, setForm] = useState({
    title: "",
    link: "",
    category: "",
    description: "",
    order: 0,
    is_favourite: false,
    keywords: "",
  });

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  function handleIsFavourite(e) {
    console.log("handleIsFavourite");
    console.log("e.target.checked = ", e.target.checked);
    setForm({ ...form, is_favourite: e.target.checked });
  }

  function handleOnChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    console.log("HANDLE ON SUBMIT FORM FLOW BITE");
    console.log("disatch form... get AT and then dispatch");
    const accessToken = await getAccessTokenSilently();
    const formParsed = {
      ...form,
      keywords: form.keywords.toLowerCase().split(" "),
    };
    dispatch(createResource(formParsed, setForm, accessToken));
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div class="mb-4">
        <label
          for="title"
          class="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Title
        </label>
        <input
          type="title"
          id="title"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          // placeholder="name@flowbite.com"
          onChange={handleOnChange}
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="link"
          class="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Link
        </label>
        <input
          type="text"
          id="link"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="category"
          class="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          required
        />
      </div>
      <div class="mb-4">
        <label
          for="description"
          class="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Description
        </label>
        <textarea
          type="text"
          id="description"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
        ></textarea>
      </div>
      <div class="mb-6">
        <label
          for="order"
          class="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Relevance
        </label>
        <input
          type="number"
          min={0}
          id="order"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
        />
      </div>
      <div class="mb-4">
        <label
          for="keywords"
          class="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Keywords
        </label>
        <input
          type="text"
          id="keywords"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
        />
      </div>
      <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            onClick={handleIsFavourite}
          />
        </div>
        <label
          for="terms"
          class="ml-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Is Favourite
        </label>
      </div>
      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save
      </button>
    </form>
  );
}
