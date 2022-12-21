const getItemTemplate = ({ isDone, text }) => 
  `  <li class="item">
      <div>
        <input type="checkbox" ${isDone ? 'checked' : ''} />
        <span>${text}</span>
      </div>
      <button type="button">x</button>
    </li>`; 

    const refs = {
        list: document.querySelector('.list'),
    }

const render = () => {
const lis = items.map((item) => getItemTemplate(item));

refs.list.innerHTML = '';
refs.list.insertAdjacentHTML('beforeend', lis.join(''));

}

const items = [
    {
      text: 'to buy bread',
      isDone: false,  
    },
    {
        text: 'to buy milk',
        isDone: true,  
      },
      {
        text: 'to top up phone',
        isDone: false,  
      }
]

render();



