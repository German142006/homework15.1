// script.js
document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load tasks from localStorage
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];

    savedTodos.forEach(todo => {
        addTodoElement(todo);
    });

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskText = todoInput.value.trim();
        if (taskText) {
            const newTodo = { text: taskText, completed: false };
            savedTodos.push(newTodo);
            localStorage.setItem('todos', JSON.stringify(savedTodos));
            addTodoElement(newTodo);
            todoInput.value = '';
        }
    });

    function addTodoElement(todo) {
        const li = document.createElement('li');
        li.classList.toggle('completed', todo.completed);

        const span = document.createElement('span');
        span.textContent = todo.text;
        span.addEventListener('click', () => {
            todo.completed = !todo.completed;
            li.classList.toggle('completed');
            localStorage.setItem('todos', JSON.stringify(savedTodos));
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(li);
            const index = savedTodos.indexOf(todo);
            savedTodos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(savedTodos));
        });

        li.appendChild(span);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    }
});
