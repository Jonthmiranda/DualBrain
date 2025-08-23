//IMPORTS
import { SelectChecklist } from './db.js';
import { InsertChecklist } from './db.js';
import { UpdateChecklistCompleted } from './db.js';
import { UpdateChecklist } from './db.js';
import { DeleteChecklist } from './db.js';

//VARIABLES DIV CHECKLIST LIST
var ChecklistList  = document.querySelector(".ChecklistList");
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


export function ChecklistScreen(id) {
    document.querySelector("section").innerHTML = `
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
            <button id="ia"><img src="./assets/IA.png" alt="IA" class="buttonLogo"><span>IA</span></button>
            <button id="scrum"><img src="./assets/scrum.png" alt="Scrum" class="buttonLogo"><span>Scrum</span></button>
            <button id="menu"><img src="./assets/menu.png" alt="Menu" class="buttonLogo"></button>
            <div class="MenuContent">
                <button id="EndProject">Finalize</button>
                <button id="DeleteProject">Delete</button>
                <button id="ChangeProject">Change</button>
                <button id="Help">Help</button>
            </div>
        </nav>`;

    AddProjectButton.style.display = "none";
    nav.style.display = "flex";
}
