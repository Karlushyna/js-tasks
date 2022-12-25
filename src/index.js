import { getItemTemplate } from './getItemTemplate.js';
import { items as importedItems } from './items.js';


const modal = basicLightbox.create(`
    <div class="modal">
        <p class="modal-text">
        </p>
        <img class="modal-image" src="" />
        <button>Close</button>
    </div>
`)
let items = importedItems;

const refs = {
    list: document.querySelector('.list'),
    form: document.querySelector('.form'),
    modalText: modal.element().querySelector('.modal-text'),
    modalImage: modal.element().querySelector('.modal-image'),

    modalButton:modal.element().querySelector('button'),
}

const render = () => {
const lis = items.map(getItemTemplate);

refs.list.innerHTML = '';
refs.list.insertAdjacentHTML('beforeend', lis.join(''));

}

const addItem = (text) => {
    const payload = {
        id: uuid.v4(),
        text,
        isDone: false,
        created: new Date(),
    }
    items.push(payload);

}


const handleSubmit = (e) => {
    // const value = e.target.elements.text.value;

const { value } = e.target.elements.text;

// const {
//     elements: {
//      text: {value},
//     }} = e.target;

e.preventDefault();
addItem(value);
render();
refs.form.reset();
}

const toggleItem = (id) => {
items = items.map(item => item.id === id ? {
    ...item,
    isDone: !item.isDone
} : item)

    console.log('toggle', id);
    console.table(items);
}
const viewItem = (id) => {
const { created } = items.find(item => item.id === id)

    refs.modalText.textContent = created;
    // refs.modalImage.src = ""; //--for homework
    modal.show();
    console.log('view', id);
}
const deleteItem = (id) => {
    items = items.filter((item) => item.id !== id);
    render();

    // console.log('delete', id);
}

const handleListClick = (e) => {

    if (e.target === e.currentTarget) return;

    // console.log(e.target.dataset);

const { action } = e.target.dataset;
const parent = e.target.closest('li');
const { id } = parent.dataset;

switch (action) {
    case "toggle":
        toggleItem(id);
        break;
    case "view":
        viewItem(id);
        break;
    case "delete":
        deleteItem(id);
        break;
}


}

//run
render();

//add event listeners
refs.form.addEventListener('submit', handleSubmit);
refs.list.addEventListener('click', handleListClick);

refs.modalButton.addEventListener('click', modal.close);





// const body = document.querySelector('body');
// const link = document.createElement('a');
// link.href = 'https://google.com';
// link.textContent = 'Google';
// link.classList.add('link');
// link.setAttribute('attribute', 'true'); //-- to add any attribute 
// link.id = '123';
// link.type = 'qwerty';


// body.appendChild(link);
// console.log(link.outerHTML);