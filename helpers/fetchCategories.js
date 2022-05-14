const fetchCategories = async() => {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await data.json();
  return categories;
}

if (typeof module !== 'undefined') {
  module.exports = {
    fetchCategories,
  };
}