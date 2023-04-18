const form = document.querySelector("form");
const listWrapper = document.querySelector("ul#todo-list-wrapper");

/* <li class="list-group-item">
  <div class="d-flex gap-5 user-select-none">
    <p>Todo Text</p>
    <a role="button">
      <i class="bi bi-trash3 text-danger"></i>
    </a>
  </div>
</li>; */

// Tampilkan todo jika ada di localStorage
let todoList = localStorage.getItem("todo")
  ? JSON.parse(localStorage.todo)
  : [];

refreshTodoUi();

//  Lakukan aksi jika form todo di submit
form.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  if (!formData.get("todo-text")) return;

  const newTodo = generateNewTodo({
    todoText: formData.get("todo-text"),
    todoReminder: formData.get("reminder"),
  });

  todoList = [newTodo, ...todoList];
  localStorage.setItem("todo", JSON.stringify(todoList));
  refreshTodoUi();

  form.reset();
};

// Buat object berisi todo dll
function generateNewTodo({ todoText, todoReminder }) {
  return {
    id: Math.random() * 10e6,
    text: todoText,
    reminder: todoReminder,
    createdAt: new Date(),
  };
}

// Buat string element todo list
function generateTodoElement(todo) {
  return `
    <li class="list-group-item" data-todo-id="${todo.id}">
        <div class="d-flex gap-5 user-select-none">
            <p>${todo.text}</p>
            <span>${new Date(todo.createdAt).toLocaleTimeString()}</span>
            <a role="button" onclick="deleteTodo(${todo.id})">
                <i class="bi bi-trash3 text-danger"></i>
            </a>
        </div>
    </li>
    `;
}

// Refresh list todo nya
function refreshTodoUi() {
  listWrapper.innerHTML = "";
  todoList.forEach((todo) => {
    listWrapper.innerHTML += generateTodoElement(todo);
  });
}

// Delete todo dari todo list
function deleteTodo(id) {
  todoList = todoList.filter((todo) => todo.id !== id);
  localStorage.setItem("todo", JSON.stringify(todoList));
  refreshTodoUi();
}
