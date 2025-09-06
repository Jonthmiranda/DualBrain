//IMPORTS DE JAVASCRIPT
import { SelectChecklist } from './db.js';
import { InsertChecklist } from './db.js';
import { UpdateChecklistCompleted } from './db.js';
import { UpdateChecklist } from './db.js';
import { DeleteChecklist } from './db.js';
import { DeleteProject } from './db.js';
import { ProjectScreen } from './project.js';
import { NoteScreen } from './note.js';
import { ScrumScreen } from './scrum.js';

//FUNÇÃO PRIMÁRIA, IMPRIME TELA DE CHECKLIST
export function ChecklistScreen(ProjectId) {
    document.querySelector("main").innerHTML = `
    <section>
        <ul class="ChecklistList">
            
        </ul>
        
        <div id="block"></div>
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
            <button id="DeleteProjectBt">Delete</button>
            <button id="ChangeProject">Change</button>
        </div>
    </nav>
`;
    //CHAMA A RENDERIZAÇÃO
    RenderChecklist(ProjectId);

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
    var DeleteProjectBt = document.getElementById("DeleteProjectBt");
    var ChangeProject = document.getElementById("ChangeProject");

    //VARIAVEIS NAV DIVS
    var MenuContent = document.querySelector(".MenuContent");

    //MUDANÇAS DE TELAS EVENTS
    //TELA DE ANOTAÇÕES
    notes.addEventListener("click", function () {
        nav.style.display = "none";
        checklist.style.backgroundColor = "#F4F4F4";
        NoteScreen(ProjectId);
    })

    //TELA DE SCRUM
    scrum.addEventListener("click", function () {
        nav.style.display = "none";
        checklist.style.backgroundColor = "#F4F4F4";
        ScrumScreen(ProjectId);
    })

    //TROCA DE PROJETO
    ChangeProject.addEventListener("click", function () {
        nav.style.display = "none";
        checklist.style.backgroundColor = "#F4F4F4";
        ProjectScreen();
    })

    //DELETE PROJETO
    DeleteProjectBt.addEventListener("click", function () {
        checklist.style.backgroundColor = "#F4F4F4";
        DeleteProject(ProjectId);
        ProjectScreen();
    })

    //MENU
    menu.addEventListener("click", function () {

        if (MenuContent.style.display === "none") {
            MenuContent.style.display = "block";
        } else {
            MenuContent.style.display = "none";
        }
    })

    //BOTÃO DE ADICIONAR CHECKLIST
    //ADD CHECKLIST
    cadChecklist.addEventListener("click", function () {
        AddChecklistModal.style.display = "flex";
    })

    //MODAL DE ADD CHECKLIST
    AddChecklistButton.addEventListener("click", function () {
        InsertChecklistTratament();
    })

    //BOTÃO DE CONFIRMAÇÃO CASO ESTIVER COM CAMPO DE CHECKLIST VAZIO E FOR CONFIRMADO
    FillFieldButton.addEventListener("click", function () {
        IsEmptyModal.style.display = "none";
    })

    //BOTÃO DE CANCELAR AO ADD CHECKLIST
    CancelButton.addEventListener("click", function () {
        Clear();
        AddChecklistModal.style.display = "none";
    })

    //VERIFICAÇÃO SE ESTIVER VAZIO O CAMPO DE CHECKLIST, E INSERÇÃO NO INSERTCHECKLIST NO ./DB.JS
    function InsertChecklistTratament() {
        let IsEmptyVerify = IsEmpty(Tasks.value);
        if (IsEmptyVerify === true) {
            return;
        }
        const Step = "Other";
        InsertChecklist(ProjectId, Step, Tasks.value);
        Clear();
        AddChecklistModal.style.display = "none";
        RenderChecklist(ProjectId);
    }

    //VERIFICAÇÃO SE ESTÁ VAZIO
    function IsEmpty(Tasks) {
        if (Tasks === "") {
            IsEmptyModal.style.display = "flex";
            return true;
        }
        return false;
    }

    //LIMPA CAMPO DE CHECKLIST
    function Clear() {
        document.getElementById("Tasks").value = "";
    }

    //RENDERIZA CHECKLISTS
    async function RenderChecklist(ProjectId) {
        const check = await SelectChecklist(ProjectId);
        const container = document.querySelector(".ChecklistList");
        container.innerHTML = "";
        checklist.style.backgroundColor = "#d6d4d4";

        check.forEach(task => {
            const li = document.createElement("li");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.ProjectId = "item" + task.ProjectId;

            const label = document.createElement("label");
            label.htmlFor = checkbox.ProjectId;
            label.textContent = task.Tasks;

            li.appendChild(checkbox);
            li.appendChild(label);

            container.appendChild(li);
        });
    }



}
