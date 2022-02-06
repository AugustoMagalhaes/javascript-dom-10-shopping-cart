const getSavedCartItems = (locStorageKey) => {
  // seu código aqui
  const cartItemsValue = localStorage.getItem(locStorageKey);  
  const parsedCartItems = JSON.parse(cartItemsValue);  
  const splitedParsedCartItems = parsedCartItems.split(' ');
  const savedIds = splitedParsedCartItems.filter((element) => element.startsWith('ML'));
  return savedIds;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
