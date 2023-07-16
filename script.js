const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
// const items = itemList.querySelectorAll('li');

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
  checkUI();
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
  if (confirm('Are you sure?')) {
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

//Event Listener
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', removeAll);

checkUI();
