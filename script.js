const firstSectionItem = document.querySelectorAll('.items')[0];
const cartItems = document.querySelectorAll('.cart__items')[0];
const emptyBtn = document.querySelector('.empty-cart');
const subtotal = document.getElementById('subtotal');

function cartItemClickListener(event) {
  // coloque seu código aqui
  const element = event.target;
  const fullCartItem = element.parentNode;
  cartItems.removeChild(element);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img; 
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;  
  return li;
}

const sumSubTotal = (newElement) => {
  const floatSubtotal = parseFloat(subtotal.innerText);
  const floatNewElement = parseFloat(newElement);  
  return (floatSubtotal + floatNewElement).toFixed(2);
};

const appendCart = async (event) => {
  const card = event.target;
  const cardId = getSkuFromProductItem(card.parentNode);
  const getItem = await fetchItem(cardId);
  const cardObj = {
    sku: getItem.id,
    name: getItem.title,
    salePrice: getItem.price,
  };  
  const cardItem = createCartItemElement(cardObj);
  cardItem.classList.add('chosenItem');
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('cartItemDiv');
  closeBtn.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(cardItem);
  cardItem.appendChild(closeBtn);  
  subtotal.innerText = sumSubTotal(cardObj.salePrice);
};

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (className === 'item__add') {
    e.addEventListener('click', appendCart);
  }
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const emptyCart = () => {
  const allCartItems = [...cartItems.children];
  allCartItems.forEach((element) => cartItems.removeChild(element));
  // Esta dica o Anderson Rodrigues quem deu no slack, OBRIGADO! :)
};

emptyBtn.addEventListener('click', emptyCart);

const appendProduct = async (query, parentNode) => {
  const data = await fetchProducts(query);
  const productsList = data.results;
  productsList.forEach((product) => {
    const productObj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };  
    const item = createProductItemElement(productObj);    
    parentNode.appendChild(item);
  });
};

window.onload = () => { 
  appendProduct('computador', firstSectionItem); 
};

if (typeof module !== 'undefined') {
  module.exports = {
    appendProduct,
  };
}
