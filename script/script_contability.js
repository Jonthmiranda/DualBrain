const calendar_button = document.getElementById('calendar_button');
const tasks_button = document.getElementById('tasks_button');
const list_button = document.getElementById('list_button');
const contability_button = document.getElementById('contability_button');

calendar_button.addEventListener('click', () => {
    window.location.replace("index.html");
});

tasks_button.addEventListener('click', () => {
    window.location.replace("tasks.html");
});

list_button.addEventListener('click', () => {
    window.location.replace("list.html");
});

async function renderTable() {
    contability_button_button.style.backgroundColor = '#DFDBCE';
}

renderTable();