const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const text = itemInput.value;
  if (text === '') {
    alert('Please add an item');
    return;
  }
  addItemToDOM(text);
  addItemToLocalStorage(text)

  itemInput.value = '';
  checkUI();
};

const addItemToDOM = (text) => {
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(text));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
};

const addItemToLocalStorage = (item) => {
  let itemsFromLocalStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
  }

  itemsFromLocalStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
};

const createButton = (classes) => {
  const btn = document.createElement('button');
  btn.classList = classes;
  const icon = document.createElement('icon');
  icon.classList = 'fa-solid fa-xmark';
  btn.appendChild(icon);
  return btn;
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
};

const removeAll = () => {
  if (confirm('Do you wont to delete all items?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
  checkUI();
};

const checkUI = () => {
  const items = itemList.querySelectorAll('li');
  if (items.length < 1) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }
};

const filterItems = (e) => {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

//Event Listener
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAll);
itemFilter.addEventListener('input', filterItems);
checkUI();
// localStorage.clear();
