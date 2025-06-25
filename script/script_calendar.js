const calendar_button = document.getElementById('calendar_button');
const tasks_button = document.getElementById('tasks_button');

tasks_button.addEventListener('click', () => {
    window.location.replace("tasks.html");
});

async function renderTable() {
    calendar_button.style.backgroundColor = '#DFDBCE';
}

renderTable();