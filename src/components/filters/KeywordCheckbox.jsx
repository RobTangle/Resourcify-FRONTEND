import { useDispatch, useSelector } from "react-redux";

export function KeywordCheckbox({ keyword, filterObject, setFilterObject }) {
  const dispatch = useDispatch();
  let updatedKeywords = [...filterObject.keywords];

  function handleChange(event) {
    const { value } = event.target;

    return setFilterObject((filterObject) => {
      let updatedKeywords = [...filterObject.keywords];
      if (!updatedKeywords.includes(value)) {
        updatedKeywords.push(value);
      } else {
        updatedKeywords = updatedKeywords?.filter((k) => k !== value);
      }
      return {
        ...filterObject,
        keywords: updatedKeywords,
      };
    });
  }

  return (
    <>
      <li>
        <input
          type="checkbox"
          id={keyword}
          value={keyword}
          required=""
          className="hidden peer"
          onChange={handleChange}
        />
        <label
          htmlFor={keyword}
          className={`${
            updatedKeywords.includes(keyword)
              ? " inline-flex justify-between w-full p-2 text-gray-100 bg-blue-700 hover:bg-blue-800 border-2 border-gray-200 font-medium rounded-lg text-sm px-7 py-2.5 text-center cursor-pointer dark:hover:text-gray-300 dark:border-gray-700"
              : "inline-flex justify-between w-full p-2 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
        >
          <div className="block">
            <div className="w-full font-medium text-center">{keyword}</div>
          </div>
        </label>
      </li>
    </>
  );
}
