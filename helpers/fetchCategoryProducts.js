async function fetchCategoryProducts (categoryId) {
  const fetchData = await 
    fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=`);
  const categoryProducts = await fetchData.json();
  return categoryProducts;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchCategoryProducts,
  };
}