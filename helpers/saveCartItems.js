const saveCartItems = (item) => {
  // seu código aqui
  const parentItem = item.parentNode;
  const stringifiedParentItem = JSON.stringify(parentItem.innerHTML);
  localStorage.setItem('cartItems', stringifiedParentItem);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
