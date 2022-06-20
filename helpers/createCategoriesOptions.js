const createCategoriesOptions = async () =>  {
  const allCategories = await fetchCategories();
  let categoriesSelect = document.getElementById('search-items');
  allCategories.forEach((option) => {
    const categoryOption = document.createElement('option');
    categoryOption.value = option.name;
    categoryOption.innerText = option.name;
    if (option.name.startsWith('Co')) {
      const computador = document.createElement('option');
      computador.value = 'Computador';
      computador.innerText = 'Computador';
      categoriesSelect.appendChild(computador);
    }
    categoriesSelect.appendChild(categoryOption);
  });
  const initialCategory = localStorage.getItem('initialCategory') || 'Computador';
  categoriesSelect.value = initialCategory;
  const actualIndex = findInitialCategoryIndex(initialCategory);
  selectCategories.selectedIndex = actualIndex;
};
