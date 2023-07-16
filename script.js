const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;
  //validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  itemList.appendChild(li);
  itemInput.value = '';
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
    e.target.parentElement.parentElement.remove();
  }
};

const removeAll = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
};

//Event Listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAll);
