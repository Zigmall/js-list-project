const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formButton = itemForm.querySelector('button');
let isEditMode = false;

const onAddItemSubmit = (e) => {
  e.preventDefault();

  const text = itemInput.value;
  if (text === '') {
    alert('Please add an item');
    return;
  }
  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');
    console.log(itemToEdit.textContent);
    removeItemFromLocalStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  }

  addItemToDOM(text);
  addItemToLocalStorage(text);

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

const createButton = (classes) => {
  const btn = document.createElement('button');
  btn.classList = classes;
  const icon = document.createElement('icon');
  icon.classList = 'fa-solid fa-xmark';
  btn.appendChild(icon);
  return btn;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const setItemToEdit = (item) => {
  isEditMode = true;
  itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
  item.classList.add('edit-mode');
  formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';

  const text = item.textContent;
  formButton.style.backgroundColor = '#228B22';
  itemInput.value = text;
};

const removeItem = (item) => {
  if (confirm('Are you sure?')) {
    item.remove();
  }

  removeItemFromLocalStorage(item.textContent);
  checkUI();
};

const removeAll = () => {
  if (confirm('Do you wont to delete all items?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    localStorage.clear();
  }
  checkUI();
};

const checkUI = () => {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  if (items.length < 1) {
    clearButton.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  formButton.innerHTML = '<i class="fa-solid fa-plus"></i>Add Item';
  formButton.style.backgroundColor = '#333';
  isEditMode = false;
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

const addItemToLocalStorage = (item) => {
  let itemsFromLocalStorage = getItemsFromLocalStorage();

  itemsFromLocalStorage.push(item);
  localStorage.setItem('items', JSON.stringify(itemsFromLocalStorage));
};

const getItemsFromLocalStorage = () => {
  let itemsFromLocalStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromLocalStorage = [];
  } else {
    itemsFromLocalStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromLocalStorage;
};

const updateItemsFromLocalStorage = () => {
  const items = getItemsFromLocalStorage();
  if (items.length !== 0) {
    items.forEach((item) => addItemToDOM(item));
  }
  checkUI();
};

const removeItemFromLocalStorage = (item) => {
  const itemsFromLocalStorage = getItemsFromLocalStorage();
  const newList = itemsFromLocalStorage.filter((element) => element !== item);
  localStorage.clear();
  localStorage.setItem('items', JSON.stringify(newList));
};

// Initialize app
const init = () => {
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', removeAll);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', updateItemsFromLocalStorage);
  checkUI();
};

init();
