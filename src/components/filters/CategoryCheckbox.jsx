import { useDispatch } from "react-redux";

export function CategoryCheckbox({ category, filterObject, setFilterObject }) {
  const dispatch = useDispatch();
  let updatedCategories = [...filterObject.categories];

  function handleChange(event) {
    const { value } = event.target;

    setFilterObject((filterObject) => {
      console.log("set filter object en CATEGORY");
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
      <li>
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
              ? " inline-flex justify-between w-full p-2 text-gray-100 bg-blue-700 hover:bg-blue-800 border-2 border-gray-200 font-medium rounded-lg text-sm px-7 py-2.5 text-center cursor-pointer dark:hover:text-gray-300 dark:border-gray-700"
              : "inline-flex justify-between w-full p-2 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
          }`}
        >
          <div className="block">
            <div className="w-full font-medium text-center">{category}</div>
          </div>
        </label>
      </li>
    </>
  );
}
