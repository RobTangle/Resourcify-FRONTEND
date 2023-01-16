export function filterResources(resources, filter) {
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
      isValid = filter.keywords.every((keyword) =>
        resource.keywords.includes(keyword)
      );
    }
    return isValid;
  });
}
