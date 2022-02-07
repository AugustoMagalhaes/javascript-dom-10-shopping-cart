const saveCartItems = (item) => {
  // seu código aqui  
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
