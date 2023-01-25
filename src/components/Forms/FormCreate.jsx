import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { createResource } from "../../redux/features/resource";
import { URL_S_G_PARSE_LINK } from "../../helpers/URLs";
import { header } from "../../helpers/constants";
import axios from "axios";

export function FormCreate() {
  const [form, setForm] = useState({
    title: "",
    link: "",
    category: "",
    description: "",
    order: 0,
    is_favourite: false,
    keywords: "",
  });

  const filterState = useSelector((state) => state.resource?.filter);

  const dispatch = useDispatch();
  const { getAccessTokenSilently } = useAuth0();

  function handleIsFavourite(e) {
    setForm({ ...form, is_favourite: e.target.checked });
  }

  function handleOnChange(e) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  // Esta función hace un Get al servidor para obtener el title de la url, y valoriza el form.title según la respuesta del Get:
  async function handleOnChangeLink(e) {
    setForm({ ...form, link: e.target.value });
    const accessToken = await getAccessTokenSilently();
    const response = await axios.get(
      URL_S_G_PARSE_LINK + e.target.value,
      header(accessToken)
    );
    // const html = await response.text();
    const html = response.data.html;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const title = doc.querySelector("title").innerText;
    setForm({ ...form, title, link: e.target.value });
  }

  async function handleOnSubmit(e) {
    e.preventDefault();
    const accessToken = await getAccessTokenSilently();
    const formParsed = {
      ...form,
      keywords: form.keywords.toLowerCase().split(" "),
    };
    dispatch(createResource(formParsed, setForm, accessToken, filterState));
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <div className="mb-4">
        <label
          htmlFor="link"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Link
        </label>
        <input
          type="text"
          id="link"
          placeholder="https://somewebpage.com/info"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChangeLink}
          value={form.link}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Title
        </label>
        <input
          type="title"
          id="title"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          value={form.title}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="category"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          value={form.category}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Description
        </label>
        <textarea
          type="text"
          id="description"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          value={form.description}
        ></textarea>
      </div>
      <div className="mb-6">
        <label
          htmlFor="order"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Relevance
        </label>
        <input
          type="number"
          min={0}
          max={99}
          id="order"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          value={form.order}
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="keywords"
          className="block mb-0 text-sm font-medium text-gray-900 dark:text-black"
        >
          Keywords
        </label>
        <input
          type="text"
          id="keywords"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          onChange={handleOnChange}
          value={form.keywords}
        />
      </div>
      <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            checked={form.is_favourite}
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            onChange={handleIsFavourite}
          />
        </div>
        <label
          htmlFor="terms"
          className="ml-2 text-sm font-medium text-gray-900 dark:text-black"
        >
          Is Favourite
        </label>
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Save
      </button>
    </form>
  );
}
