export function CategoryCheckbox({
  category,
  filterObject,
  setFilterObject,
  catLength,
}) {
  let updatedCategories = [...filterObject.categories];

  function handleChange(event) {
    const { value } = event.target;

    setFilterObject((filterObject) => {
      updatedCategories = [...filterObject.categories];
      if (!updatedCategories.includes(value)) {
        updatedCategories.push(value);
      } else {
        updatedCategories = updatedCategories?.filter((c) => c !== value);
      }
      return {
        ...filterObject,
        categories: updatedCategories,
      };
    });
  }

  return (
    <>
      <li className="relative">
        <input
          type="checkbox"
          id={`${category}-cat`}
          value={category}
          required=""
          className="hidden peer"
          onChange={handleChange}
        />
        <label
          htmlFor={`${category}-cat`}
          className={`${
            updatedCategories.includes(category)
              ? " inline-flex justify-between  p-2 text-gray-100 bg-blue-700 hover:bg-blue-800 border border-gray-200 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer dark:hover:text-gray-300 dark:border-gray-700"
              : "inline-flex justify-between  p-2 peer-checked:border-blue-600 font-medium text-sm px-3 py-2.5 hover:text-gray-200 dark:peer-checked:text-gray-300 border border-blue-900 rounded-lg peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
        >
          <div className="block">
            <div className=" font-medium text-center">{category}</div>
          </div>
        </label>
        {/* <span className="absolute top-0 right-0"> {catLength}</span> */}
        <div className="absolute inline-flex items-center justify-center w-6 h-6 text-sm font-bold text-white bg-yellow-600 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
          {catLength}
        </div>
      </li>
    </>
  );
}
