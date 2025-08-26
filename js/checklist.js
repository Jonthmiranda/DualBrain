//IMPORTS
import { SelectChecklist } from './db.js';
import { InsertChecklist } from './db.js';
import { UpdateChecklistCompleted } from './db.js';
import { UpdateChecklist } from './db.js';
import { DeleteChecklist } from './db.js';

export function ChecklistScreen(id) {
    document.querySelector("main").innerHTML = `
    <section>
        <ul class="ChecklistList">
            <li><input type="checkbox" id="item1"><label for="item1">Criar layout</label></li>
        </ul>
            
        <button id="cadChecklist"><img src="./assets/cad.png" alt="cadChecklist" class="buttonLogo"><span>Add Checklist</span></button>

        <div class="AddChecklistModal">
            <h4>Add Checklist</h4>
            <textarea type="text" id="Tasks" name="Tasks" placeholder="Type the task"></textarea>
            <button id="AddChecklistButton">Add Checklist</button>
            <button id="CancelButton">Cancel</button>
        </div>

        <div class="IsEmptyModal">
            <p>Field is empty</p>
            <button id="FillFieldButton">Ok</button>
        </div>

        <div class="ConfirmDeleteModal">
            <p>Are you sure you want to delete?</p>
            <button id="ConfirmDelete">Yes</button>
            <button id="CancelButton">Cancel</button>
        </div>

    </section>
    <nav>
        <button id="checklist"><img src="./assets/checklist.png" alt="Checklist"class="buttonLogo"><span>Checklist</span></button>
        <button id="notes"><img src="./assets/notes.png" alt="Notes" class="buttonLogo"><span>Notes</span></button>
        <button id="scrum"><img src="./assets/scrum.png" alt="Scrum" class="buttonLogo"><span>Scrum</span></button>
        <button id="menu"><img src="./assets/menu.png" alt="Menu" class="buttonLogo"></button>
        <div class="MenuContent">
            <button id="EndProject">Finalize</button>
            <button id="DeleteProject">Delete</button>
            <button id="ChangeProject">Change</button>
            <button id="Help">Help</button>
        </div>
    </nav>
`;

    RenderChecklist(id);

    //VARIABLES DIV CHECKLIST LIST
    var ChecklistList = document.querySelector(".ChecklistList");
    var cadChecklist = document.getElementById("cadChecklist");

    //VARIABLES ADD CHECKLIST MODAL
    var AddChecklistModal = document.querySelector(".AddChecklistModal");
    var Tasks = document.getElementById("Tasks");
    var AddChecklistButton = document.getElementById("AddChecklistButton");
    var CancelButton = document.getElementById("CancelButton");

    //VARIABLES IS EMPTY MODAL
    var IsEmptyModal = document.querySelector(".IsEmptyModal");
    var FillFieldButton = document.getElementById("FillFieldButton");

    //VARIABLES CONFIRM DELETE MODAL
    var ConfirmDeleteModal = document.querySelector(".ConfirmDeleteModal");
    var ConfirmDelete = document.getElementById("ConfirmDelete");
    var CancelButton = document.getElementById("CancelButton");

    //VARIAVEIS TAGS
    var nav = document.querySelector("nav");

    //VARIAVEIS NAV BUTTONS
    var checklist = document.getElementById("checklist");
    var notes = document.getElementById("notes");
    var scrum = document.getElementById("scrum");
    var menu = document.getElementById("menu");
    var EndProject = document.getElementById("EndProject");
    var DeleteProject = document.getElementById("DeleteProject");
    var ChangeProject = document.getElementById("ChangeProject");
    var Help = document.getElementById("Help");

    //VARIAVEIS NAV DIVS
    var MenuContent = document.querySelector(".MenuContent");

    //MUDANÇAS DE TELAS EVENTS
    checklist.addEventListener("click", function () {
        ChecklistScreen();
    })

    notes.addEventListener("click", function () {
        NoteScreen();
    })

    scrum.addEventListener("click", function () {
        ScrumScreen();
    })

    ChangeProject.addEventListener("click", function () {
        ProjectScreen();
    })

    //DIV MENU EVENT
    menu.addEventListener("click", function () {

        if (MenuContent.style.display === "none") {
            MenuContent.style.display = "block";
        } else {
            MenuContent.style.display = "none";
        }
    })

    async function RenderChecklist(id) {
        const checklist = await SelectChecklist(id);
        const container = document.querySelector(".ChecklistList");
        container.innerHTML = "";

        checklist.forEach(task => {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "item" + task.Id;

            const label = document.createElement("label");
            label.htmlFor = checkbox.id;
            label.textContent = task.Tasks;

            li.appendChild(checkbox);
            li.appendChild(label);

            container.appendChild(li);
        });
    }
}
