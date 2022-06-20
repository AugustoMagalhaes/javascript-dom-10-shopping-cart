const firstSectionItem = document.querySelectorAll('.items')[0];
const cartItems = document.querySelectorAll('.cart__items')[0];
const emptyBtn = document.querySelector('.empty-cart');
const totalPrice = document.querySelector('.total-price');
const loaderContainer = document.getElementById('loader-container');
const loaderElement = document.getElementsByClassName('loader-wrapper')[0];

console.log('all', createCategoriesOptions())

const stringifyContent = () => {
  const cartItemsContent = cartItems.innerHTML;
  const stringifiedCartItems = JSON.stringify(cartItemsContent);
  saveCartItems(stringifiedCartItems);
};

const loadMaker = () => {
  const testParagraph = document.getElementsByClassName('loading')[0];
  if (!testParagraph) {
    const createdParagraph = document.createElement('p');
    createdParagraph.className = 'loading';
    createdParagraph.innerText = 'Carregando...';
    loaderContainer.appendChild(createdParagraph);
    loaderElement.style.display = 'inline-block';
  }
};

const loadDestroyer = () => {
  const destroyingParagraph = document.getElementsByClassName('loading')[0];
  if (destroyingParagraph) {
    loaderElement.style.display = 'none';
    loaderContainer.removeChild(destroyingParagraph);
  }
};

function cartItemClickListener(event) {
  const cartElement = event.target;
  const cartElementPrice = cartElement.parentNode.innerText.split('PRICE: $')[1].trim();
  const finalPrice = parseFloat(totalPrice.innerText - cartElementPrice);
  totalPrice.innerText = (finalPrice > 0.5) ? finalPrice.toFixed(2) : '0.00';
  cartItems.removeChild(cartElement.parentNode);
  stringifyContent();
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

function createCartItemElement({ sku, name, salePrice, thumbnail }) {
  const section = document.createElement('section');
  const li = document.createElement('li');
  const img = document.createElement('img');
  img.src = thumbnail;
  img.className = 'cart__item-img'
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  section.appendChild(img);
  section.appendChild(li)
  return section;
}

const sumSubTotal = async (obj) => {
  const checkObj = await fetchItem(obj.id);
  const floatPrice = parseFloat(totalPrice.innerText);
  const newItemPrice = parseFloat(checkObj.price);
  const newText = (floatPrice + newItemPrice).toFixed(2);
  totalPrice.innerText = newText;
  stringifyContent();
  return totalPrice;
};

const prepareToAppend = async (itemId) => {
  loadMaker();
  const getItem = await fetchItem(itemId);
  loadDestroyer();
  const cardObj = {
    sku: getItem.id,
    name: getItem.title,
    salePrice: getItem.price,
    thumbnail: getItem.thumbnail,
  };
  const cardItem = createCartItemElement(cardObj);
  cardItem.classList.add('chosenItem');
  const closeBtn = document.createElement('div');
  closeBtn.classList.add('cartItemDiv');
  closeBtn.addEventListener('click', cartItemClickListener);
  cartItems.appendChild(cardItem);
  cardItem.appendChild(closeBtn);
  sumSubTotal(getItem);
};

const appendCart = async (event) => {
  const cardBtn = event.target;
  const cardId = getSkuFromProductItem(cardBtn.parentNode);
  prepareToAppend(cardId);
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

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  const displayPrice = `R$ ${price.toFixed(2)}`

  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'item__price', displayPrice))
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

const emptyCart = () => {
  const allCartItems = [...cartItems.childNodes];
  allCartItems.forEach((element) => cartItems.removeChild(element));
  totalPrice.innerText = '0.00';
  localStorage.clear();
};

emptyBtn.addEventListener('click', emptyCart);

const appendProduct = async (query, parentNode) => {
  loadMaker();
  const data = await fetchProducts(query);
  const productsList = data.results;
  productsList.forEach((product) => {
    const productObj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
      price: product.price,
    };
    const item = createProductItemElement(productObj);
    parentNode.appendChild(item);
  });
  setTimeout(() => {
    loadDestroyer();
  }, 700); // somente por critério estético
};

const appendSavedItems = async () => {
  const cartItemsValue = getSavedCartItems();
  const parsedCartItems = JSON.parse(cartItemsValue);
  const splitedParsedCartItems = parsedCartItems.split(' ');
  const savedIds = splitedParsedCartItems.filter((element) => element.startsWith('ML'));
  savedIds.forEach((element) => {
    prepareToAppend(element);
  });
};

window.onload = () => {
  appendProduct('computador', firstSectionItem);
  if (localStorage.length > 0) {
    appendSavedItems();
  }
  createCategoriesOptions();
};

if (typeof module !== 'undefined') {
  module.exports = {
    appendProduct,
    prepareToAppend,
  };
}
