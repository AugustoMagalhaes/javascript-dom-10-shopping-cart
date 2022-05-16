const createCategoriesOptions = async () =>  {
  const allCategories = await fetchCategories();
  const categoriesSelect = document.getElementById('search-items');
  allCategories.forEach((option) => {
    const categoryOption = document.createElement('option');
    categoryOption.value = option.id;
    categoryOption.innerText = option.name;
    categoriesSelect.appendChild(categoryOption);
  })
}