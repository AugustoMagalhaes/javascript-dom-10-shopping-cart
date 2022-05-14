const fetchItem = async (query) => {
  const url = `https://api.mercadolibre.com/items/${query}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
