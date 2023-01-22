export function KeywordCheckbox({
  keyword,
  filterObject,
  setFilterObject,
  keyLength,
}) {
  let updatedKeywords = [...filterObject.keywords];

  function handleChange(event) {
    const { value } = event.target;

    setFilterObject((filterObject) => {
      updatedKeywords = [...filterObject.keywords];
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
      <li className="relative">
        <input
          type="checkbox"
          id={`${keyword}-kw`}
          value={keyword}
          required=""
          className="hidden peer"
          onChange={handleChange}
        />
        <label
          htmlFor={`${keyword}-kw`}
          className={`${
            updatedKeywords.includes(keyword)
              ? " inline-flex justify-between  p-2 text-gray-100 bg-blue-700 hover:bg-blue-800 border border-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer dark:hover:text-gray-300 dark:border-gray-700"
              : "inline-flex justify-between  p-2 peer-checked:border-blue-600 font-medium text-sm px-3 py-2.5 hover:text-gray-200 dark:peer-checked:text-gray-300 border border-blue-900 rounded-lg peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
        >
          <div className="block">
            <div className="w-full font-medium text-center">{keyword}</div>
          </div>
        </label>
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-gray-900 bg-yellow-600 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
          {keyLength}
        </div>
      </li>
    </>
  );
}
