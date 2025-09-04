//IMPORTS
import { SelectScrums } from './db.js';
import { InsertScrum } from './db.js';
import { DeleteProject } from './db.js';
import { ChecklistScreen } from './checklist.js';
import { NoteScreen } from './note.js';
import { ProjectScreen } from './project.js';

export function ScrumScreen(ProjectId) {
    document.querySelector("section").innerHTML = `
    <section>
<div class="ScrumList">
                <button>
                    <span class="Date">03/08/2025</span>
                </button>
                <button>
                    <span class="Date">09/09/2025</span>
                </button>
                <button>
                    <span class="Date">10/08/2025</span>
                </button>
            </div>

<div class="AddScrumModal">
                <h4>Scrum</h4>
                <textarea type="text" id="Yesterday" name="Yesterday" placeholder="Yesterday"></textarea>
                <textarea type="text" id="Today" name="Today" placeholder="Today"></textarea>
                <textarea type="text" id="Locks" name="Locks" placeholder="Locks"></textarea>
    
                <button id="AddScrumButton">Add Scrum</button>
        </div>
    
                <div class="IsEmptyModal">
                    <p>Field is empty</p>
                    <button id="FillFieldButton">Ok</button>
                </div>
    </section>
     <nav>
        <button id="checklist"><img src="./assets/checklist.png" alt="Checklist"class="buttonLogo"><span>Checklist</span></button>
        <button id="notes"><img src="./assets/notes.png" alt="Notes" class="buttonLogo"><span>Notes</span></button>
        <button id="scrum"><img src="./assets/scrum.png" alt="Scrum" class="buttonLogo"><span>Scrum</span></button>
        <button id="menu"><img src="./assets/menu.png" alt="Menu" class="buttonLogo"></button>
        <div class="MenuContent">
            <button id="EndProject">Finalize</button>
            <button id="DeleteProjectBt">Delete</button>
            <button id="ChangeProject">Change</button>
            <button id="Help">Help</button>
        </div>
    </nav>
    `;
    
    RenderScrum(ProjectId);
    
    //VARIABLES SCRUM LIST
var ScrumList = document.querySelector(".ScrumList");
var Date = document.querySelector(".Date");

//VARIABLES ADD SCRUM MODAL
var AddScrumModal = document.querySelector(".AddScrumModal");
var Yesterday = document.getElementById("Yesterday");
var Today = document.getElementById("Today");
var Locks = document.getElementById("Locks");
var AddScrumButton = document.getElementById("AddScrumButton");

//VARIABLES IS EMPTY MODAL
var IsEmptyModal = document.querySelector(".IsEmptyModal");
var FillFieldButton = document.getElementById("FillFieldButton");

 //VARIAVEIS TAGS
var nav = document.querySelector("nav");

//VARIAVEIS NAV BUTTONS
var checklist = document.getElementById("checklist");
var notes = document.getElementById("notes");
var scrum = document.getElementById("scrum");
var menu = document.getElementById("menu");
var EndProject = document.getElementById("EndProject");
var DeleteProjectBt = document.getElementById("DeleteProjectBt");
var ChangeProject = document.getElementById("ChangeProject");
var Help = document.getElementById("Help");

//VARIAVEIS NAV DIVS
var MenuContent = document.querySelector(".MenuContent");

//MUDANÇAS DE TELAS EVENTS       
checklist.addEventListener("click", function () {
    scrum.style.backgroundColor = "#F4F4F4";
    ChecklistScreen(ProjectId);
})

notes.addEventListener("click", function () {
    scrum.style.backgroundColor = "#F4F4F4";
    NoteScreen(ProjectId);
})

//change project
ChangeProject.addEventListener("click", function () {
    scrum.style.backgroundColor = "#F4F4F4";
    ProjectScreen();
})

//delete project
DeleteProjectBt.addEventListener("click", function () {
    scrum.style.backgroundColor = "#F4F4F4";
    DeleteProject(ProjectId);
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

    async function RenderScrum(ProjectId) {
        const Scrums = await SelectScrums(ProjectId);
        const container = document.querySelector(".ScrumList");
        container.innerHTML = "";
        scrum.style.backgroundColor = "#d6d4d4";
        
    }
}
