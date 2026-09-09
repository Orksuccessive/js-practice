const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

let currentFilter = "all";



function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}



function renderTodos() {

    todoList.innerHTML = "";

    const filteredTodos = todos.filter(todo => {

        if (currentFilter === "active") {
            return !todo.completed;
        }

        if (currentFilter === "completed") {
            return todo.completed;
        }

        return true;
    });

    filteredTodos.forEach(todo => {

        const li = document.createElement("li");

        li.className = "todo-item";

        li.dataset.id = todo.id;

        li.innerHTML = `
            <div class="todo-left">
                <input
                    type="checkbox"
                    class="complete-checkbox"
                    ${todo.completed ? "checked" : ""}
                >

                <span class="todo-text ${todo.completed ? "completed" : ""}">
                    ${todo.text}
                </span>
            </div>

            <button class="delete-btn">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });
}



todoForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const text = todoInput.value.trim();

    if (!text) {
        return;
    }

    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);

    saveTodos();

    renderTodos();

    todoInput.value = "";

    todoInput.focus();
});


todoList.addEventListener("click", function (event) {

    const todoItem = event.target.closest(".todo-item");

    if (!todoItem) {
        return;
    }

    const todoId = Number(todoItem.dataset.id);

 
    if (event.target.classList.contains("delete-btn")) {

        todos = todos.filter(todo => todo.id !== todoId);

        saveTodos();

        renderTodos();
    }
});



todoList.addEventListener("change", function (event) {

    if (!event.target.classList.contains("complete-checkbox")) {
        return;
    }

    const todoItem = event.target.closest(".todo-item");

    const todoId = Number(todoItem.dataset.id);

    const todo = todos.find(todo => todo.id === todoId);

    if (todo) {
        todo.completed = event.target.checked;
    }

    saveTodos();

    renderTodos();
});



filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        currentFilter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        renderTodos();
    });
});



renderTodos();