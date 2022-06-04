const container = document.querySelector('.container');
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('#inputTodo');
const todoAddButton = document.querySelector('#addTodoButton');
const todoLists = document.querySelector('#lists');
const messageElement = document.querySelector('#message');


const showMessage = (text, status) => {
    messageElement.textContent = text;
    messageElement.classList.add(`bg-${status}`);
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.classList.remove(`bg-${status}`);
    }, 1000);

}



const createTodo = (todoId, todoValue) => {
    const todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add('list-style');
    todoElement.innerHTML = `
    
    <span>${todoValue}</span>
    <span><button class="btn" id="deleteButton"><i class="fa fa-trash"> </i></button></span>
    
    `;
    todoLists.appendChild(todoElement);
    const deleteButton = todoElement.querySelector('#deleteButton');
    deleteButton.addEventListener('click', deleteTodo);
};


const deleteTodo = (event) => {
    const selectedTodo = event.target.parentElement.parentElement.parentElement;
    todoLists.removeChild(selectedTodo);
    showMessage('Todo is deleted', 'danger');
    let todos = getTodosFromLocalStorage();
    todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
    localStorage.setItem('mytodos', JSON.stringify(todos));

}




const getTodosFromLocalStorage = () => {
    return localStorage.getItem('mytodos') ? JSON.parse(localStorage.getItem('mytodos')) : [];

}


const addTodo = (event) => {
    event.preventDefault();
    const todoValue = todoInput.value;
    // generate unique id
    const todoId = Date.now().toString();
    createTodo(todoId, todoValue);
    showMessage('Todo is Created', 'success');
    const todos = getTodosFromLocalStorage();
    todos.push({ todoId, todoValue });
    localStorage.setItem('mytodos', JSON.stringify(todos));


    event.target.reset();
};


const loadTodos = () => {
    const todos = getTodosFromLocalStorage();
    todos.map((todo) => createTodo(todo.todoId, todo.todoValue));
}


todoForm.addEventListener('submit', addTodo);
window.addEventListener('DOMContentLoaded', loadTodos);