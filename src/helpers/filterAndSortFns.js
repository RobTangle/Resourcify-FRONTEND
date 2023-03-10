export function filterResources(
  resources,
  filter,
  toggleAND,
  toggleFavourites
) {
  return resources.filter((resource) => {
    let isValid = true;
    // Check if resource's category is included in the filter's categories
    if (filter.categories && filter.categories.length > 0) {
      isValid = filter.categories.some(
        (category) => resource.category === category
      );
    }
    // Check if resource's keywords include all keywords in the filter
    if (isValid && filter.keywords && filter.keywords.length > 0) {
      if (toggleAND === true) {
        isValid = filter.keywords.every((keyword) =>
          resource.keywords.includes(keyword)
        );
      } else {
        isValid = filter.keywords.some((keyword) =>
          resource.keywords.includes(keyword)
        );
      }
    }
    if (isValid && toggleFavourites === true) {
      isValid = resource.is_favourite;
    }
    return isValid;
  });
}

export function searchObjects(searchInput, objects) {
  const lowerCaseSearchInput = searchInput.toLowerCase();
  return objects.filter(
    (obj) =>
      obj.title.toLowerCase().includes(lowerCaseSearchInput) ||
      obj.category.toLowerCase().includes(lowerCaseSearchInput) ||
      obj.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerCaseSearchInput)
      ) ||
      obj.description.toLowerCase().includes(lowerCaseSearchInput)
  );
}

export function sortArrayByOrderKey(value, array) {
  const sortedArray = [...array];
  if (value === "ASC") {
    sortedArray.sort((a, b) => (a.order > b.order ? 1 : -1));
  } else if (value === "DESC") {
    sortedArray.sort((a, b) => (a.order < b.order ? 1 : -1));
  }
  return sortedArray;
}
