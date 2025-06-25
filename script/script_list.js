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

contability_button.addEventListener('click', () => {
    window.location.replace("contability.html");
});

async function renderTable() {
    list_button.style.backgroundColor = '#DFDBCE';
}

renderTable();