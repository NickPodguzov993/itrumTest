// Получаем ссылки на необходимые элементы
const taskInput = document.getElementById('taskInput');
const createButton = document.getElementById('createButton');
const taskList = document.getElementById('taskList');
const selectAllButton = document.getElementById('selectAllButton');
const deleteButton = document.getElementById('deleteButton');
const deletedTasksList = document.getElementById('deletedTasksList');
const restoreButton = document.getElementById('restoreButton');
const deletedTasksContainer = document.getElementById('deletedTasksContainer');

// Объявляем переменные для хранения задач и удаленных задач
let tasks = [];
let deletedTasks = [];

// Функция для создания задачи
function createTask() {
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            text: taskText,
            completed: false
        };

        tasks.push(task);

        renderTasks();
        taskInput.value = '';
    }
}

// Функция для отрисовки задач
function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(index));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', () => deleteTask(index));
        deleteButton.style.display = task.completed ? 'block' : 'none';

        taskItem.appendChild(taskText);
        taskItem.appendChild(document.createElement('br'));
        taskItem.appendChild(checkbox);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Функция для изменения состояния выполнения задачи
function toggleTaskCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

// Функция для удаления задачи
function deleteTask(index) {
    const deletedTask = tasks.splice(index, 1)[0];
    deletedTasks.push(deletedTask);
    renderTasks();
    renderDeletedTasks();
}

// Функция для отрисовки удаленных задач
function renderDeletedTasks() {
    deletedTasksList.innerHTML = '';

    deletedTasks.forEach((task) => {
        const deletedTaskItem = document.createElement('li');
        deletedTaskItem.textContent = task.text;
        deletedTasksList.appendChild(deletedTaskItem);
    });

    if (deletedTasks.length > 0) {
        deletedTasksContainer.style.display = 'block';
    } else {
        deletedTasksContainer.style.display = 'none';
    }
}

// Функция для восстановления задачи из корзины
function restoreTask() {
    const restoredTask = deletedTasks.pop();
    tasks.push(restoredTask);
    renderTasks();
    renderDeletedTasks();
}

// Обработчик клика на кнопку "Создать"
createButton.addEventListener('click', createTask);

// Обработчик клика на кнопку "Выделить все задачи"
selectAllButton.addEventListener('click', () => {
    const checkboxes = document.querySelectorAll('#taskList input[type="checkbox"]');
    checkboxes.forEach((checkbox) => (checkbox.checked = true));
});

// Обработчик клика на кнопку "Корзина"
deleteButton.addEventListener('click', () => {
    deletedTasks = deletedTasks.concat(tasks.filter((task) => task.completed));
    tasks = tasks.filter((task) => !task.completed);
    renderTasks();
    renderDeletedTasks();
});

// Обработчик клика на кнопку "Вернуть задачу из корзины"
restoreButton.addEventListener('click', restoreTask);

// Инициализация при загрузке страницы
renderTasks();
renderDeletedTasks();