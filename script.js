const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');

const TODOS_KEY = 'simple-todo-items';

let todos = JSON.parse(localStorage.getItem(TODOS_KEY) || '[]');

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';

  if (todos.length === 0) {
    const emptyItem = document.createElement('li');
    emptyItem.className = 'empty-state';
    emptyItem.textContent = 'No tasks yet. Add one to start your list!';
    todoList.appendChild(emptyItem);
    return;
  }

  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    item.className = `todo-item${todo.completed ? ' completed' : ''}`;

    const text = document.createElement('p');
    text.className = 'todo-text';
    text.textContent = todo.text;
    item.appendChild(text);

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-button';
    completeButton.textContent = todo.completed ? 'Undo' : 'Done';
    completeButton.addEventListener('click', () => {
      todos[index].completed = !todos[index].completed;
      saveTodos();
      renderTodos();
    });

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    actions.appendChild(completeButton);
    actions.appendChild(deleteButton);
    item.appendChild(actions);
    todoList.appendChild(item);
  });
}

function addTodo() {
  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ text, completed: false });
  saveTodos();
  renderTodos();
  todoInput.value = '';
  todoInput.focus();
}

addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTodo();
  }
});

renderTodos();
